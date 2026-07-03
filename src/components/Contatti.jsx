import { useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const WA_LINK =
  'https://wa.me/393382873428?text=Ciao!%20Vorrei%20prenotare%20un%20appuntamento%20da%20Alex%20%26%20Maty'

const MAP_SRC =
  'https://www.google.com/maps?q=Via+Francesco+Arnaldi+108,+80126+Napoli&output=embed'

export default function Contatti() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="snap-start scroll-mt-16 border-t border-neutral-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
          Vieni a trovarci
        </p>
        <h2 ref={titleRef} className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4">
          Contatti
        </h2>
        <div className="w-16 h-px bg-brand-magenta mb-10" />

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="flex flex-col gap-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit bg-brand-magenta hover:bg-brand-magenta-dark text-white font-semibold font-body px-8 py-3 rounded transition-colors"
            >
              Prenota su WhatsApp
            </a>

            <div>
              <p className="font-display text-white text-xs tracking-widest uppercase mb-3">
                Telefono
              </p>
              <a
                href="tel:0815883171"
                className="font-body text-neutral-300 hover:text-white text-lg transition-colors"
              >
                081 588 3171
              </a>
            </div>

            <div>
              <p className="font-display text-white text-xs tracking-widest uppercase mb-3">
                WhatsApp
              </p>
              <a
                href="https://wa.me/393382873428"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-neutral-300 hover:text-white text-lg transition-colors"
              >
                338 287 3428
              </a>
            </div>

            <div>
              <p className="font-display text-white text-xs tracking-widest uppercase mb-3">
                Indirizzo
              </p>
              <p className="font-body text-neutral-300 text-base leading-relaxed">
                Via Francesco Arnaldi 108/112
                <br />
                80126 Napoli
              </p>
            </div>

            <div>
              <p className="font-display text-white text-xs tracking-widest uppercase mb-3">
                Orari
              </p>
              <p className="font-body text-neutral-300 text-base leading-relaxed">
                Martedì – Sabato&nbsp;&nbsp;9:00 – 19:00
                <br />
                <span className="text-neutral-600">Lunedì e Domenica chiuso</span>
              </p>
            </div>
          </div>

          <div className="w-full h-72 md:h-full min-h-64">
            <iframe
              title="Mappa Alex & Maty"
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 mt-16 pt-8 border-t border-neutral-900">
        <p className="font-body text-neutral-700 text-xs text-center">
          © Alex &amp; Maty – Urban CDB Salon · Via Francesco Arnaldi 108/112, 80126 Napoli
        </p>
      </div>
    </section>
  )
}
