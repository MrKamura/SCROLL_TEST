export const colorsDark = {
  page: '#0F1117',
  card: '#1A1D27',
  border: '#2A2D37',
  foreground: '#E4E4E7',
  muted: '#71717A',
  accent: '#2563EB',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const

export const colorsLight = {
  page: '#F4F4F5',
  card: '#FFFFFF',
  border: '#E4E4E7',
  foreground: '#18181B',
  muted: '#71717A',
  accent: '#2563EB',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
} as const

/** @deprecated Use `colorsDark` or `colorsLight` */
export const colors = colorsDark

export const typography = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
  pageTitle: {
    size: 'clamp(1.375rem, 5vw + 0.75rem, 3rem)',
    lineHeight: 1.2,
    weight: 700,
  },
  blockTitle: {
    size: '1.25rem',
    lineHeight: 1.4,
    weight: 600,
  },
  tableData: {
    size: 'clamp(0.875rem, 0.25vw + 0.84rem, 0.9375rem)',
    lineHeight: 1.5,
  },
  status: {
    size: '0.875rem',
    lineHeight: 1.4,
  },
} as const

/** @deprecated Use `colorsDark` instead */
export const tokens = colorsDark

export type ColorTokenName = keyof typeof colorsDark
export type TypographyTokenName = keyof typeof typography
