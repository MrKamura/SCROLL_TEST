import { useState } from 'react'
import type { DocumentField } from '../types/document'
import { copyFieldsTable } from '../utils/copyTable'

interface CopyDataButtonProps {
  fields: DocumentField[]
}

export function CopyDataButton({ fields }: CopyDataButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const handleCopy = async () => {
    try {
      await copyFieldsTable(fields)
      setStatus('copied')
      window.setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 2500)
    }
  }

  const label =
    status === 'copied'
      ? 'Скопировано'
      : status === 'error'
        ? 'Не удалось скопировать'
        : 'Скопировать данные'

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        'inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-status font-medium transition sm:w-auto',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        status === 'copied'
          ? 'border-success/40 bg-success/10 text-success'
          : status === 'error'
            ? 'border-error/40 bg-error/10 text-error'
            : 'border-border bg-page text-foreground hover:border-accent/60',
      ].join(' ')}
    >
      {status === 'copied' ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5 12 5 5 9-11" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {label}
    </button>
  )
}
