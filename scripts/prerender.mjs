// Pre-render statico, eseguito dopo `vite build` (vedi lo script "build" in package.json).
// 1. Scrive in dist/ l'HTML già renderizzato della home e di /privacy: titolo e sfondo
//    compaiono con il primo paint invece di aspettare il download del bundle JS (LCP).
// 2. Mette il CSS inline nell'<head>: niente richiesta che blocca il rendering.
// 3. Precarica la foto di sfondo giusta per la larghezza dello schermo e il font del titolo.
import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
let template = await readFile(join(dist, 'index.html'), 'utf8')

// CSS inline al posto del <link rel="stylesheet">
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (!cssLink) throw new Error('prerender: foglio di stile non trovato in dist/index.html')
const css = await readFile(join(dist, cssLink[1]), 'utf8')
template = template.replace(cssLink[0], () => `<style>${css}</style>`)

// Preload dello sfondo (stesse media query di .site-backdrop in index.css) e di Oswald:
// il titolo dell'hero è l'elemento LCP e aspetta quel font prima di disegnarsi.
const assets = await readdir(join(dist, 'assets'))
const find = (re) => {
  const name = assets.find((f) => re.test(f))
  if (!name) throw new Error(`prerender: asset ${re} non trovato`)
  return `/assets/${name}`
}
const preload = [
  `<link rel="preload" as="image" href="${find(/^hero-bg-mobile-[\w-]+\.jpg$/)}" media="(max-width: 767px)" fetchpriority="high" />`,
  `<link rel="preload" as="image" href="${find(/^hero-bg-(?!mobile-)[\w-]+\.jpg$/)}" media="(min-width: 768px)" fetchpriority="high" />`,
  `<link rel="preload" as="font" type="font/woff2" href="${find(/^oswald-var-latin-[\w-]+\.woff2$/)}" crossorigin />`,
].join('\n    ')
// La privacy non ha lo sfondo: lì il segnaposto si toglie e basta
const page = (path) =>
  template
    .replace('<!--hero-preload-->', path === '/' ? preload : '')
    .replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`)

await writeFile(join(dist, 'index.html'), page('/'))

// /privacy → dist/privacy.html (Cloudflare Pages lo serve su /privacy)
const privacy = page('/privacy')
  .replace(/<title>[^<]*<\/title>/, '<title>Privacy Policy | Alex &amp; Maty</title>')
  .replace(/(<link rel="canonical" href="[^"]*?)\/"/, '$1/privacy"')
await writeFile(join(dist, 'privacy.html'), privacy)

await rm(ssrDir, { recursive: true, force: true })
console.log('prerender: dist/index.html e dist/privacy.html generati')
