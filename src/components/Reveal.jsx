import { useEffect, useRef, useState } from 'react'

/**
 * Reveals its children on scroll-in: fade + rise, with an optional stagger delay.
 * Compositor-only (opacity + transform) so it stays smooth on mobile.
 * Reduced-motion is honoured globally in index.css — the content still appears,
 * it just skips the movement.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 24,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
