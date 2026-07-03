import { useState, useEffect } from 'react'

const WA_LINK =
  'https://wa.me/393382873428?text=Ciao!%20Vorrei%20prenotare%20un%20appuntamento%20da%20Alex%20%26%20Maty'

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
        <div className="flex flex-col leading-none">
          <span className="font-display text-brand-magenta text-xs tracking-widest uppercase">
            Urban CDB Salon
          </span>
          <span className="font-display text-white text-xl md:text-2xl font-bold tracking-wide uppercase">
            Alex &amp; Maty
          </span>
        </div>

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
