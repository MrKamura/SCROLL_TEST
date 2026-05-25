import { useCallback, useState } from 'react'
import { createHistoryEntry, type HistoryEntry } from '../history'
import type { DocumentAnalysis } from '../types/document'

const STORAGE_KEY = 'scroll-document-history'
const MAX_ENTRIES = 3

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryEntry[]
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ENTRIES) : []
  } catch {
    return []
  }
}

function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)))
}

export function useDocumentHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)

  const addEntry = useCallback((doc: DocumentAnalysis) => {
    const entry = createHistoryEntry(doc)
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_ENTRIES)
      saveHistory(next)
      return next
    })
  }, [])

  return { history, addEntry }
}
