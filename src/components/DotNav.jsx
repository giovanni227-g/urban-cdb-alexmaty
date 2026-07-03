export default function DotNav({ sections, current, onGo }) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 hidden md:flex">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onGo(i)}
          className="group relative flex items-center justify-end gap-3 cursor-pointer"
          aria-label={s.label}
        >
          {/* Label tooltip */}
          <span className="font-display text-[10px] uppercase tracking-widest text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap select-none">
            {s.label}
          </span>

          {/* Dot */}
          <span
            className={`block rounded-full flex-shrink-0 transition-all duration-300 ${
              i === current
                ? 'w-2.5 h-2.5 bg-brand-magenta'
                : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'
            }`}
            style={i === current ? { boxShadow: '0 0 8px #E6007D' } : undefined}
          />
        </button>
      ))}
    </nav>
  )
}
