import type { DocumentCheck } from '../types/document'
import { AnimatedCounter } from './AnimatedCounter'
import { Card } from './Card'
import { StatusIcon } from './StatusIcon'

interface ChecksListProps {
  checks: DocumentCheck[]
  resetKey?: string
}

export function ChecksList({ checks, resetKey = 'default' }: ChecksListProps) {
  const successCount = checks.filter((c) => c.status === 'success').length
  const warningCount = checks.filter((c) => c.status === 'warning').length
  const errorCount = checks.filter((c) => c.status === 'error').length

  const badges = (
    <div key={resetKey} className="flex flex-wrap items-center gap-2 text-status">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-page px-2.5 py-1 text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        В норме · <AnimatedCounter value={successCount} delay={100} />
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-page px-2.5 py-1 text-warning">
        <span className="h-1.5 w-1.5 rounded-full bg-warning" />
        Внимание · <AnimatedCounter value={warningCount} delay={250} />
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-page px-2.5 py-1 text-error">
        <span className="h-1.5 w-1.5 rounded-full bg-error" />
        Риски · <AnimatedCounter value={errorCount} delay={400} />
      </span>
    </div>
  )

  return (
    <Card
      title="Автоматические проверки"
      subtitle={`Всего проверок: ${checks.length}`}
      action={badges}
    >
      <ul className="space-y-2">
        {checks.map((check, index) => (
          <li
            key={index}
            className="flex min-w-0 items-start gap-3 rounded-xl border border-border bg-page px-3 py-3 sm:px-4"
          >
            <StatusIcon status={check.status} className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="break-words text-table-data font-semibold text-foreground">
                {check.title}
              </p>
              <p className="mt-0.5 break-words text-status text-pretty text-muted">
                {check.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
