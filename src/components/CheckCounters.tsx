import { AnimatedCounter } from './AnimatedCounter'

interface CheckCountersProps {
  success: number
  warning: number
  error: number
  resetKey?: string
}

export function CheckCounters({
  success,
  warning,
  error,
  resetKey = 'default',
}: CheckCountersProps) {
  return (
    <div
      key={resetKey}
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      aria-label="Сводка проверок"
    >
      <div className="rounded-2xl border border-success/40 bg-success/10 p-4">
        <p className="text-status uppercase tracking-wide text-muted">В норме</p>
        <p className="mt-2 flex items-baseline gap-1">
          <AnimatedCounter
            value={success}
            delay={100}
            className="text-3xl font-bold text-success sm:text-4xl"
          />
          <span className="text-status text-muted">проверок</span>
        </p>
      </div>

      <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4">
        <p className="text-status uppercase tracking-wide text-muted">Внимание</p>
        <p className="mt-2 flex items-baseline gap-1">
          <AnimatedCounter
            value={warning}
            delay={250}
            className="text-3xl font-bold text-warning sm:text-4xl"
          />
          <span className="text-status text-muted">предупр.</span>
        </p>
      </div>

      <div className="rounded-2xl border border-error/40 bg-error/10 p-4">
        <p className="text-status uppercase tracking-wide text-muted">Риски</p>
        <p className="mt-2 flex items-baseline gap-1">
          <AnimatedCounter
            value={error}
            delay={400}
            className="text-3xl font-bold text-error sm:text-4xl"
          />
          <span className="text-status text-muted">ошибок</span>
        </p>
      </div>
    </div>
  )
}
