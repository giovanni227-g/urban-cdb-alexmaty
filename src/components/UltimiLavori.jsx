import { useRef, useEffect } from 'react'
import { galleryItems, INSTAGRAM_URL } from '../data/gallery'
import { useFadeUp } from '../hooks/useFadeUp'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

function VideoCell({ item }) {
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
      className="group relative aspect-square overflow-hidden bg-neutral-900 block"
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
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <InstagramIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </a>
  )
}

function PhotoCell({ item }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square overflow-hidden bg-neutral-900 block"
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <InstagramIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </a>
  )
}

export default function UltimiLavori() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="border-t border-neutral-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
          Instagram
        </p>
        <h2
          ref={titleRef}
          className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
        >
          Ultimi lavori
        </h2>
        <div className="w-16 h-px bg-brand-magenta mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {galleryItems.map((item, i) =>
            item.type === 'video' ? (
              <VideoCell key={i} item={item} />
            ) : (
              <PhotoCell key={i} item={item} />
            )
          )}
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
