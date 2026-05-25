import type { DocumentAnalysis, DocumentType } from '../types/document'

interface ExampleButtonsProps {
  examples: DocumentAnalysis[]
  activeType?: DocumentType
  disabled?: boolean
  onPick: (type: DocumentType) => void
}

function ExampleIcon({ type }: { type: DocumentType }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (type === 'invoice') {
    return (
      <svg {...common}>
        <path d="M5 3h11l3 3v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M15 3v4h4" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    )
  }
  if (type === 'act') {
    return (
      <svg {...common}>
        <path d="M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="m9 12 2 2 4-4" />
        <path d="M8 17h8" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M3 7h13l5 5v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
      <path d="M16 7v5h5" />
      <path d="M6 17h6" />
    </svg>
  )
}

export function ExampleButtons({
  examples,
  activeType,
  disabled = false,
  onPick,
}: ExampleButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {examples.map((example) => {
        const isActive = activeType === example.type
        return (
          <button
            key={example.type}
            type="button"
            disabled={disabled}
            onClick={() => onPick(example.type)}
            className={[
              'group relative flex min-w-0 flex-col rounded-2xl border bg-card p-4 text-left transition sm:p-5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              isActive
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/60 hover:bg-card/80',
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
            ].join(' ')}
          >
            <span
              className={[
                'mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl',
                isActive ? 'bg-accent text-white' : 'bg-accent/15 text-accent',
              ].join(' ')}
            >
              <ExampleIcon type={example.type} />
            </span>
            <span className="break-words text-block-title text-foreground">
              {example.example.title}
            </span>
            <span className="mt-1 break-words text-status text-muted">
              {example.example.caption}
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-status font-semibold text-accent">
              Посмотреть анализ
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </button>
        )
      })}
    </div>
  )
}
