export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-body px-5 py-16 md:py-24">
      <div
        dangerouslySetInnerHTML={{
          __html: '<!-- DA FAR VALIDARE DA UN LEGALE PRIMA DELLA PUBBLICAZIONE -->',
        }}
      />
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="font-display text-brand-magenta text-xs tracking-widest uppercase hover:text-white transition-colors"
        >
          &larr; Torna al sito
        </a>

        <h1 className="font-display font-bold uppercase text-3xl md:text-4xl text-white mt-6 mb-2">
          Privacy Policy
        </h1>
        <div className="w-16 h-px bg-brand-magenta mb-8" />

        <div className="space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section>
            <h2 className="font-display uppercase text-white text-base tracking-wide mb-3">
              Titolare del trattamento
            </h2>
            <p>
              [DA COMPILARE — ragione sociale, indirizzo P.IVA/C.F. del titolare]
              <br />
              Alex &amp; Maty — Urban CDB Salon, Via Francesco Arnaldi 108/112, 80126 Napoli
            </p>
          </section>

          <section>
            <h2 className="font-display uppercase text-white text-base tracking-wide mb-3">
              Finalità del trattamento
            </h2>
            <p>
              Questo sito è una landing page vetrina e non raccoglie dati tramite moduli
              o form di contatto. I dati trattati riguardano esclusivamente:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>il funzionamento tecnico del sito (erogazione delle pagine);</li>
              <li>
                statistiche di visita in forma aggregata e anonima, tramite Umami Analytics;
              </li>
              <li>
                l&apos;eventuale contatto volontario avviato dall&apos;utente verso il salone
                tramite WhatsApp o telefono, cliccando gli appositi link.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display uppercase text-white text-base tracking-wide mb-3">
              Servizi di terze parti
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong className="text-white">Umami Analytics</strong> — analisi statistica
                cookieless, non installa cookie di profilazione e non traccia l&apos;utente
                tra siti diversi.
              </li>
              <li>
                <strong className="text-white">Google Maps</strong> — il sito include un link
                che apre Google Maps in una scheda separata solo se l&apos;utente clicca
                volontariamente su &ldquo;Apri in Google Maps&rdquo;; non è presente alcun
                embed automatico della mappa che carichi dati da Google al primo accesso.
              </li>
              <li>
                <strong className="text-white">WhatsApp</strong> — i pulsanti &ldquo;Prenota&rdquo;
                aprono una conversazione WhatsApp precompilata; il trattamento dei dati dopo
                l&apos;apertura del link è di competenza di WhatsApp/Meta.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display uppercase text-white text-base tracking-wide mb-3">
              Diritti dell&apos;interessato
            </h2>
            <p>
              In qualsiasi momento è possibile esercitare, nei confronti del titolare, i
              diritti di cui agli artt. 15-22 del Regolamento (UE) 2016/679 (GDPR): accesso,
              rettifica, cancellazione, limitazione del trattamento, portabilità dei dati,
              opposizione, nonché il diritto di proporre reclamo all&apos;Autorità Garante
              per la protezione dei dati personali.
            </p>
          </section>

          <section>
            <h2 className="font-display uppercase text-white text-base tracking-wide mb-3">
              Nessuna raccolta dati tramite form
            </h2>
            <p>
              Il sito non contiene alcun modulo di contatto, newsletter o form di
              registrazione: non vengono raccolti né conservati dati personali inseriti
              dall&apos;utente su questo sito.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
