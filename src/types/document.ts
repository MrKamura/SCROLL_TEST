export type DocumentType = 'invoice' | 'act' | 'waybill'

export type CheckStatus = 'success' | 'warning' | 'error'
export type ActionStatus = 'info'
export type StatTone = 'default' | 'success' | 'warning' | 'error' | 'accent'

export interface DocumentField {
  label: string
  value: string
}

export interface DocumentCheck {
  status: CheckStatus
  title: string
  detail: string
}

export interface DocumentAction {
  status: ActionStatus
  title: string
  detail: string
}

export interface DocumentItem {
  index: number
  name: string
  quantity: string
  price: string
  amount: string
  vat: string
  meta?: string
}

export interface DocumentStat {
  label: string
  value: string
  hint?: string
  tone?: StatTone
}

export interface ExampleMeta {
  title: string
  caption: string
}

export interface DocumentAnalysis {
  type: DocumentType
  typeLabel: string
  fileName: string
  pageCount: number
  fileSize: string
  example: ExampleMeta
  processedInSec: number
  summary: DocumentStat[]
  fields: DocumentField[]
  checks: DocumentCheck[]
  items: DocumentItem[]
  actions: DocumentAction[]
}
