import { useRef, useEffect } from 'react'
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

function VideoCell({ item, featured = false }) {
  const videoRef = useRef(null)

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
      className={`group relative overflow-hidden bg-neutral-900 block ${featured ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-square'}`}
      aria-label={`${item.label} su Instagram`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={item.poster}
        className="w-full h-full object-cover"
      >
        <source src={item.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/28 transition-colors duration-300" />
      <WorkLabel item={item} featured={featured} />
    </a>
  )
}

function PhotoCell({ item, featured = false }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden bg-neutral-900 block ${featured ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-square'}`}
    >
      <img
        src={item.src}
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
    <section className="border-t border-neutral-900 py-20 md:py-28 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
              Portfolio reale
            </p>
            <h2
              ref={titleRef}
              className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
            >
              Ultimi lavori
            </h2>
            <div className="w-16 h-px bg-brand-magenta" />
          </div>
          <p className="font-body text-neutral-400 text-sm md:max-w-sm leading-relaxed">
            Tagli, pieghe e finish pubblicati dal salone: una selezione rapida per capire mano, gusto e risultato.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(150px,1fr)] gap-2">
          {galleryItems.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              y={18}
              className={i === 0 ? 'col-span-2 md:row-span-2' : ''}
            >
              {item.type === 'video' ? (
                <VideoCell item={item} featured={i === 0} />
              ) : (
                <PhotoCell item={item} featured={i === 0} />
              )}
            </Reveal>
          ))}
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
