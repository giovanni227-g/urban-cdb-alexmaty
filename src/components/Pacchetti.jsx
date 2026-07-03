import { useState, useRef } from 'react'
import { packages, menuBellezza } from '../data/packages'
import { useFadeUp } from '../hooks/useFadeUp'

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-brand-magenta/[0.06] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 w-full">
        <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
          Listino
        </p>
        <h2
          ref={titleRef}
          className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
        >
          Prezzi
        </h2>
        <div className="w-16 h-px bg-brand-magenta mb-6" />

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
              <div
                key={i}
                className="bg-white/[0.06] border border-white/10 rounded-xl p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display uppercase text-white text-xl tracking-widest leading-none">
                    {pkg.name}
                  </h3>
                  {pkg.note && (
                    <span className="font-display text-brand-magenta text-[10px] tracking-widest uppercase border border-brand-magenta/40 px-2 py-1 rounded shrink-0">
                      {pkg.note}
                    </span>
                  )}
                </div>
                <div className="w-8 h-px bg-brand-magenta mb-4" />
                <ul className="flex-1 space-y-2 mb-5">
                  {pkg.services.map((s) => (
                    <li key={s} className="font-body text-neutral-400 text-sm flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-brand-magenta shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="text-right">
                  <span className="font-display text-brand-magenta text-4xl font-bold leading-none">
                    {pkg.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'menu' && (
          <div
            key="menu"
            className="bg-white/[0.06] border border-white/10 rounded-xl p-6 md:p-8"
            style={{ animation: 'tabFadeIn 0.35s ease both' }}
          >
            <ul>
              {menuBellezza.map((item, i) => (
                <li
                  key={item.name}
                  className={`flex justify-between items-baseline py-3.5 ${
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
      </div>
    </section>
  )
}
