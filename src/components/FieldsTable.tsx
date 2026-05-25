import type { DocumentField } from '../types/document'
import { Card } from './Card'
import { CopyDataButton } from './CopyDataButton'

interface FieldsTableProps {
  fields: DocumentField[]
}

export function FieldsTable({ fields }: FieldsTableProps) {
  return (
    <Card
      title="Извлечённые поля"
      subtitle={`Структурированные данные документа · ${fields.length} полей`}
      action={<CopyDataButton fields={fields} />}
    >
      {/* Мобильная версия — карточки */}
      <dl className="space-y-2 sm:hidden">
        {fields.map((field) => (
          <div
            key={field.label}
            className="rounded-xl border border-border bg-page px-3 py-3"
          >
            <dt className="text-status text-muted">{field.label}</dt>
            <dd className="mt-1 break-words text-table-data text-foreground">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Desktop — таблица */}
      <div className="hidden overflow-x-auto rounded-xl border border-border sm:block">
        <table className="w-full border-collapse text-table-data">
          <thead>
            <tr className="bg-page text-left text-status uppercase tracking-wide text-muted">
              <th className="w-[38%] px-4 py-3 font-medium">Поле</th>
              <th className="px-4 py-3 font-medium">Извлечённое значение</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr
                key={field.label}
                className={
                  index !== fields.length - 1 ? 'border-b border-border' : undefined
                }
              >
                <td className="break-words px-4 py-3 align-top text-muted">
                  {field.label}
                </td>
                <td className="break-words px-4 py-3 align-top text-foreground">
                  {field.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
