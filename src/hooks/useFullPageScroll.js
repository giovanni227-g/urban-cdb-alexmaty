import { useState, useEffect, useRef, useCallback } from 'react'

const TRANSITION_MS = 700

function calcOffset(index, sectionIds) {
  let y = 0
  for (let i = 0; i < index; i++) {
    const el = document.getElementById(sectionIds[i])
    if (el) y += el.offsetHeight
  }
  return y
}

export function useFullPageScroll(sectionIds) {
  const [current, setCurrent] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const currentRef = useRef(0)
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)

  const goTo = useCallback((index) => {
    if (!window.matchMedia('(min-width: 768px)').matches) return
    if (isAnimating.current) return
    const next = Math.max(0, Math.min(sectionIds.length - 1, index))
    if (next === currentRef.current) return

    isAnimating.current = true
    currentRef.current = next
    setCurrent(next)
    setTranslateY(-calcOffset(next, sectionIds))
    setTimeout(() => { isAnimating.current = false }, TRANSITION_MS + 50)
  }, [sectionIds])

  // Wheel — desktop only, passive (no preventDefault needed: overflow:hidden blocca scroll nativo)
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return
    const onWheel = (e) => {
      if (isAnimating.current) return
      if (e.deltaY > 15) goTo(currentRef.current + 1)
      else if (e.deltaY < -15) goTo(currentRef.current - 1)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goTo])

  // Touch — desktop only
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return
    const onStart = (e) => { touchStartY.current = e.touches[0].clientY }
    const onEnd = (e) => {
      if (isAnimating.current) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (delta > 60) goTo(currentRef.current + 1)
      else if (delta < -60) goTo(currentRef.current - 1)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [goTo])

  // Tastiera
  useEffect(() => {
    const onKey = (e) => {
      if (!window.matchMedia('(min-width: 768px)').matches) return
      if (isAnimating.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(currentRef.current + 1) }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); goTo(currentRef.current - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  return { current, translateY, goTo }
}
