import { useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const badges = ['Dal 2001', 'Parrucchiere', 'Estetica', 'Solarium']

export default function ChiSiamo() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="snap-start scroll-mt-16 border-t border-neutral-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
              Il salone
            </p>
            <h2
              ref={titleRef}
              className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
            >
              Chi siamo
            </h2>
            <div className="w-16 h-px bg-brand-magenta mb-8" />
            <p className="font-body text-neutral-300 text-base md:text-lg leading-relaxed mb-5">
              Alex &amp; Maty è un salone di parrucchiere a Napoli, aperto dal 2001. In questi vent&apos;anni abbiamo costruito un posto dove stile metropolitano e cura artigianale convivono senza compromessi.
            </p>
            <p className="font-body text-neutral-400 text-base leading-relaxed mb-8">
              Oltre al taglio e al colore, offriamo una zona estetica completa e il solarium — tutto in un unico spazio, nel cuore del quartiere di Pianura.
            </p>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-block border border-brand-magenta/60 text-brand-magenta font-display uppercase tracking-widest text-xs px-4 py-2"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <img
              src="/salon-4.jpg"
              alt="Urban CDB Salon — Napoli"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
