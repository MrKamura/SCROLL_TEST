import type { DocumentField } from '../types/document'

function escapeCell(value: string) {
  return value.replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

export function formatFieldsTable(fields: DocumentField[]) {
  const rows = [
    ['Поле', 'Извлечённое значение'],
    ...fields.map((field) => [field.label, field.value]),
  ]

  return rows.map((row) => row.map(escapeCell).join('\t')).join('\n')
}

export async function copyFieldsTable(fields: DocumentField[]) {
  const text = formatFieldsTable(fields)

  if (!navigator.clipboard?.writeText) {
    throw new Error('Копирование недоступно — откройте приложение по HTTPS или localhost')
  }

  await navigator.clipboard.writeText(text)
}
