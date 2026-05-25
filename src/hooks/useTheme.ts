import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
  persistTheme,
  resolveTheme,
  type Theme,
} from '../theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    applyTheme(next)
    persistTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
