import type { ActionStatus, CheckStatus } from '../types/document'

type IconStatus = CheckStatus | ActionStatus

interface StatusIconProps {
  status: IconStatus
  className?: string
}

const baseClass =
  'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold'

const styles: Record<IconStatus, string> = {
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  error: 'bg-error/15 text-error',
  info: 'bg-accent/15 text-accent',
}

const glyphs: Record<IconStatus, string> = {
  success: '✓',
  warning: '!',
  error: '×',
  info: 'i',
}

export function StatusIcon({ status, className = '' }: StatusIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`${baseClass} ${styles[status]} ${className}`.trim()}
    >
      {glyphs[status]}
    </span>
  )
}
