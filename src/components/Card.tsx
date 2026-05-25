import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Card({ title, subtitle, action, children, className = '' }: CardProps) {
  return (
    <section
      className={`w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors duration-200 sm:p-6 ${className}`.trim()}
    >
      {(title || action) && (
        <header className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {title && (
              <h2 className="text-block-title text-balance text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-status text-pretty text-muted">{subtitle}</p>
            )}
          </div>
          {action && <div className="min-w-0 shrink-0">{action}</div>}
        </header>
      )}
      <div className="min-w-0">{children}</div>
    </section>
  )
}
