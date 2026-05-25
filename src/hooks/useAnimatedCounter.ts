import { useEffect, useState } from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useAnimatedCounter(
  target: number,
  duration = 900,
  delay = 0,
) {
  const reduceMotion = prefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    let rafId = 0
    let cancelled = false
    const startedAt = performance.now() + delay

    const tick = (now: number) => {
      if (cancelled) return

      if (now < startedAt) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const elapsed = now - startedAt
      const progress = Math.min(1, elapsed / duration)
      setValue(Math.round(easeOutCubic(progress) * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [target, duration, delay, reduceMotion])

  return reduceMotion ? target : value
}
