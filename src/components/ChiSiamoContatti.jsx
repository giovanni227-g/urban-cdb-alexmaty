import { useState, useCallback, useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
import { BUSINESS, WA_LINK_BARE, MAPS_URL } from '../data/business'
import Reveal from './Reveal'

const SALON_PHOTOS = [
  { src: '/salon-1.jpg', alt: 'Urban CDB Salon — interno 1' },
  { src: '/salon-2.jpg', alt: 'Urban CDB Salon — interno 2' },
  { src: '/salon-3.jpg', alt: 'Urban CDB Salon — interno 3' },
  { src: '/salon-4.jpg', alt: 'Urban CDB Salon — interno 4' },
]

const badges = ['Dal 2001', 'Parrucchiere', 'Estetica', 'Solarium']

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const ChevronIcon = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden="true">
    <path
      d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ChiSiamoContatti() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  const [photoIdx, setPhotoIdx] = useState(0)
  const touchStartX = useRef(0)
  const lastHoverTime = useRef(0)

  const nextPhoto = useCallback(() => {
    setPhotoIdx(i => (i + 1) % SALON_PHOTOS.length)
  }, [])

  const prevPhoto = useCallback(() => {
    setPhotoIdx(i => (i - 1 + SALON_PHOTOS.length) % SALON_PHOTOS.length)
  }, [])

  const handleMouseEnter = useCallback(() => {
    const now = Date.now()
    if (now - lastHoverTime.current < 400) return
    lastHoverTime.current = now
    nextPhoto()
  }, [nextPhoto])

  return (
    <section className="border-t border-neutral-900 py-20 md:py-28 relative overflow-hidden">
      {/* Stage light: bloom shifts to the left for this scene.
          Radial-gradient (not filter:blur) so it costs nothing to paint. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(38% 42% at 12% 30%, rgba(230,0,125,0.09) 0%, transparent 68%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Colonna sinistra — Chi siamo + Contatti */}
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

            <p className="font-body text-neutral-300 text-base leading-relaxed mb-5">
              Alex &amp; Maty lavora a Napoli dal 2001: taglio, colore, trattamenti, estetica
              e solarium in un salone costruito intorno a cura, ascolto e risultato finale.
            </p>
            <p className="font-body text-neutral-400 text-sm leading-relaxed mb-8">
              Il tratto è urbano, ma il metodo resta artigianale: diagnosi prima del servizio,
              prodotti professionali Matrix e L&apos;Oréal, e una mano allenata su look da portare
              davvero tutti i giorni.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {badges.map((b, i) => (
                <Reveal
                  key={b}
                  as="span"
                  delay={i * 90}
                  y={12}
                  className="inline-block border border-brand-magenta/60 text-brand-magenta font-display uppercase tracking-widest text-xs px-4 py-2"
                >
                  {b}
                </Reveal>
              ))}
            </div>

            <div className="relative overflow-hidden border border-white/[0.08] bg-white/[0.045] rounded p-5 mb-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-brand-magenta/25" aria-hidden="true" />
              <p className="font-display text-white uppercase tracking-widest text-sm mb-2">
                Prenoti, arrivi, ti siedi.
              </p>
              <p className="font-body text-neutral-400 text-sm leading-relaxed">
                Il salone è in Via Francesco Arnaldi 108/112. Per appuntamenti rapidi usa WhatsApp,
                per raggiungerci apri direttamente la mappa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.06] pt-8">
              <Reveal delay={0} y={14}>
                <p className="font-display text-white text-[10px] tracking-widest uppercase mb-2">Telefono</p>
                <a href={`tel:${BUSINESS.phone}`} className="font-body text-neutral-300 hover:text-white text-sm transition-colors">
                  {BUSINESS.phoneDisplay}
                </a>
              </Reveal>
              <Reveal delay={80} y={14}>
                <p className="font-display text-white text-[10px] tracking-widest uppercase mb-2">WhatsApp</p>
                <a
                  href={WA_LINK_BARE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-neutral-300 hover:text-white text-sm transition-colors"
                >
                  338 287 3428
                </a>
              </Reveal>
              <Reveal delay={160} y={14}>
                <p className="font-display text-white text-[10px] tracking-widest uppercase mb-2">Indirizzo</p>
                <p className="font-body text-neutral-400 text-sm leading-relaxed">
                  Via F. Arnaldi 108/112<br />80126 Napoli
                </p>
              </Reveal>
              <Reveal delay={240} y={14}>
                <p className="font-display text-white text-[10px] tracking-widest uppercase mb-2">Orari</p>
                <p className="font-body text-neutral-400 text-sm leading-relaxed">
                  Mar–Sab&nbsp;9:00–19:00<br />
                  <span className="text-neutral-600">Lun e Dom chiuso</span>
                </p>
              </Reveal>
            </div>
          </div>

          {/* Colonna destra — Gallery foto */}
          <div className="flex flex-col gap-4">
            <div
              className="relative overflow-hidden rounded-sm aspect-video cursor-pointer group"
              onMouseEnter={handleMouseEnter}
              onClick={nextPhoto}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 40) {
                  e.preventDefault()
                  if (diff > 0) nextPhoto(); else prevPhoto()
                }
              }}
            >
              {SALON_PHOTOS.map((photo, i) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    i === photoIdx ? 'opacity-100 ken-burns' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-50 hover:opacity-100 transition-opacity"
                aria-label="Foto precedente"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-50 hover:opacity-100 transition-opacity"
                aria-label="Foto successiva"
              >
                <ChevronIcon dir="right" />
              </button>
              <span className="absolute bottom-3 right-3 text-[10px] text-white/60 font-display tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                {photoIdx + 1}&nbsp;/&nbsp;{SALON_PHOTOS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {SALON_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === photoIdx
                      ? 'w-5 h-1.5 bg-brand-magenta'
                      : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Vai alla foto ${i + 1}`}
                />
              ))}
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/15 text-neutral-300 hover:text-white font-body text-sm px-5 py-3 rounded transition-colors hover:bg-white/5 w-fit"
            >
              <span className="text-brand-magenta"><MapPinIcon /></span>
              Apri in Google Maps
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
