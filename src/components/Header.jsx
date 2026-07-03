import { useState, useEffect } from 'react'
import { WA_LINK } from '../data/business'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black/95 shadow-lg' : 'bg-transparent'
      }`}
    >
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
