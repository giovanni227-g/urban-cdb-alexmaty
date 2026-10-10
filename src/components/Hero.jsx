import { TRUST_MARKERS, WA_LINK } from '../data/business'

export default function Hero() {
  // Ingresso in CSS (.hero-in): parte sull'HTML pre-renderizzato, senza aspettare React
  const base = 'hero-in'

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 pt-20 overflow-hidden">
      {/* Contenuto */}
      <div className="relative flex min-w-0 flex-col items-center w-full max-w-6xl" style={{ zIndex: 3 }}>

        <h1 className="min-w-0 w-full max-w-[calc(100vw-2.5rem)] md:max-w-none font-display font-bold uppercase leading-[0.92] tracking-normal text-[clamp(2rem,8vw,5.8rem)] sm:text-[clamp(2.35rem,9.4vw,5.8rem)] md:text-7xl lg:text-8xl text-white">
          {/* Reveal in due tempi: la seconda riga entra un attimo dopo la prima */}
          <span className="block min-w-0 overflow-hidden">
            <span className="block hero-rise">
              Stile metropolitano,
            </span>
          </span>
          <span className="block min-w-0 overflow-hidden">
            <span className="block hero-rise [animation-delay:150ms]">
              cura artigianale<span className="text-brand-magenta">.</span>
            </span>
          </span>
        </h1>

        <div
          className={`w-16 h-px bg-brand-magenta mx-auto my-8 [animation-delay:300ms] ${base}`}
        />

        <p
          className={`max-w-[calc(100vw-2.5rem)] font-body text-neutral-300 text-sm sm:text-base md:text-lg leading-snug tracking-wide [animation-delay:500ms] ${base}`}
        >
          Parrucchiere &middot; Estetica &middot; Solarium, Napoli dal 2001
        </p>

        <div
          className={`mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-neutral-400 [animation-delay:650ms] ${base}`}
        >
          {TRUST_MARKERS.map((marker) => (
            <span key={marker} className="inline-flex items-center gap-2 font-display uppercase tracking-[0.13em] md:tracking-[0.18em] text-[10px]">
              <span className="h-px w-3 bg-white/40" />
              {marker}
            </span>
          ))}
        </div>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex items-center gap-2.5 bg-brand-magenta hover:bg-brand-magenta-dark text-white font-semibold font-body px-8 py-3.5 rounded shadow-lg shadow-black/40 hover:-translate-y-0.5 transition-all duration-300 [animation-delay:700ms] ${base}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.01c-.24.68-1.42 1.31-1.95 1.35-.5.04-.98.22-3.3-.69-2.79-1.1-4.55-3.96-4.69-4.15-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.24-.26.53-.32.71-.32.18 0 .35 0 .51.01.16.01.38-.06.6.46.24.55.79 1.9.86 2.04.07.14.11.3.02.49-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.87.26.14.44.21.5.32.06.11.06.65-.18 1.33z" />
          </svg>
          Prenota su WhatsApp
        </a>
      </div>
    </section>
  )
}
