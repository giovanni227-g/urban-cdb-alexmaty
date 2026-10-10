# Alex & Maty — Urban CDB Salon

Landing page single-page per un salone di parrucchiere/estetica a Napoli. Vite + React 19 + Tailwind CSS v4.

Per il contesto completo (dati reali, struttura sezioni, cosa manca prima del deploy) vedi [BRIEF.md](./BRIEF.md).

## Comandi

```bash
npm install       # solo la prima volta
npm run dev       # sviluppo locale, http://localhost:5173
npm run build     # build di produzione in dist/
npm run preview   # serve la build di produzione in locale
npm run lint      # ESLint
```

## Dove modificare cosa

| Cosa | File |
|---|---|
| Numero WhatsApp, telefono, indirizzo, link mappa | `src/data/business.js` — unica fonte, non ridigitare altrove |
| Prezzi e pacchetti | `src/data/packages.js` |
| Recensioni | `src/data/reviews.js` |
| Foto/video "Ultimi lavori" | `src/data/gallery.js` + foto e poster in `src/assets/img/`, video in `public/gallery/` |
| Testi Chi siamo / badge / contatti | `src/components/ChiSiamoContatti.jsx` |
| Privacy policy | `src/components/PrivacyPolicy.jsx` (raggiungibile su `/privacy`) |
| Colori brand, font | `src/index.css` (blocco `@theme` e `@font-face`) |
| Header di sicurezza e cache | `public/_headers` |

## Deploy

Il sito è ospitato su **Cloudflare Pages** (dominio alexmaty.it registrato su Aruba). Pages esegue `npm run build` e pubblica `dist/`.

- `npm run build` fa tre passaggi: build client, build SSR di `src/entry-server.jsx` e `scripts/prerender.mjs`, che scrive l'HTML già renderizzato di `dist/index.html` e `dist/privacy.html` (Pages serve quest'ultimo su `/privacy`) e mette il CSS inline.
- Header di sicurezza e cache sono in `public/_headers`, il formato di Pages.
- `public/404.html` è la pagina per gli indirizzi inesistenti: con un 404.html presente, Pages risponde 404 invece di servire la home a ogni URL.

Prima di pubblicare, vedi la sezione "Cosa manca prima del deploy" in [BRIEF.md](./BRIEF.md).
