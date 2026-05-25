import type { DocumentAction } from '../types/document'
import { Card } from './Card'
import { StatusIcon } from './StatusIcon'

interface ActionsListProps {
  actions: DocumentAction[]
}

export function ActionsList({ actions }: ActionsListProps) {
  return (
    <Card
      title="Что нужно сделать"
      subtitle="Рекомендованные действия по документу"
    >
      <ol className="space-y-2">
        {actions.map((action, index) => (
          <li
            key={index}
            className="flex min-w-0 items-start gap-3 rounded-xl border border-border bg-page px-3 py-3 sm:px-4"
          >
            <StatusIcon status={action.status} className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="break-words text-table-data font-semibold text-foreground">
                {action.title}
              </p>
              <p className="mt-0.5 break-words text-status text-pretty text-muted">
                {action.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}
