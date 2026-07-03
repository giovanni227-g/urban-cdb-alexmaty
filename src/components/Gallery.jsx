import { useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const SALON_PHOTOS = [
  { src: '/salon-1.jpg', alt: 'Reception e postazioni' },
  { src: '/salon-2.jpg', alt: 'Specchi LED — vista frontale' },
  { src: '/salon-3.jpg', alt: 'Area prodotti' },
  { src: '/salon-4.jpg', alt: 'Specchi LED — vista ampia' },
]

export default function Gallery() {
  const titleRef = useRef(null)
  useFadeUp(titleRef)

  return (
    <section className="snap-start scroll-mt-16 border-t border-neutral-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
          Spazio
        </p>
        <h2
          ref={titleRef}
          className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none mb-4"
        >
          Il salone
        </h2>
        <div className="w-16 h-px bg-brand-magenta mb-10" />

        <div className="grid grid-cols-2 gap-2">
          {SALON_PHOTOS.map((photo, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-neutral-900">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
