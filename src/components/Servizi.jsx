import { useRef } from 'react'
import { services } from '../data/services'
import { useFadeUp } from '../hooks/useFadeUp'

export default function Servizi() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="snap-start scroll-mt-16 border-t border-neutral-900 py-20 md:py-28 relative overflow-hidden">
      {/* Glow di sfondo — necessario per rendere visibile l'effetto glass */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-brand-magenta/[0.07] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5">
        <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
          Listino
        </p>
        <h2
          ref={titleRef}
          className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
        >
          Servizi
        </h2>
        <div className="w-16 h-px bg-brand-magenta mb-10" />

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((cat) => (
            <div
              key={cat.category}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="font-display uppercase text-white text-sm tracking-widest mb-4">
                {cat.category}
              </h3>
              <ul>
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-baseline border-b border-white/[0.06] py-3"
                  >
                    <span className="font-body text-neutral-300 text-sm">
                      {item.name}
                    </span>
                    <span className="font-body font-semibold text-brand-magenta text-sm tabular-nums ml-4 shrink-0">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-body text-neutral-600 text-xs mt-10">
          I prezzi indicati sono placeholder. Contattaci per il listino aggiornato.
        </p>
      </div>
    </section>
  )
}
