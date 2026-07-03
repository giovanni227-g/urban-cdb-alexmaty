# BRIEF — Landing page Alex & Maty (Urban CDB Salon)
**Stato: sito completo, in fase di pre-pubblicazione.** Questo documento descrive cosa esiste *oggi* nel progetto (non più solo la richiesta iniziale). Per il punto preciso su cosa manca prima di andare online, vedi in fondo "Cosa manca prima del deploy".

## Contesto
Landing **single-page** (+ una pagina statica `/privacy`) per un salone di parrucchiere/estetica reale a Napoli. Stack: **Vite + React 19 + Tailwind CSS v4**, gira con `npm run dev`, build di produzione con `npm run build` (output in `dist/`).

## Regola assoluta sui dati
Sito di un cliente reale. Non inventare mai recensioni o dati di contatto: tutto ciò che è scritto sotto è dato reale fornito dal cliente o verificato con lui.

## Brand & logo
Header e hero: wordmark tipografico su sfondo nero (niente PNG del disco come logo principale, solo come favicon).
- **ALEX & MATY** → grande, Oswald Bold, bianco
- **URBAN CDB SALON** → tag sopra, piccolo, magenta

## Palette
- Magenta primario: `#E6007D` — Magenta scuro: `#9E0055` — Nero: `#000000`
Definite in `@theme` dentro `src/index.css`, usate via utility Tailwind (`brand-magenta`, `brand-magenta-dark`, `brand-black`).

## Font — self-hosted
Oswald (600, 700) e Inter (400, 500, 600, 700), entrambi **variable font**: un solo file copre tutti i pesi.
- `public/fonts/inter-var-latin.woff2`, `public/fonts/oswald-var-latin.woff2`
- Dichiarati via `@font-face` in `src/index.css`. Nessuna dipendenza da fonts.googleapis.com/fonts.gstatic.com.

## Dati reali del salone — fonte unica: `src/data/business.js`
Tutti i link WhatsApp, il numero di telefono e l'indirizzo per la mappa **devono** leggere da qui, non essere ridigitati nei componenti.
- Nome: Alex & Maty (Urban CDB Salon)
- Indirizzo: Via Francesco Arnaldi 108/112, 80126 Napoli
- Tel: 081 588 3171 — WhatsApp: 338 287 3428
- Orari: Martedì–Sabato 9:00–19:00 (Lunedì e Domenica chiuso)
- Rating: 4,8★ — 31 recensioni Google
- Attività dal 2001 (comunicata anche come "da 25 anni" nei testi Chi Siamo)
- Claim: **"Stile metropolitano, cura artigianale."**

## CTA prenotazione
Bottoni "Prenota" → link WhatsApp precompilato, generato da `business.js` (`WA_LINK`). Il link "338 287 3428" cliccabile nei contatti usa invece `WA_LINK_BARE` (stesso numero, senza messaggio precompilato) — comportamento intenzionale, non un bug.

## Struttura pagina reale (ordine in `src/App.jsx`)
1. **Header** (`Header.jsx`) — sticky, wordmark cliccabile (torna in cima), bottone WhatsApp, sfondo che compare allo scroll.
2. **Hero** (`Hero.jsx`) — claim animato in ingresso, CTA WhatsApp. Sfondo: `public/hero-bg.jpg` (foto reale del salone).
3. **Ultimi lavori** (`UltimiLavori.jsx`, dati in `src/data/gallery.js`) — griglia stile feed Instagram, foto + video (autoplay in-view via IntersectionObserver), link a Instagram.
4. **Prezzi** (`Pacchetti.jsx`, dati in `src/data/packages.js`) — due tab: "Pacchetti" e "Menù Bellezza". Prezzi reali, non più placeholder. **Nota**: esistono due pacchetti chiamati entrambi "Total Care" (prezzi/contenuti diversi) — confermato dal cliente che sono corretti così, non è un errore da correggere.
5. **Chi siamo + Contatti** (`ChiSiamoContatti.jsx`) — testo Chi siamo, badge, telefono/WhatsApp/indirizzo/orari, carosello foto del salone (`public/salon-1..4.jpg`), link "Apri in Google Maps" (link esterno, **non** iframe embedded).
6. **Social proof** (`SocialProof.jsx`, dati in `src/data/reviews.js`) — badge 4,8★, 4 recensioni Google **reali** (testo verbatim da Google, verificato col cliente il 2026-07-03), footer con link Privacy Policy.
7. **WhatsApp FAB** (`WhatsAppFAB.jsx`) — pulsante fisso in basso a destra, sempre visibile.
8. **Privacy Policy** (`PrivacyPolicy.jsx`) — pagina separata su `/privacy`, raggiungibile dal link in footer. **Manca ancora**: ragione sociale/P.IVA del titolare (placeholder `[DA COMPILARE]`) e validazione del testo da parte di un legale (segnalato con commento nel codice e nell'HTML).

## Resilienza, sicurezza, analytics
- `ErrorBoundary.jsx` avvolge `<App />` in `main.jsx`: se qualcosa va in errore, l'utente vede un fallback con CTA telefonica invece di una pagina bianca.
- `vercel.json`: `outputDirectory: dist`, rewrite SPA per `/privacy`, header di sicurezza (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- Analytics: Umami Cloud (cookieless, nessun banner necessario), script in `index.html` con ID reale già configurato.
- `public/robots.txt` presente (minimale, nessun sitemap: dominio di produzione non ancora confermato).

## Pulizia repository
Rimossi (2026-07-03) tutti i file "dead code" trovati nel progetto: 5 componenti orfani (Blocco 1), `src/data/services.js`, `src/hooks/useLenis.js`, `src/hooks/useFullPageScroll.js`, `src/lib/gsap.js`, `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg`, e le dipendenze npm `gsap`/`lenis` ormai senza alcun file che le usasse (`src/assets/` risultava vuota dopo la rimozione ed è stata eliminata). Verificato con build/lint/screenshot ad ogni passaggio che il sito resta identico — erano davvero inutilizzati, il peso del bundle finale non è mai cambiato.

## Cosa manca prima del deploy
**Bloccanti:**
- Ragione sociale/P.IVA del titolare in `PrivacyPolicy.jsx`
- Validazione del testo privacy da parte di un legale
- Commit + merge del branch `fix-lag-chrome-2026-07-03` su `main`
- Dominio + collegamento hosting (Vercel, config già pronta in `vercel.json`)

**Rimandato volutamente (fuori scope dell'ultimo giro di lavoro):**
- SEO on-page: `<title>` ancora quello di default Vite, nessuna meta description/OG/JSON-LD
- Ottimizzazione immagine hero (compressione/WebP/preload)
- Favicon set completo (manifest, apple-touch-icon)
- `sitemap.xml`
- Pulizia dei file "dead code" elencati sopra
