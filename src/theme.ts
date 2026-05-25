export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'scroll-theme'

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function persistTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function initTheme() {
  applyTheme(resolveTheme())
}
