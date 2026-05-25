import type { DocumentStat, StatTone } from '../types/document'

interface SummaryStatsProps {
  stats: DocumentStat[]
}

const toneStyles: Record<StatTone, string> = {
  default: 'border-border bg-card',
  accent: 'border-accent/40 bg-accent/10',
  success: 'border-success/40 bg-success/10',
  warning: 'border-warning/40 bg-warning/10',
  error: 'border-error/40 bg-error/10',
}

const valueColor: Record<StatTone, string> = {
  default: 'text-foreground',
  accent: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

export function SummaryStats({ stats }: SummaryStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const tone: StatTone = stat.tone ?? 'default'
        return (
          <div
            key={stat.label}
            className={`rounded-2xl border p-4 ${toneStyles[tone]}`}
          >
            <p className="text-status uppercase tracking-wide text-muted">
              {stat.label}
            </p>
            <p
              className={`mt-2 text-xl font-semibold tabular-nums sm:text-2xl ${valueColor[tone]}`}
            >
              {stat.value}
            </p>
            {stat.hint && (
              <p className="mt-1 text-status text-muted">{stat.hint}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
