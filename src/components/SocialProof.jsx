import { reviews } from '../data/reviews'

export default function SocialProof() {
  return (
    <section className="border-t border-neutral-900 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-display font-bold text-white text-lg">4,8</span>
          <span className="text-brand-magenta text-sm">★★★★★</span>
          <span className="font-body text-neutral-600 text-xs">· 31 recensioni Google</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {reviews.map((r) => (
            <div key={r.name}>
              <p className="font-body text-neutral-500 italic text-xs leading-relaxed mb-3">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="font-display text-brand-magenta text-[10px] uppercase tracking-widest">
                — {r.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-900 pb-24 md:pb-0">
          <p className="font-body text-neutral-700 text-xs text-center">
            © Alex &amp; Maty – Urban CDB Salon · Via Francesco Arnaldi 108/112, 80126 Napoli
          </p>
        </div>
      </div>
    </section>
  )
}
