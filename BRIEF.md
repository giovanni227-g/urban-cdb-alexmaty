# BRIEF — Landing page Alex & Maty (Urban CDB Salon)

## Contesto
Landing **single-page** per un salone di parrucchiere/estetica reale a Napoli. Questa è una **bozza locale** (no deploy, gira solo con `npm run dev`). Stack già inizializzato: **Vite + React + Tailwind CSS v4**. Non reinstallare nulla, lavora sul progetto esistente.

## Regola assoluta sui dati
Questo è il sito di un cliente reale. **NON inventare recensioni** (nomi reali + testo finto è vietato). Per i prezzi usa placeholder evidenti `€XX` che si capisce vadano sostituiti. Tutto il resto sotto è dato reale, usalo verbatim.

## Brand & gerarchia logo (importante)
Header e hero: **ricostruisci il lockup come wordmark tipografico su sfondo nero**. NON importare il PNG del disco bianco col bordo magenta come logo principale (su nero è goffo). Il PNG va usato solo come favicon.

Gerarchia testo del logo:
- **ALEX & MATY** → protagonista, grande, Oswald Bold, bianco
- **URBAN CDB SALON** → tag piccolo sopra (o sotto) ALEX & MATY, come sovra-marchio/affiliazione, font ridotto, magenta o grigio

## Palette (campionata dal logo, usa esatte)
- Magenta primario: `#E6007D`
- Magenta scuro: `#9E0055`
- Nero base: `#000000`
Sono già registrate in `@theme` dentro `src/index.css`. Usale tramite utility Tailwind, non CSS raw.

## Font
- Titoli: **Oswald Bold** — già caricato in index.html
- Body: **Inter** — già caricato in index.html

## Dati reali del salone
- Nome: Alex & Maty (Urban CDB Salon)
- Indirizzo: Via Francesco Arnaldi 108/112, 80126 Napoli
- Tel: 081 588 3171
- WhatsApp: 338 287 3428
- Orari: Martedì–Sabato 9:00–19:00 (Lunedì e Domenica chiuso)
- Rating: 4,8★ — 31 recensioni Google
- Attività dal 2001: parrucchiere + zona estetica + solarium
- Claim: **"Stile metropolitano, cura artigianale."**

## CTA prenotazione
Tutti i bottoni "Prenota" aprono un link WhatsApp precompilato:
`https://wa.me/393382873428?text=Ciao!%20Vorrei%20prenotare%20un%20appuntamento%20da%20Alex%20%26%20Maty`
Nessun sistema di booking custom.

## Struttura pagina (in quest'ordine)
1. **Header sticky** — wordmark (vedi gerarchia logo) + bottone WhatsApp. Effetto blur/background allo scroll.
2. **Hero** — claim grande, sotto-claim, CTA WhatsApp. Vedi sezione "Estetica & Hero" sotto.
3. **Chi siamo** — salone dal 2001, taglio metropolitano e cura artigianale, parrucchiere + estetica + solarium.
4. **Gallery lavori** — 6 placeholder grigi (`bg-neutral-800`) con label "FOTO" centrata. Le foto reali arrivano dopo. Tienili in griglia responsive.
5. **Servizi** — leggi da `src/data/services.js`. Categorie REALI, prezzi placeholder `€XX`:
   - Taglio & Piega
   - Colore & Tecniche
   - Trattamenti
   - Estetica
   - Solarium
6. **Social proof** — badge "4,8★ · 31 recensioni Google" + 4 card recensione lette da `src/data/reviews.js`. I 4 testi sono placeholder `[RECENSIONE — DA INSERIRE]` con i nomi reali: Katty, Carolina Starace, Susi Di Muro, ketty ruocco. NON inventare il testo.
7. **Contatti** — WhatsApp, telefono (cliccabile `tel:`), indirizzo, orari, e mappa (embed Google Maps iframe dell'indirizzo).

## Estetica & Hero (vincoli precisi — leggi attentamente)
Riferimento: **editorial-fashion / minimal con accenti cyber-glam**. NON è una landing SaaS, NON è "minimal generico".
- Base nera dominante, magenta usato come accento deciso ma non ovunque.
- Tipografia grande, condensata (Oswald), molto contrasto di scala tra titoli e body.

**Hero — cosa fare:**
- Claim grande con reveal animato all'ingresso (fade + slide-up del testo, leggero).
- Accento magenta tipografico o una linea/forma geometrica magenta, niente di più.

**Hero — cosa NON fare (vietato):**
- NO gradient mesh animati
- NO particelle / sfere fluttuanti
- NO blob colorati animati
- NO effetti "glow" generici da template SaaS
L'animazione deve essere sobria ed editoriale, non un effetto-vetrina.

## Fix tecnico noto
C'è un bug "testo bianco su sfondo bianco" nell'Header già scritto. Risolvilo impostando lo sfondo nero **via utility Tailwind** (`bg-black` sul wrapper / layout principale), NON con CSS raw sul body. Mantieni coerenza utility-first ovunque.

## Architettura file
- Componenti in `src/components/` (un file per sezione: Header.jsx, Hero.jsx, ChiSiamo.jsx, Gallery.jsx, Servizi.jsx, SocialProof.jsx, Contatti.jsx)
- Dati in `src/data/services.js` e `src/data/reviews.js`
- `App.jsx` assembla le sezioni in ordine
- Header.jsx esiste già: correggilo e riusalo, non riscriverlo da zero se non serve

## Output atteso
Sito che gira con `npm run dev`, responsive (mobile-first), tutte le sezioni popolate con dati reali e placeholder evidenti dove indicato. Primo componente da consolidare: **Hero.jsx**.
