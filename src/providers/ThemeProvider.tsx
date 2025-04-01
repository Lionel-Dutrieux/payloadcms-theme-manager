'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Safe localStorage access
const getStoredTheme = (key: string, fallback: Theme): Theme => {
  if (typeof window === 'undefined') return fallback
  try {
    const theme = window.localStorage.getItem(key) as Theme
    return theme || fallback
  } catch (e) {
    // Handle localStorage access errors
    console.warn('Failed to access localStorage:', e)
    return fallback
  }
}

const storeTheme = (key: string, theme: Theme): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, theme)
  } catch (e) {
    console.warn('Failed to store theme:', e)
  }
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme-preference',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme(storageKey, defaultTheme))
  const [mounted, setMounted] = useState(false)

  // Only run after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      storeTheme(storageKey, theme)
      setTheme(theme)
    },
  }

  // Prevent flash of incorrect theme
  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
} 