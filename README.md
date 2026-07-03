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
| Foto/video "Ultimi lavori" | `src/data/gallery.js` + file in `public/gallery/` |
| Testi Chi siamo / badge / contatti | `src/components/ChiSiamoContatti.jsx` |
| Privacy policy | `src/components/PrivacyPolicy.jsx` (raggiungibile su `/privacy`) |
| Colori brand, font | `src/index.css` (blocco `@theme` e `@font-face`) |
| Header di sicurezza, config hosting | `vercel.json` |

## Deploy

Progetto pensato per Vercel: `vercel.json` imposta già `outputDirectory: dist`, il rewrite SPA per `/privacy` e gli header di sicurezza. Basta collegare il repo/dominio.

Prima di pubblicare, vedi la sezione "Cosa manca prima del deploy" in [BRIEF.md](./BRIEF.md).
