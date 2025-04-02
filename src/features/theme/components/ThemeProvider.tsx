'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { THEME_MODES, ThemeMode } from '../config/constants'

interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultTheme?: ThemeMode
  storageKey?: string
}

interface ThemeProviderState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

const initialState: ThemeProviderState = {
  theme: THEME_MODES.LIGHT,
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Safe localStorage access
const getStoredTheme = (key: string, fallback: ThemeMode): ThemeMode => {
  if (typeof window === 'undefined') return fallback
  try {
    const theme = window.localStorage.getItem(key) as ThemeMode
    return theme || fallback
  } catch (e) {
    // Handle localStorage access errors
    console.warn('[Theme] Failed to access localStorage:', e)
    return fallback
  }
}

const storeTheme = (key: string, theme: ThemeMode): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, theme)
  } catch (e) {
    console.warn('[Theme] Failed to store theme:', e)
  }
}

export function ThemeProvider({
  children,
  defaultTheme = THEME_MODES.LIGHT,
  storageKey = 'theme-preference',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme(storageKey, defaultTheme))
  const [mounted, setMounted] = useState(false)

  // Only run after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(THEME_MODES.LIGHT, THEME_MODES.DARK)
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: ThemeMode) => {
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

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
