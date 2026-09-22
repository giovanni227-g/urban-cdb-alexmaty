import { useState, useRef } from 'react'
import { packages, menuBellezza } from '../data/packages'
import { WA_LINK } from '../data/business'
import { useFadeUp } from '../hooks/useFadeUp'
import Reveal from './Reveal'

const TABS = [
  { id: 'pacchetti', label: 'Pacchetti' },
  { id: 'menu', label: 'Menù Bellezza' },
]

export default function Pacchetti() {
  const [tab, setTab] = useState('pacchetti')
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="border-t border-neutral-900 py-16 md:py-24 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 w-full">
        <div className="mb-7 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
              Listino
            </p>
            <h2
              ref={titleRef}
              className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
            >
              Prezzi
            </h2>
            <div className="w-16 h-px bg-brand-magenta" />
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
                  : 'text-neutral-500 border-transparent hover:text-neutral-300'
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
                className="group relative overflow-hidden bg-white/[0.055] border border-white/10 rounded p-5 flex flex-col transition-colors duration-300 hover:bg-white/[0.085] hover:border-brand-magenta/45 hover:shadow-xl hover:shadow-black/40"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-brand-magenta/20 group-hover:border-brand-magenta/45 transition-colors duration-300" aria-hidden="true" />
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-display text-brand-magenta text-[10px] tracking-widest uppercase mb-2">
                      {pkg.bestFor}
                    </p>
                    <h3 className="font-display uppercase text-white text-xl tracking-widest leading-none">
                      {pkg.name}
                    </h3>
                  </div>
                  <span className="font-display text-brand-magenta text-[10px] tracking-widest uppercase border border-brand-magenta/40 px-2 py-1 rounded shrink-0">
                    {pkg.note || 'Colore'}
                  </span>
                </div>
                <div className="w-8 group-hover:w-12 h-px bg-brand-magenta mb-4 transition-all duration-300" />
                <ul className="flex-1 space-y-2 mb-6">
                  {pkg.services.map((s) => (
                    <li key={s} className="font-body text-neutral-400 text-sm flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-brand-magenta shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-end border-t border-white/[0.06] pt-4">
                  <span className="font-display text-brand-magenta text-4xl font-bold leading-none">
                    {pkg.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'menu' && (
          <div
            key="menu"
            className="bg-white/[0.055] border border-white/10 rounded p-6 md:p-8"
            style={{ animation: 'tabFadeIn 0.35s ease both' }}
          >
            <ul className="md:columns-2 md:gap-10">
              {menuBellezza.map((item, i) => (
                <li
                  key={item.name}
                  className={`break-inside-avoid flex justify-between items-baseline py-3.5 ${
                    i < menuBellezza.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  <span className="font-body text-neutral-300 text-sm">{item.name}</span>
                  <span className="font-body font-semibold text-brand-magenta text-sm tabular-nums ml-4 shrink-0">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="font-body text-neutral-500 text-sm">
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
