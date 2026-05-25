interface BeforeCardProps {
  fileName: string
  pageCount: number
  fileSize: string
  typeLabel: string
}

function pluralPages(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return 'страница'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'страницы'
  return 'страниц'
}

export function BeforeCard({ fileName, pageCount, fileSize, typeLabel }: BeforeCardProps) {
  return (
    <div className="flex w-full min-w-0 items-start gap-3 rounded-2xl border border-border bg-card p-4 sm:items-center sm:gap-4 sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent sm:h-14 sm:w-14">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M9 14h6" />
          <path d="M9 17h4" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-status text-muted">
          <span className="uppercase tracking-[0.16em]">До</span>
          <span aria-hidden="true">·</span>
          <span>Загруженный файл</span>
        </div>
        <p className="mt-1 break-all text-table-data font-semibold text-foreground sm:break-words">
          {fileName}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-status text-muted">
          <span>
            {pageCount} {pluralPages(pageCount)}
          </span>
          <span aria-hidden="true">·</span>
          <span>{fileSize}</span>
          <span aria-hidden="true">·</span>
          <span>PDF</span>
          <span aria-hidden="true">·</span>
          <span className="text-foreground">{typeLabel}</span>
        </div>
      </div>
    </div>
  )
}
