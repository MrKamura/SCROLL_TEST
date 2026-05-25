import { useEffect, useState } from 'react'

interface ProcessingAnimationProps {
  onComplete: () => void
}

const STAGES = [
  'Определяю тип документа…',
  'Читаю реквизиты…',
  'Проверяю ИНН и КПП…',
  'Анализирую позиции…',
  'Готово',
]

const STAGE_INTERVAL_MS = 1200
const FAST_DURATION_MS = 1000
const FAST_TARGET = 60
const SLOW_TARGET = 90
const TOTAL_DURATION_MS = (STAGES.length - 1) * STAGE_INTERVAL_MS
const COMPLETE_HOLD_MS = 350

function calcProgress(elapsed: number) {
  if (elapsed >= TOTAL_DURATION_MS) return 100
  if (elapsed <= FAST_DURATION_MS) {
    return (elapsed / FAST_DURATION_MS) * FAST_TARGET
  }
  const ratio = (elapsed - FAST_DURATION_MS) / (TOTAL_DURATION_MS - FAST_DURATION_MS)
  return FAST_TARGET + ratio * (SLOW_TARGET - FAST_TARGET)
}

export function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setProgress(100)
      setStageIndex(STAGES.length - 1)
      const timer = window.setTimeout(onComplete, 400)
      return () => window.clearTimeout(timer)
    }

    const startedAt = performance.now()
    let rafId = 0
    let completeTimer: number | undefined
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return
      const elapsed = now - startedAt
      setProgress(Math.round(calcProgress(elapsed)))
      setStageIndex(
        Math.min(STAGES.length - 1, Math.floor(elapsed / STAGE_INTERVAL_MS)),
      )

      if (elapsed >= TOTAL_DURATION_MS) {
        completeTimer = window.setTimeout(onComplete, COMPLETE_HOLD_MS)
      } else {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      if (completeTimer !== undefined) window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  const isReady = stageIndex === STAGES.length - 1
  const barTransition = isReady
    ? 'transition-[width] duration-150 ease-out'
    : 'transition-[width] duration-75 linear'

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-accent/40 bg-card p-4 sm:p-6"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
          {isReady ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-success"
            >
              <path d="m5 12 5 5 9-11" />
            </svg>
          ) : (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent"
              aria-hidden="true"
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-table-data font-semibold text-foreground">
            {isReady ? 'Документ обработан' : 'Обрабатываем документ…'}
          </p>
          <p className="mt-0.5 text-status text-muted">
            <span key={stageIndex} className="inline-block animate-stage-fade">
              {STAGES[stageIndex]}
            </span>
          </p>
        </div>
        <span className="shrink-0 text-table-data font-semibold tabular-nums text-foreground">
          {progress}%
        </span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-page">
        <div
          className={`h-full rounded-full bg-accent ${barTransition}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
