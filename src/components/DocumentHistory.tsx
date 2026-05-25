import type { HistoryEntry } from '../history'
import type { DocumentType } from '../types/document'
import { Card } from './Card'

interface DocumentHistoryProps {
  entries: HistoryEntry[]
  activeType?: DocumentType
  disabled?: boolean
  onSelect: (type: DocumentType) => void
}

function formatProcessedAt(iso: string) {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)

  if (diffMin < 1) return 'только что'
  if (diffMin < 60) return `${diffMin} мин назад`

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function DocumentHistory({
  entries,
  activeType,
  disabled = false,
  onSelect,
}: DocumentHistoryProps) {
  if (entries.length === 0) return null

  return (
    <Card
      title="История"
      subtitle={`Последние ${entries.length} обработанных документа`}
    >
      <ul className="space-y-2">
        {entries.map((entry) => {
          const isActive = activeType === entry.type
          return (
            <li key={entry.id}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(entry.type)}
                className={[
                  'flex w-full min-w-0 flex-col gap-2 rounded-xl border px-3 py-3 text-left transition sm:flex-row sm:items-center sm:justify-between sm:px-4',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                  isActive
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-page hover:border-accent/50',
                  disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                ].join(' ')}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-status">
                    <span className="font-semibold text-foreground">
                      {entry.typeLabel}
                    </span>
                    <span aria-hidden="true" className="text-muted">
                      ·
                    </span>
                    <span className="text-muted">
                      {formatProcessedAt(entry.processedAt)}
                    </span>
                  </div>
                  <p className="mt-1 break-all text-table-data text-muted sm:break-words">
                    {entry.fileName}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-status">
                    {entry.totalAmount && (
                      <span className="font-medium text-foreground">
                        {entry.totalAmount}
                      </span>
                    )}
                    <span className="text-muted">
                      {entry.processedInSec} сек
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 text-status">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-success">
                    ✓ {entry.checks.ok}
                  </span>
                  {entry.checks.warning > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-warning">
                      ! {entry.checks.warning}
                    </span>
                  )}
                  {entry.checks.error > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-error">
                      × {entry.checks.error}
                    </span>
                  )}
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
