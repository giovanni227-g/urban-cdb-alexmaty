import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dominio pubblico: SITE_URL (impostabile su Vercel) oppure il dominio di produzione che Vercel
// espone a build-time. In locale resta vuoto e i tag che richiedono un URL assoluto vengono omessi.
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

// Riempie canonical / og:url / og:image / JSON-LD con l'URL assoluto e genera robots.txt + sitemap.xml.
function seo() {
  return {
    name: 'seo-site-url',
    transformIndexHtml(html) {
      return SITE_URL
        ? html.replaceAll('__SITE_URL__', SITE_URL)
        : html.replace(/^.*__SITE_URL__.*\n/gm, '')
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(SITE_URL ? [`Sitemap: ${SITE_URL}/sitemap.xml`] : [])].join('\n') + '\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (!SITE_URL) return
      const lastmod = new Date().toISOString().slice(0, 10)
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${lastmod}</lastmod></url>\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
