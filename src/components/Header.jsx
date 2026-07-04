import { WA_LINK } from '../data/business'

export default function Header() {
  return (
    <header className="site-header fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col leading-none text-left"
          aria-label="Torna alla home"
        >
          <span className="font-display text-brand-magenta text-xs tracking-widest uppercase">
            Urban CDB Salon
          </span>
          <span className="font-display text-white text-xl md:text-2xl font-bold tracking-wide uppercase">
            Alex &amp; Maty
          </span>
        </button>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm font-semibold text-white bg-brand-magenta hover:bg-brand-magenta-dark transition-colors px-4 py-2 rounded"
        >
          Prenota
        </a>
      </div>
    </header>
  )
}
