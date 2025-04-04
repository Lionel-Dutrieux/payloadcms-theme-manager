import { Field } from 'payload'
import { validateHexColor } from '../utils/colors'

// Theme modes
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES]

// Enable/disable dark mode
export const DARK_MODE_ENABLED = true

// Theme color keys
export type ThemeColorKey =
  | 'primary'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground'
  | 'destructive'
  | 'destructiveForeground'
  | 'border'
  | 'input'
  | 'ring'
  | 'background'
  | 'foreground'
  | 'card'
  | 'cardForeground'
  | 'popover'
  | 'popoverForeground'
  | 'chart1'
  | 'chart2'
  | 'chart3'
  | 'chart4'
  | 'chart5'
  | 'sidebar'
  | 'sidebarForeground'
  | 'sidebarPrimary'
  | 'sidebarPrimaryForeground'
  | 'sidebarAccent'
  | 'sidebarAccentForeground'
  | 'sidebarBorder'

// Theme size keys
export type ThemeSizeKey = 'radius'

// Theme configuration
export const themeConfig = {
  colors: {
    primary: {
      key: '--primary',
      label: {
        en: 'Primary Color',
        fr: 'Couleur Primaire',
        nl: 'Primaire Kleur',
      },
    },
    primaryForeground: {
      key: '--primary-foreground',
      label: {
        en: 'Primary Foreground',
        fr: 'Premier Plan Primaire',
        nl: 'Primaire Voorgrond',
      },
    },
    secondary: {
      key: '--secondary',
      label: {
        en: 'Secondary Color',
        fr: 'Couleur Secondaire',
        nl: 'Secundaire Kleur',
      },
    },
    secondaryForeground: {
      key: '--secondary-foreground',
      label: {
        en: 'Secondary Foreground',
        fr: 'Premier Plan Secondaire',
        nl: 'Secundaire Voorgrond',
      },
    },
    muted: {
      key: '--muted',
      label: {
        en: 'Muted Color',
        fr: 'Couleur Atténuée',
        nl: 'Gedempte Kleur',
      },
    },
    mutedForeground: {
      key: '--muted-foreground',
      label: {
        en: 'Muted Foreground',
        fr: 'Premier Plan Atténué',
        nl: 'Gedempte Voorgrond',
      },
    },
    accent: {
      key: '--accent',
      label: {
        en: 'Accent Color',
        fr: "Couleur d'Accent",
        nl: 'Accent Kleur',
      },
    },
    accentForeground: {
      key: '--accent-foreground',
      label: {
        en: 'Accent Foreground',
        fr: "Premier Plan d'Accent",
        nl: 'Accent Voorgrond',
      },
    },
    destructive: {
      key: '--destructive',
      label: {
        en: 'Destructive Color',
        fr: 'Couleur Destructive',
        nl: 'Destructieve Kleur',
      },
    },
    destructiveForeground: {
      key: '--destructive-foreground',
      label: {
        en: 'Destructive Foreground',
        fr: 'Premier Plan Destructif',
        nl: 'Destructieve Voorgrond',
      },
    },
    border: {
      key: '--border',
      label: {
        en: 'Border Color',
        fr: 'Couleur de Bordure',
        nl: 'Rand Kleur',
      },
    },
    input: {
      key: '--input',
      label: {
        en: 'Input Color',
        fr: 'Couleur de Saisie',
        nl: 'Invoer Kleur',
      },
    },
    ring: {
      key: '--ring',
      label: {
        en: 'Ring Color',
        fr: "Couleur d'Anneau",
        nl: 'Ring Kleur',
      },
    },
    background: {
      key: '--background',
      label: {
        en: 'Background Color',
        fr: 'Couleur de Fond',
        nl: 'Achtergrond Kleur',
      },
    },
    foreground: {
      key: '--foreground',
      label: {
        en: 'Foreground Color',
        fr: 'Couleur de Premier Plan',
        nl: 'Voorgrond Kleur',
      },
    },
    card: {
      key: '--card',
      label: {
        en: 'Card Color',
        fr: 'Couleur de Carte',
        nl: 'Kaart Kleur',
      },
    },
    cardForeground: {
      key: '--card-foreground',
      label: {
        en: 'Card Foreground',
        fr: 'Premier Plan de Carte',
        nl: 'Kaart Voorgrond',
      },
    },
    popover: {
      key: '--popover',
      label: {
        en: 'Popover Color',
        fr: 'Couleur de Popover',
        nl: 'Popover Kleur',
      },
    },
    popoverForeground: {
      key: '--popover-foreground',
      label: {
        en: 'Popover Foreground',
        fr: 'Premier Plan de Popover',
        nl: 'Popover Voorgrond',
      },
    },
    chart1: {
      key: '--chart-1',
      label: {
        en: 'Chart Color 1',
        fr: 'Couleur de Graphique 1',
        nl: 'Grafiek Kleur 1',
      },
    },
    chart2: {
      key: '--chart-2',
      label: {
        en: 'Chart Color 2',
        fr: 'Couleur de Graphique 2',
        nl: 'Grafiek Kleur 2',
      },
    },
    chart3: {
      key: '--chart-3',
      label: {
        en: 'Chart Color 3',
        fr: 'Couleur de Graphique 3',
        nl: 'Grafiek Kleur 3',
      },
    },
    chart4: {
      key: '--chart-4',
      label: {
        en: 'Chart Color 4',
        fr: 'Couleur de Graphique 4',
        nl: 'Grafiek Kleur 4',
      },
    },
    chart5: {
      key: '--chart-5',
      label: {
        en: 'Chart Color 5',
        fr: 'Couleur de Graphique 5',
        nl: 'Grafiek Kleur 5',
      },
    },
    sidebar: {
      key: '--sidebar',
      label: {
        en: 'Sidebar Color',
        fr: 'Couleur de la Barre Latérale',
        nl: 'Zijbalk Kleur',
      },
    },
    sidebarForeground: {
      key: '--sidebar-foreground',
      label: {
        en: 'Sidebar Foreground',
        fr: 'Premier Plan de la Barre Latérale',
        nl: 'Zijbalk Voorgrond',
      },
    },
    sidebarPrimary: {
      key: '--sidebar-primary',
      label: {
        en: 'Sidebar Primary',
        fr: 'Primaire de la Barre Latérale',
        nl: 'Zijbalk Primair',
      },
    },
    sidebarPrimaryForeground: {
      key: '--sidebar-primary-foreground',
      label: {
        en: 'Sidebar Primary Foreground',
        fr: 'Premier Plan Primaire de la Barre Latérale',
        nl: 'Zijbalk Primaire Voorgrond',
      },
    },
    sidebarAccent: {
      key: '--sidebar-accent',
      label: {
        en: 'Sidebar Accent',
        fr: 'Accent de la Barre Latérale',
        nl: 'Zijbalk Accent',
      },
    },
    sidebarAccentForeground: {
      key: '--sidebar-accent-foreground',
      label: {
        en: 'Sidebar Accent Foreground',
        fr: "Premier Plan d'Accent de la Barre Latérale",
        nl: 'Zijbalk Accent Voorgrond',
      },
    },
    sidebarBorder: {
      key: '--sidebar-border',
      label: {
        en: 'Sidebar Border',
        fr: 'Bordure de la Barre Latérale',
        nl: 'Zijbalk Rand',
      },
    },
  },
  sizes: {
    radius: {
      key: '--radius',
      label: {
        en: 'Border Radius',
        fr: 'Rayon de Bordure',
        nl: 'Rand Radius',
      },
    },
  },
}

// Extract CSS variable keys
export const cssKeys = Object.fromEntries(
  Object.entries(themeConfig.colors).map(([name, config]) => [name, config.key]),
) as Record<ThemeColorKey, string>

export const sizeCssKeys = Object.fromEntries(
  Object.entries(themeConfig.sizes).map(([name, config]) => [name, config.key]),
) as Record<ThemeSizeKey, string>

// Cache configuration
export const THEME_CACHE_TAG = 'theme-data'
export const CACHE_TIME_SECONDS = 60 * 60 * 24 * 7 // 7 days

/**
 * Create a color field for the theme configuration
 */
function createColorField(key: ThemeColorKey, mode: ThemeMode): Field {
  const fieldName = `${mode}${key.charAt(0).toUpperCase()}${key.slice(1)}`
  const config = themeConfig.colors[key]

  return {
    name: fieldName,
    type: 'text',
    label: config.label,
    validate: validateHexColor,
    admin: {
      components: {
        Field: '@/fields/ColorSelector#ColorSelector',
      },
    },
  }
}

/**
 * Create a size field for the theme configuration
 */
function createSizeField(key: ThemeSizeKey): Field {
  const config = themeConfig.sizes[key]

  return {
    name: key,
    type: 'text',
    label: config.label,
  }
}

/**
 * Generate all light mode color fields for the theme configuration
 */
export function generateLightModeColorFields(): Field[] {
  return Object.keys(themeConfig.colors).map((key) =>
    createColorField(key as ThemeColorKey, THEME_MODES.LIGHT),
  )
}

/**
 * Generate all dark mode color fields for the theme configuration
 */
export function generateDarkModeColorFields(): Field[] {
  return Object.keys(themeConfig.colors).map((key) =>
    createColorField(key as ThemeColorKey, THEME_MODES.DARK),
  )
}

/**
 * Generate all size fields for the theme configuration
 */
export function generateSizeFields(): Field[] {
  return Object.keys(themeConfig.sizes).map((key) => createSizeField(key as ThemeSizeKey))
}
