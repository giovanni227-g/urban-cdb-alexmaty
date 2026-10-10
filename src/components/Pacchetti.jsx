import { useState, useRef } from 'react'
import { packages, menuBellezza } from '../data/packages'
import { WA_LINK, waLinkFor } from '../data/business'
import { useFadeUp } from '../hooks/useFadeUp'
import Reveal from './Reveal'

// Stesso gesto ovunque: tocchi la voce, si apre WhatsApp con il messaggio gia' scritto.
// La freccia accanto al prezzo e' l'indizio visibile (su mobile non c'e' hover).
const Arrow = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TABS = [
  { id: 'pacchetti', label: 'Pacchetti' },
  { id: 'menu', label: 'Menù Bellezza' },
]

export default function Pacchetti() {
  const [tab, setTab] = useState('pacchetti')
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 w-full">
        <div className="mb-7 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-display text-white/50 text-xs tracking-[0.2em] uppercase mb-3">
              Listino
            </p>
            <h2
              ref={titleRef}
              className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
            >
              Prezzi
            </h2>
            
          </div>
          <p className="font-body text-neutral-400 text-sm md:max-w-sm leading-relaxed">
            Pacchetti per chi vuole uscire con il look completo, menu singolo per interventi mirati.
          </p>
        </div>

        <div className="flex gap-8 border-b border-white/10 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-display uppercase tracking-widest text-sm pb-3 border-b-2 -mb-px transition-colors duration-200 cursor-pointer ${
                tab === t.id
                  ? 'text-white border-brand-magenta'
                  : 'text-neutral-400 border-transparent hover:text-neutral-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'pacchetti' && (
          <div
            key="pacchetti"
            className="grid sm:grid-cols-2 gap-3"
            style={{ animation: 'tabFadeIn 0.35s ease both' }}
          >
            {packages.map((pkg, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                y={20}
                className="border-t border-white/20 transition-colors duration-300 hover:border-brand-magenta"
              >
                <a
                  href={waLinkFor(`Ciao! Vorrei prenotare il pacchetto ${pkg.name}${pkg.note ? ` ${pkg.note}` : ''} (${pkg.bestFor}, ${pkg.price}) da Alex & Maty`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Prenota ${pkg.name} (${pkg.bestFor}, ${pkg.price}) su WhatsApp`}
                  className="group flex h-full flex-col pt-5 pb-3"
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div>
                      <p className="font-display text-white/50 text-[10px] tracking-widest uppercase mb-2">
                        {pkg.bestFor}
                      </p>
                      <h3 className="font-display uppercase text-white text-xl tracking-widest leading-none">
                        {pkg.name}
                      </h3>
                    </div>
                    <span className="font-display text-white/60 text-[10px] tracking-widest uppercase shrink-0">
                      {pkg.note || 'Colore'}
                    </span>
                  </div>
                  <ul className="flex-1 space-y-2 mb-6">
                    {pkg.services.map((s) => (
                      <li key={s} className="font-body text-neutral-300 text-sm flex items-center gap-2.5">
                        <span className="w-2 h-px bg-white/40 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center justify-end gap-3 text-white transition-colors duration-300 group-hover:text-brand-magenta">
                    <span className="font-display text-4xl font-bold leading-none">{pkg.price}</span>
                    <Arrow className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'menu' && (
          <div
            key="menu"
            className="border-t border-white/20 pt-4"
            style={{ animation: 'tabFadeIn 0.35s ease both' }}
          >
            <ul className="md:columns-2 md:gap-10">
              {menuBellezza.map((item, i) => (
                <li
                  key={item.name}
                  className={`break-inside-avoid ${
                    i < menuBellezza.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  <a
                    href={waLinkFor(`Ciao! Vorrei prenotare: ${item.name} (${item.price}) da Alex & Maty`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Prenota ${item.name} su WhatsApp`}
                    className="group flex justify-between items-baseline py-3.5 transition-colors hover:text-white"
                  >
                    <span className="font-body text-neutral-300 group-hover:text-white text-sm">{item.name}</span>
                    <span className="ml-4 flex shrink-0 items-center gap-2 font-body font-semibold text-white text-sm tabular-nums transition-colors duration-300 group-hover:text-brand-magenta">
                      {item.price}
                      <Arrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="font-body text-neutral-400 text-sm">
            Per confermare disponibilità e durata del servizio, il modo più rapido resta WhatsApp.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center bg-white text-black hover:bg-brand-magenta hover:text-white font-body font-semibold text-sm px-5 py-3 rounded transition-colors"
          >
            Chiedi disponibilità
          </a>
        </div>
      </div>
    </section>
  )
}
