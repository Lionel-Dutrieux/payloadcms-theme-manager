import { ThemeColors, ThemeSizes } from '../models/types'

export interface ThemePreset {
  id: string
  name: {
    en: string
    fr: string
    nl: string
  }
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  sizes: ThemeSizes
}

export type PresetValue = 'custom' | 'bardahl' | 'luxinnovation' | 'computerland'

// Example preset
const defaultPreset: ThemePreset = {
  id: 'bardahl',
  name: {
    en: 'Bardahl Theme',
    fr: 'Thème Bardahl',
    nl: 'Bardahl Thema',
  },
  colors: {
    light: {
      background: '#FFFFFF',
      foreground: '#202020',
      card: '#FFFFFF',
      cardForeground: '#202020',
      popover: '#FFFFFF',
      popoverForeground: '#202020',
      primary: '#FFD100',
      primaryForeground: '#202020',
      secondary: '#202020',
      secondaryForeground: '#FFFFFF',
      muted: '#F4F4F4',
      mutedForeground: '#666666',
      accent: '#FFE766',
      accentForeground: '#202020',
      destructive: '#FF4444',
      destructiveForeground: '#FFFFFF',
      border: '#E5E5E5',
      input: '#E5E5E5',
      ring: '#FFD100',
      chart1: '#FFD100',
      chart2: '#FF6B6B',
      chart3: '#4ECDC4',
      chart4: '#45B7D1',
      chart5: '#96CEB4',
      sidebar: '#202020',
      sidebarForeground: '#FFFFFF',
      sidebarPrimary: '#FFD100',
      sidebarPrimaryForeground: '#202020',
      sidebarAccent: '#FFE766',
      sidebarAccentForeground: '#202020',
      sidebarBorder: '#333333',
    },
    dark: {
      background: '#202020',
      foreground: '#FFFFFF',
      card: '#2A2A2A',
      cardForeground: '#FFFFFF',
      popover: '#2A2A2A',
      popoverForeground: '#FFFFFF',
      primary: '#FFD100',
      primaryForeground: '#202020',
      secondary: '#333333',
      secondaryForeground: '#FFFFFF',
      muted: '#333333',
      mutedForeground: '#999999',
      accent: '#FFE766',
      accentForeground: '#202020',
      destructive: '#FF4444',
      destructiveForeground: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(255, 255, 255, 0.1)',
      ring: '#FFD100',
      chart1: '#FFD100',
      chart2: '#FF6B6B',
      chart3: '#4ECDC4',
      chart4: '#45B7D1',
      chart5: '#96CEB4',
      sidebar: '#2A2A2A',
      sidebarForeground: '#FFFFFF',
      sidebarPrimary: '#FFD100',
      sidebarPrimaryForeground: '#202020',
      sidebarAccent: '#FFE766',
      sidebarAccentForeground: '#202020',
      sidebarBorder: 'rgba(255, 255, 255, 0.1)',
    },
  },
  sizes: {
    radius: '0.5rem',
    radiusLg: '0.75rem',
    radiusSm: '0.25rem',
  },
}

const luxinnovationPreset: ThemePreset = {
  id: 'luxinnovation',
  name: {
    en: 'Luxinnovation Theme',
    fr: 'Thème Luxinnovation',
    nl: 'Luxinnovation Thema',
  },
  colors: {
    light: {
      background: '#FFFFFF',
      foreground: '#1D214E',
      card: '#FFFFFF',
      cardForeground: '#1D214E',
      popover: '#FFFFFF',
      popoverForeground: '#1D214E',
      primary: '#0099FF',
      primaryForeground: '#FFFFFF',
      secondary: '#1D214E',
      secondaryForeground: '#FFFFFF',
      muted: '#F0F7FF',
      mutedForeground: '#4A4D6E',
      accent: '#66C2FF',
      accentForeground: '#1D214E',
      destructive: '#FF4444',
      destructiveForeground: '#FFFFFF',
      border: '#E6F3FF',
      input: '#E6F3FF',
      ring: '#0099FF',
      chart1: '#0099FF',
      chart2: '#FF6B6B',
      chart3: '#4ECDC4',
      chart4: '#FFD93D',
      chart5: '#95D5B2',
      sidebar: '#1D214E',
      sidebarForeground: '#FFFFFF',
      sidebarPrimary: '#0099FF',
      sidebarPrimaryForeground: '#FFFFFF',
      sidebarAccent: '#66C2FF',
      sidebarAccentForeground: '#1D214E',
      sidebarBorder: '#2A2F66',
    },
    dark: {
      background: '#1D214E',
      foreground: '#FFFFFF',
      card: '#2A2F66',
      cardForeground: '#FFFFFF',
      popover: '#2A2F66',
      popoverForeground: '#FFFFFF',
      primary: '#0099FF',
      primaryForeground: '#FFFFFF',
      secondary: '#E6F3FF',
      secondaryForeground: '#1D214E',
      muted: '#353B7A',
      mutedForeground: '#99D6FF',
      accent: '#66C2FF',
      accentForeground: '#1D214E',
      destructive: '#FF4444',
      destructiveForeground: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(255, 255, 255, 0.1)',
      ring: '#0099FF',
      chart1: '#0099FF',
      chart2: '#FF6B6B',
      chart3: '#4ECDC4',
      chart4: '#FFD93D',
      chart5: '#95D5B2',
      sidebar: '#2A2F66',
      sidebarForeground: '#FFFFFF',
      sidebarPrimary: '#0099FF',
      sidebarPrimaryForeground: '#FFFFFF',
      sidebarAccent: '#66C2FF',
      sidebarAccentForeground: '#1D214E',
      sidebarBorder: 'rgba(255, 255, 255, 0.1)',
    },
  },
  sizes: {
    radius: '0.5rem',
    radiusLg: '0.75rem',
    radiusSm: '0.25rem',
  },
}

const computerlandPreset: ThemePreset = {
  id: 'computerland',
  name: {
    en: 'Computerland Theme',
    fr: 'Thème Computerland',
    nl: 'Computerland Thema',
  },
  colors: {
    light: {
      background: '#FFFFFF',
      foreground: '#2F2F2F',
      card: '#FFFFFF',
      cardForeground: '#2F2F2F',
      popover: '#FFFFFF',
      popoverForeground: '#2F2F2F',
      primary: '#007CC2',
      primaryForeground: '#FFFFFF',
      secondary: '#2F2F2F',
      secondaryForeground: '#FFFFFF',
      muted: '#F8FAFC',
      mutedForeground: '#64748B',
      accent: '#E6F4FB',
      accentForeground: '#007CC2',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      border: '#E2E8F0',
      input: '#F1F5F9',
      ring: '#007CC2',
      chart1: '#007CC2',
      chart2: '#FF6B6B',
      chart3: '#06D6A0',
      chart4: '#FFD93D',
      chart5: '#9B5DE5',
      sidebar: '#2F2F2F',
      sidebarForeground: '#FFFFFF',
      sidebarPrimary: '#007CC2',
      sidebarPrimaryForeground: '#FFFFFF',
      sidebarAccent: '#E6F4FB',
      sidebarAccentForeground: '#007CC2',
      sidebarBorder: '#404040',
    },
    dark: {
      background: '#2F2F2F',
      foreground: '#FFFFFF',
      card: '#404040',
      cardForeground: '#FFFFFF',
      popover: '#404040',
      popoverForeground: '#FFFFFF',
      primary: '#007CC2',
      primaryForeground: '#FFFFFF',
      secondary: '#F8FAFC',
      secondaryForeground: '#2F2F2F',
      muted: '#404040',
      mutedForeground: '#94A3B8',
      accent: '#0EA5E9',
      accentForeground: '#FFFFFF',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(255, 255, 255, 0.05)',
      ring: '#007CC2',
      chart1: '#007CC2',
      chart2: '#FF6B6B',
      chart3: '#06D6A0',
      chart4: '#FFD93D',
      chart5: '#9B5DE5',
      sidebar: '#404040',
      sidebarForeground: '#FFFFFF',
      sidebarPrimary: '#007CC2',
      sidebarPrimaryForeground: '#FFFFFF',
      sidebarAccent: '#0EA5E9',
      sidebarAccentForeground: '#FFFFFF',
      sidebarBorder: 'rgba(255, 255, 255, 0.1)',
    },
  },
  sizes: {
    radius: '0.375rem',
    radiusLg: '0.5rem',
    radiusSm: '0.25rem',
  },
}

export const themePresets: ThemePreset[] = [defaultPreset, luxinnovationPreset, computerlandPreset]

export const getPresetById = (id: string): ThemePreset | undefined => {
  return themePresets.find((preset) => preset.id === id)
}
