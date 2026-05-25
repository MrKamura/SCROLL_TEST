import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 900,
  delay = 0,
  className = '',
}: AnimatedCounterProps) {
  const current = useAnimatedCounter(value, duration, delay)

  return (
    <span className={`tabular-nums ${className}`.trim()} aria-live="polite">
      {current}
    </span>
  )
}
