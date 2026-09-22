import { BUSINESS } from '../data/business'
import { reviews } from '../data/reviews'
import Reveal from './Reveal'

export default function SocialProof() {
  return (
    <section className="border-t border-neutral-900 py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10" y={12}>
          <div>
            <p className="font-display text-brand-magenta text-xs tracking-widest uppercase mb-3">
              Recensioni Google
            </p>
            <h2 className="font-display font-bold uppercase text-4xl md:text-5xl text-white leading-none">
              Si torna per la mano.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-3xl leading-none">{BUSINESS.ratingDisplay}</span>
            <span className="text-brand-magenta text-sm">★★★★★</span>
            <span className="font-body text-neutral-500 text-xs">· {BUSINESS.reviewsCount} recensioni Google</span>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 80}
              y={18}
              className="border border-white/[0.08] bg-white/[0.045] rounded p-5"
            >
              <p className="font-body text-neutral-300 italic text-sm leading-relaxed mb-5">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="font-display text-brand-magenta text-[10px] uppercase tracking-widest">
                — {r.name}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-900 pb-24 md:pb-0">
          <p className="font-body text-neutral-700 text-xs text-center">
            © Alex &amp; Maty – Urban CDB Salon · Via Francesco Arnaldi 108/112, 80126 Napoli
            {' · '}
            <a href="/privacy" className="hover:text-neutral-400 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
