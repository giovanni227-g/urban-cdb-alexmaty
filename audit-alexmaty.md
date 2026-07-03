# Audit tecnico — Alex & Maty (Urban CDB Salon)
**Data:** 03/07/2026 · **Stack:** Vite 8 + React 19 + Tailwind CSS v4 · **Tipo progetto:** Landing page statica, no backend, no DB, no auth

---

## 0. Premessa sul metodo [Certo]

Il brief richiede un audit OWASP/gestione sessioni/API. Questo progetto **non ha backend, non ha form che scrivono dati, non ha autenticazione, non ha database**. L'unico input utente è il click su link `tel:`, `wa.me` e un iframe Google Maps. Di conseguenza:

- SQLi, XSS da stored input, session fixation, broken auth, IDOR: **non applicabili**, non perché il codice sia "sicuro", ma perché non esiste la classe di funzionalità che li abiliterebbe.
- La superficie di rischio reale è: **header di sicurezza a livello hosting, embed di terze parti, supply chain delle dipendenze, igiene del repository git, e i "prerequisiti al deployment" che hai chiesto esplicitamente**.

L'audit è strutturato sulle 4 macro-aree richieste, ma il contenuto della sezione 1 è ridimensionato in modo coerente con l'architettura reale.

---

## 1. Sicurezza difensiva

| # | Criticità | Priorità |
|---|---|---|
| 1.1 | `.git/` incluso nella cartella di progetto, storia e branch non ripuliti | 🔴 Alta |
| 1.2 | Nessun header di sicurezza (CSP, X-Frame-Options, Referrer-Policy) definito da nessuna parte | 🟠 Media |
| 1.3 | `referrerPolicy` dell'iframe Maps troppo permissivo | 🟡 Bassa |
| 1.4 | Iframe Google Maps senza `sandbox` | 🟡 Bassa |
| 1.5 | Nessun `npm audit` / verifica CVE sulle dipendenze prima del deploy | 🟠 Media |

### 1.1 — `.git/` incluso nel progetto consegnato
**Descrizione:** la working directory contiene `.git/` completo, con due branch (`main`, `fix-lag-chrome-2026-07-03`) e modifiche non committate su `Header.jsx` e `ChiSiamoContatti.jsx`. Se il deploy viene fatto copiando la cartella del progetto invece della sola build (`dist/`), o se un hosting statico mal configurato serve file "nascosti", l'intera storia dei commit (messaggi, diff, eventuali dati sensibili passati) diventa raggiungibile.

**Impatto:** esposizione della cronologia di sviluppo. Impatto reale basso su questo progetto specifico (non ci sono segreti nei commit che ho ispezionato), ma è una cattiva abitudine che un giorno espone qualcosa di serio.

**Soluzione:** verificare che il tool di deploy (Vercel/Netlify/altro) pubblichi solo `dist/` come *output directory*, mai la root del repo. Aggiungere anche una regola esplicita di negazione a livello di hosting:

```
# netlify.toml / vercel.json — se servi file statici generici, blocca i dotfile
[[headers]]
  for = "/.git/*"
  [headers.values]
    X-Robots-Tag = "noindex"
```
Ma la vera soluzione è: **build directory = `dist/`, punto.** Non è un problema di codice, è un problema di configurazione del deploy — verifica quale directory hai impostato come output sulla piattaforma che userai.

Inoltre: rimuovi `.claude/` dal working tree (è stato lasciato untracked) e aggiungilo a `.gitignore` — non è pensato per finire in un repository condiviso.

### 1.2 — Nessun header di sicurezza
**Descrizione:** non esiste alcun file di configurazione (`vercel.json`, `netlify.toml`, `_headers`) che imposti CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. Questo non è un problema del codice React, è assente a livello di infrastruttura.

**Impatto:** senza `X-Frame-Options`/`frame-ancestors`, il sito può essere incorporato in un iframe su un dominio terzo (clickjacking). Impatto basso dato che non ci sono azioni sensibili da clickjackare (nessun login, nessun pagamento), ma è comunque hardening a costo zero.

**Soluzione** (esempio per Vercel, adattare secondo host scelto):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' data:; frame-src https://www.google.com; font-src https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self'"
        }
      ]
    }
  ]
}
```
Nota: la CSP sopra è indicativa — va testata, perché Tailwind/Vite in build a volte inietta `style` inline che richiede `'unsafe-inline'` su `style-src` (come sopra) salvo tu attivi nonce/hash.

### 1.3 — Referrer policy dell'iframe Maps
**Descrizione:** in `Contatti.jsx` l'iframe usa `referrerPolicy="no-referrer-when-downgrade"`, che invia l'URL referrer completo a Google su ogni richiesta HTTPS→HTTPS (che è il caso normale oggi).

**Impatto:** basso — non ci sono query string sensibili nell'URL del sito — ma è una policy più permissiva del necessario.

**Soluzione:**
```jsx
<iframe
  ...
  referrerPolicy="strict-origin-when-cross-origin"
/>
```

### 1.4 — Iframe senza sandbox
**Soluzione:**
```jsx
<iframe
  ...
  sandbox="allow-scripts allow-same-origin"
/>
```
Da testare: Google Maps embed a volte richiede permessi aggiuntivi (`allow-popups`) per il pulsante "Apri in Maps" interno all'iframe stesso.

### 1.5 — Dipendenze non auditate
**[Ipotesi]** — non ho accesso a un database CVE live da qui, quindi non posso confermare vulnerabilità specifiche nelle versioni installate. Prima del deploy:
```bash
npm audit --production
npm outdated
```
Va fatto manualmente da te come ultimo step pre-deploy, non è qualcosa che ho potuto verificare offline in modo affidabile.

---

## 2. Qualità del codice

| # | Criticità | Priorità |
|---|---|---|
| 2.1 | 5 componenti orfani, mai importati, duplicano logica dei componenti attivi | 🔴 Alta |
| 2.2 | Costante `WA_LINK` duplicata identica in 5 file | 🟠 Media |
| 2.3 | URL della mappa duplicato con encoding diverso tra 2 file | 🟠 Media |
| 2.4 | Nessun Error Boundary React | 🟠 Media |

### 2.1 — Componenti morti nel repository
**Descrizione:** `App.jsx` importa solo `Header, Hero, UltimiLavori, Pacchetti, ChiSiamoContatti, SocialProof, WhatsAppFAB`. I file `ChiSiamo.jsx`, `Contatti.jsx`, `Gallery.jsx`, `Servizi.jsx`, `DotNav.jsx` esistono nel repo ma **non sono mai importati da nessuna parte**. Sono versioni precedenti, superate da `ChiSiamoContatti` (che fonde Chi siamo + Contatti) e `UltimiLavori`/`Pacchetti` (che sostituiscono Gallery/Servizi).

**Impatto:** Vite fa tree-shaking in build, quindi **non pesano sul bundle finale** — non è un problema di performance. È un problema di manutenibilità: se tra sei mesi tu o Claude Code aprite `Servizi.jsx` per cambiare un prezzo, state modificando codice morto mentre il sito in produzione legge da `Pacchetti.jsx`. Rischio concreto di perdere tempo o introdurre bug fantasma.

**Soluzione:** elimina i 5 file orfani, oppure spostali fuori dall'albero sorgente in una cartella `_archive/` non tracciata da Vite/ESLint, se vuoi tenerli come riferimento storico.
```bash
git rm src/components/ChiSiamo.jsx src/components/Contatti.jsx \
       src/components/Gallery.jsx src/components/Servizi.jsx \
       src/components/DotNav.jsx
```

### 2.2 — `WA_LINK` duplicato 5 volte
**Descrizione:** la stessa stringa `https://wa.me/393382873428?text=...` è hardcoded identica in `Header.jsx`, `Hero.jsx`, `WhatsAppFAB.jsx`, `Contatti.jsx`, `ChiSiamoContatti.jsx`.

**Impatto:** quando il numero WhatsApp o il testo del messaggio cambieranno (probabile, è un dato di business che cambia), dovrai ricordarti di modificare 5 file. Se ne dimentichi anche solo uno, il sito in produzione avrà CTA inconsistenti — un utente clicca "Prenota" in due punti diversi della pagina e ottiene comportamenti diversi.

**Soluzione:** centralizza in un unico file dati.
```js
// src/data/business.js
export const BUSINESS = {
  whatsappNumber: '393382873428',
  whatsappMessage: 'Ciao! Vorrei prenotare un appuntamento da Alex & Maty',
  phone: '0815883171',
  phoneDisplay: '081 588 3171',
  address: 'Via Francesco Arnaldi 108/112, 80126 Napoli',
  mapsQuery: 'Via+Francesco+Arnaldi+108,+80126+Napoli',
}

export const WA_LINK =
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`
```
Poi in ogni componente: `import { WA_LINK } from '../data/business'`.

### 2.3 — URL mappa duplicato con encoding diverso
**Descrizione:** `ChiSiamoContatti.jsx` usa `https://maps.google.com/?q=...`, `Contatti.jsx` (file orfano, vedi 2.1) usa `https://www.google.com/maps?q=...&output=embed`. Sintomo dello stesso problema del punto 2.2: dato di business duplicato invece che centralizzato.

**Soluzione:** stessa struttura `BUSINESS.mapsQuery` sopra, derivare entrambi gli URL da lì.

### 2.4 — Nessun Error Boundary
**Descrizione:** `main.jsx` monta `<App />` senza alcun Error Boundary. Un'eccezione runtime in un qualsiasi componente figlio (es. un bug futuro in `Pacchetti.jsx` nella logica delle tab) fa collassare l'intero albero React: l'utente vede una pagina bianca, senza fallback UI e senza alcun log server-side dell'errore (non c'è Sentry né altro logging configurato).

**Impatto:** per un sito vetrina che deve generare prenotazioni, una pagina bianca senza recovery è un problema di business diretto — un potenziale cliente che apre il sito da un link social e vede il bianco se ne va.

**Soluzione:**
```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) {
    console.error(error, info) // sostituire con invio a un servizio di logging
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-center px-5">
          <div>
            <p className="font-display text-2xl mb-4">Qualcosa non ha funzionato.</p>
            <a href="tel:0815883171" className="text-brand-magenta underline">
              Chiamaci: 081 588 3171
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
```
In `main.jsx`, avvolgi `<App />` con `<ErrorBoundary>`.

---

## 3. Professionalità e best practice web

| # | Criticità | Priorità |
|---|---|---|
| 3.1 | Zero SEO on-page: nessuna meta description, OG tags, canonical, dato strutturato | 🔴 Alta |
| 3.2 | `<title>` ancora quello di default Vite | 🔴 Alta |
| 3.3 | Immagine hero non ottimizzata, è l'elemento LCP | 🟠 Media |
| 3.4 | File `public/` copiati verbatim in build, incluso un duplicato inutile | 🟠 Media |
| 3.5 | Nessun `robots.txt` / `sitemap.xml` | 🟡 Bassa |
| 3.6 | Nessun favicon completo (manifest, apple-touch-icon) | 🟡 Bassa |

### 3.1 / 3.2 — SEO on-page assente
**Descrizione:** `index.html` ha solo `<title>urban-cdb-alexmaty</title>` (il default generato da Vite, mai cambiato) e nessun'altra meta tag oltre a viewport e favicon. Per un'attività locale reale con indirizzo, orari e recensioni Google, questo è il posto dove il sito porta più valore di business e attualmente è vuoto.

**Impatto:** il sito non compare correttamente nei risultati di ricerca (niente snippet), non ha anteprima decente se condiviso su WhatsApp/Instagram/Facebook (niente immagine, niente descrizione), e non sfrutta i dati "LocalBusiness" che Google userebbe per il pannello Maps/Knowledge Graph.

**Soluzione:**
```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Alex & Maty — Parrucchiere Napoli | Urban CDB Salon</title>
  <meta name="description" content="Parrucchiere, estetica e solarium a Napoli dal 2001. Stile metropolitano, cura artigianale. Via F. Arnaldi 108/112, Pianura. Prenota su WhatsApp." />
  <link rel="canonical" href="https://www.alexematy.it/" />

  <meta property="og:type" content="business.business" />
  <meta property="og:title" content="Alex & Maty — Urban CDB Salon" />
  <meta property="og:description" content="Parrucchiere, estetica e solarium a Napoli dal 2001." />
  <meta property="og:image" content="https://www.alexematy.it/og-image.jpg" />
  <meta property="og:url" content="https://www.alexematy.it/" />
  <meta name="twitter:card" content="summary_large_image" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Alex & Maty - Urban CDB Salon",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Francesco Arnaldi 108/112",
      "addressLocality": "Napoli",
      "postalCode": "80126",
      "addressCountry": "IT"
    },
    "telephone": "+39 081 588 3171",
    "openingHours": "Tu-Sa 09:00-19:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "31"
    }
  }
  </script>
  ...
</head>
```
Serve anche creare un'immagine `og-image.jpg` dedicata (1200×630px) — non riusare `hero-bg.jpg` così com'è, va tagliata per quel formato.

### 3.3 — Hero image non ottimizzata (elemento LCP)
**Descrizione:** `hero-bg.jpg` (456KB, JPEG non compresso per il web) è impostata come `background-image` inline su un `<div>` `fixed inset-0` che copre l'intera pagina dietro ogni sezione — è quasi certamente l'elemento LCP (Largest Contentful Paint) della pagina, ma non è né precaricata (`<link rel="preload">`), né servita in formato moderno (WebP/AVIF), né responsive (nessun `srcset` per schermi piccoli, dove un'immagine da 456KB pensata per desktop è puro spreco di banda mobile).

**Impatto:** peggiora direttamente il Core Web Vital LCP, che è un fattore di ranking Google e influenza la percezione di velocità del sito — critico su mobile in Italia dove la connessione media non è fibra ovunque.

**Soluzione:**
```bash
# genera varianti ottimizzate (esempio con sharp-cli o squoosh)
npx @squoosh/cli --webp '{"quality":75}' public/hero-bg.jpg -d public/
npx @squoosh/cli --resize '{"width":800}' --webp '{"quality":75}' public/hero-bg.jpg -d public/ -o hero-bg-mobile.webp
```
```html
<!-- in index.html, per il preload dell'elemento LCP -->
<link rel="preload" as="image" href="/hero-bg.webp" fetchpriority="high" />
```
```jsx
// App.jsx — sostituire il background-image inline con <img> per poter usare srcset,
// oppure usare picture con media query se resta come sfondo CSS via classe Tailwind + @media
```
Nota tecnica: con un `background-image` via `style` inline, non puoi usare `srcset`/`<picture>` nativamente — o passi a un `<img>` posizionato in assoluto dietro il contenuto (più facile da ottimizzare), o gestisci le varianti via CSS con `image-set()`.

### 3.4 — File in `public/` finiscono in build senza hashing
**Descrizione:** tutto ciò che sta in `public/` viene copiato **verbatim** in `dist/` da Vite, senza hashing del filename e senza passare per la pipeline di ottimizzazione asset (a differenza di ciò che importi da `src/assets/`, che Vite hasha e ottimizza). Ho trovato `public/hero-bg-original.jpg` (456KB, untracked in git) — un file di lavoro, probabilmente la sorgente prima della compressione, dimenticato lì. Se fai `npm run build` oggi, questo file finisce comunque nella build pubblica e viene servito a chiunque lo richieda per URL diretto, anche se nessun componente lo referenzia.

**Impatto:** banda sprecata, e a volte questi file "original" sono a risoluzione più alta e possono rivelare dettagli che la versione ottimizzata (magari ritagliata) nascondeva — non è questo il caso qui, ma è un'abitudine da correggere.

**Soluzione:** sposta i file di lavoro fuori da `public/`, es. in una cartella `assets-source/` alla root (aggiunta a `.gitignore` e comunque mai in `public/`).
```bash
mkdir -p assets-source
mv public/hero-bg-original.jpg assets-source/
echo "assets-source/" >> .gitignore
```

### 3.5 / 3.6 — robots.txt, sitemap, favicon completo
Mancano tutti e tre. Per un sito vetrina locale non sono bloccanti, ma sono 15 minuti di lavoro con ritorno SEO reale:
```
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://www.alexematy.it/sitemap.xml
```
Per il favicon completo, genera un set con [realfavicongenerator.net](https://realfavicongenerator.net) partendo dal PNG del logo (quello che il brief dice di *non* usare come logo principale ma *sì* come favicon).

---

## 4. Prerequisiti per il deployment

Questa è la sezione che risponde direttamente alla tua domanda "cosa devo sistemare prima di andare online".

| # | Blocco al deploy | Bloccante? |
|---|---|---|
| 4.1 | Modifiche non committate su branch feature, non mergiate su `main` | 🔴 Sì |
| 4.2 | Testi recensioni ancora placeholder `[RECENSIONE — DA INSERIRE]` | 🔴 Sì |
| 4.3 | Prezzi ancora `€XX` in `services.js` | 🔴 Sì |
| 4.4 | Due pacchetti con lo stesso nome "Total Care" | 🟠 Verifica dato reale |
| 4.5 | `<title>` di default, nessun meta SEO (vedi 3.1) | 🔴 Sì |
| 4.6 | Nessuna directory di build definita esplicitamente per l'hosting | 🔴 Sì |

### 4.1 — Stato del repository non pronto
**Descrizione:** sei sul branch `fix-lag-chrome-2026-07-03` con modifiche non committate su `Header.jsx` e `ChiSiamoContatti.jsx`, e questo branch non risulta mergiato su `main`. Se colleghi `main` a Vercel/Netlify per il deploy automatico, **il fix per il lag su Chrome non va in produzione** finché non fai merge.

**Soluzione:**
```bash
git add -A
git commit -m "fix: risolvi lag scroll su Chrome"
git checkout main
git merge fix-lag-chrome-2026-07-03
git push origin main
```

### 4.2 — Recensioni placeholder
**Descrizione:** in `data/reviews.js` i 4 nomi reali (Katty, Carolina Starace, Susi Di Muro, ketty ruocco) sono già in produzione, associati al testo letterale `[RECENSIONE — DA INSERIRE]`. Il brief giustamente vieta di inventare il testo — corretto — ma questo significa che **il componente non deve andare online finché il cliente non fornisce i testi reali**, non che vada online così com'è.

**Impatto di business, non tecnico:** pubblicare nomi reali di clienti accanto a un placeholder rotto è un problema reputazionale per il salone, visibile a chiunque visiti la sezione recensioni il primo giorno online.

**Soluzione minima se devi comunque andare online prima di avere i testi:** nascondi condizionalmente la card finché il testo non è popolato, invece di renderizzare il placeholder:
```jsx
{reviews
  .filter(r => !r.text.startsWith('['))
  .map((r) => ( ... ))}
```

### 4.3 / 4.4 — Prezzi e dati di listino
`services.js` ha `€XX` ovunque (coerente col brief, che lo richiede esplicitamente come placeholder "evidente" — corretto così). Ma `packages.js` ha **prezzi reali** (`€100`, `€55`, `€80`, `€50`) e due pacchetti chiamati entrambi **"Total Care"** con contenuti e prezzi diversi (€55 con nota "Matrix" vs €50 senza). Questo non è un bug di codice, è un'inconsistenza nel dato di business che probabilmente andrebbe verificata col cliente prima di pubblicare — un cliente che confronta due "Total Care" a prezzi diversi sul sito si confonde o pensa a un errore.

### 4.5 — Vedi punto 3.1/3.2, bloccante per lo stesso motivo lì descritto.

### 4.6 — Configurazione hosting esplicita
**Descrizione:** non esiste nel progetto alcun file di configurazione per la piattaforma di deploy (`vercel.json`, `netlify.toml`). Non è detto sia un problema — molte piattaforme auto-rilevano Vite — ma vista la storia di lavoro con Vercel, meglio esplicitarlo per evitare che l'output directory di default non combaci.

**Soluzione minima:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [ /* vedi blocco 1.2 */ ]
}
```

---

## Riepilogo priorità

**Da fare prima di andare online (bloccanti):**
1. Merge del branch fix su `main` (4.1)
2. Testi recensioni reali o nascondere la sezione (4.2)
3. Verificare i due "Total Care" col cliente (4.4)
4. Title + meta description minime (3.1/3.2)
5. Confermare output directory = `dist/` sull'hosting, non root del repo (1.1, 4.6)

**Da fare entro la prima settimana online:**
6. Rimuovere i 5 componenti orfani (2.1)
7. Centralizzare `WA_LINK` e dati mappa (2.2, 2.3)
8. Header di sicurezza via config hosting (1.2)
9. Ottimizzare hero image, aggiungere preload (3.3)
10. Error Boundary (2.4)

**Da fare quando hai tempo:**
11. robots.txt, sitemap, favicon set, JSON-LD LocalBusiness (3.1, 3.5, 3.6)
12. `npm audit` (1.5), referrer policy e sandbox iframe (1.3, 1.4)
