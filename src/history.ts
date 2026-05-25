import type { DocumentAnalysis, DocumentType } from './types/document'

export interface HistoryChecksSummary {
  ok: number
  warning: number
  error: number
}

export interface HistoryEntry {
  id: string
  type: DocumentType
  typeLabel: string
  fileName: string
  processedInSec: number
  processedAt: string
  totalAmount?: string
  checks: HistoryChecksSummary
}

export function createHistoryEntry(doc: DocumentAnalysis): HistoryEntry {
  const total =
    doc.summary.find((s) => s.label.includes('Итого'))?.value ??
    doc.summary.find((s) => s.tone === 'accent')?.value

  return {
    id: `${doc.type}-${Date.now()}`,
    type: doc.type,
    typeLabel: doc.typeLabel,
    fileName: doc.fileName,
    processedInSec: doc.processedInSec,
    processedAt: new Date().toISOString(),
    totalAmount: total,
    checks: {
      ok: doc.checks.filter((c) => c.status === 'success').length,
      warning: doc.checks.filter((c) => c.status === 'warning').length,
      error: doc.checks.filter((c) => c.status === 'error').length,
    },
  }
}
