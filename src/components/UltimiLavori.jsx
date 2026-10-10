import { useRef, useEffect, useState } from 'react'
import { galleryItems, INSTAGRAM_URL } from '../data/gallery'
import { useFadeUp } from '../hooks/useFadeUp'
import Reveal from './Reveal'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

// Ogni riga della griglia a 4 colonne: una foto (2 colonne) + due video verticali (1 colonna).
// I video sono 1:2, quindi la cella e' alta quanto serve per mostrarli interi (niente crop sui capelli).
const SHAPES = {
  photo: { wrap: 'col-span-2', cell: 'aspect-[4/5] md:aspect-auto md:h-full', featured: true },
  video: { wrap: '', cell: 'aspect-[1/2] md:aspect-auto md:h-full' },
}

const WorkLabel = ({ item, featured = false }) => (
  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/82 via-black/40 to-transparent p-3 md:p-4 pointer-events-none">
    <span>
      <span className={`block font-display uppercase text-white leading-none ${featured ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'}`}>
        {item.label}
      </span>
      <span className="mt-1 block font-body text-[11px] md:text-xs text-neutral-300">
        {item.detail}
      </span>
    </span>
    <span className="hidden sm:inline-flex text-white/70">
      <InstagramIcon />
    </span>
  </span>
)

function VideoCell({ item, cell, featured = false }) {
  const videoRef = useRef(null)
  // Il poster si scarica appena l'attributo esiste: lo mettiamo solo quando la cella
  // si avvicina, così non ruba banda al titolo dell'hero durante il primo caricamento.
  const [near, setNear] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const nearIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          nearIo.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    nearIo.observe(video)
    return () => nearIo.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.3 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden bg-neutral-900 block ${cell}`}
      aria-label={`${item.label} su Instagram`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={near ? item.poster : undefined}
        className="w-full h-full object-cover"
      >
        <source src={item.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/28 transition-colors duration-300" />
      <WorkLabel item={item} featured={featured} />
    </a>
  )
}

function PhotoCell({ item, cell, featured = false }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden bg-neutral-900 block ${cell}`}
    >
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes="(min-width: 1152px) 556px, (min-width: 768px) 48vw, 92vw"
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/28 transition-colors duration-300" />
      <WorkLabel item={item} featured={featured} />
    </a>
  )
}

export default function UltimiLavori() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-display text-white/50 text-xs tracking-[0.2em] uppercase mb-3">
              Portfolio reale
            </p>
            <h2
              ref={titleRef}
              className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
            >
              Ultimi lavori
            </h2>
            
          </div>
          <p className="font-body text-neutral-400 text-sm md:max-w-sm leading-relaxed">
            Tagli, pieghe e finish pubblicati dal salone: una selezione rapida per capire mano, gusto e risultato.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[520px] gap-2">
          {galleryItems.map((item, i) => {
            const shape = SHAPES[item.type]
            const Cell = item.type === 'video' ? VideoCell : PhotoCell
            return (
              <Reveal key={i} delay={i * 70} y={18} className={shape.wrap}>
                <Cell item={item} cell={shape.cell} featured={!!shape.featured} />
              </Reveal>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 text-white font-body text-sm px-6 py-3 rounded hover:bg-white/5 transition-colors"
          >
            <InstagramIcon />
            Seguici su Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
