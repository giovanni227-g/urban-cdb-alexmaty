import { useEffect, useState } from 'react'
import { WA_LINK } from '../data/business'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const base = 'transition-all duration-700 ease-out'
  const hidden = 'opacity-0 translate-y-6'
  const shown = 'opacity-100 translate-y-0'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20">
      {/* Dissolvenza cinematica verso il nero */}
      <div
        className="absolute bottom-0 inset-x-0 h-[55vh] bg-gradient-to-b from-transparent to-black pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Contenuto */}
      <div className="relative flex flex-col items-center" style={{ zIndex: 3 }}>
        <h1
          className={`font-display font-bold uppercase leading-none text-5xl md:text-7xl lg:text-8xl text-white ${base} ${visible ? shown : hidden}`}
        >
          Stile metropolitano,
          <br />
          cura artigianale.
        </h1>

        <div
          className={`w-16 h-px bg-brand-magenta mx-auto my-8 delay-150 ${base} ${visible ? shown : hidden}`}
        />

        <p
          className={`font-body text-neutral-300 text-base md:text-lg tracking-wide delay-300 ${base} ${visible ? shown : hidden}`}
        >
          Parrucchiere &middot; Estetica &middot; Solarium — Napoli dal 2001
        </p>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-10 inline-block bg-brand-magenta hover:bg-brand-magenta-dark text-white font-semibold font-body px-8 py-3 rounded transition-colors delay-500 ${base} ${visible ? shown : hidden}`}
        >
          Prenota su WhatsApp
        </a>
      </div>
    </section>
  )
}
