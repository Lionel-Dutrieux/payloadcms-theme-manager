import { Field } from 'payload'

// Theme mode configuration
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES]

// Configure if dark mode should be available in this project
export const DARK_MODE_ENABLED = true

// Define complete theme configuration in one place
export const themeConfig = {
  colors: {
    background: {
      key: '--background',
      label: {
        en: 'Background Color',
        fr: 'Couleur de Fond',
        nl: 'Achtergrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    foreground: {
      key: '--foreground',
      label: {
        en: 'Foreground Color',
        fr: 'Couleur de Premier Plan',
        nl: 'Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    card: {
      key: '--card',
      label: {
        en: 'Card Color',
        fr: 'Couleur de Carte',
        nl: 'Kaart Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    cardForeground: {
      key: '--card-foreground',
      label: {
        en: 'Card Foreground Color',
        fr: 'Couleur de Premier Plan de Carte',
        nl: 'Kaart Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    popover: {
      key: '--popover',
      label: {
        en: 'Popover Color',
        fr: 'Couleur de Popover',
        nl: 'Popover Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    popoverForeground: {
      key: '--popover-foreground',
      label: {
        en: 'Popover Foreground Color',
        fr: 'Couleur de Premier Plan de Popover',
        nl: 'Popover Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    primary: {
      key: '--primary',
      label: {
        en: 'Primary Color',
        fr: 'Couleur Primaire',
        nl: 'Primaire Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    primaryForeground: {
      key: '--primary-foreground',
      label: {
        en: 'Primary Foreground Color',
        fr: 'Couleur de Premier Plan Primaire',
        nl: 'Primaire Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    secondary: {
      key: '--secondary',
      label: {
        en: 'Secondary Color',
        fr: 'Couleur Secondaire',
        nl: 'Secundaire Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    secondaryForeground: {
      key: '--secondary-foreground',
      label: {
        en: 'Secondary Foreground Color',
        fr: 'Couleur de Premier Plan Secondaire',
        nl: 'Secundaire Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    muted: {
      key: '--muted',
      label: {
        en: 'Muted Color',
        fr: 'Couleur Atténuée',
        nl: 'Gedempte Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    mutedForeground: {
      key: '--muted-foreground',
      label: {
        en: 'Muted Foreground Color',
        fr: 'Couleur de Premier Plan Atténuée',
        nl: 'Gedempte Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    accent: {
      key: '--accent',
      label: {
        en: 'Accent Color',
        fr: "Couleur d'Accent",
        nl: 'Accent Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    accentForeground: {
      key: '--accent-foreground',
      label: {
        en: 'Accent Foreground Color',
        fr: "Couleur de Premier Plan d'Accent",
        nl: 'Accent Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    destructive: {
      key: '--destructive',
      label: {
        en: 'Destructive Color',
        fr: 'Couleur Destructive',
        nl: 'Destructieve Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    border: {
      key: '--border',
      label: {
        en: 'Border Color',
        fr: 'Couleur de Bordure',
        nl: 'Rand Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    input: {
      key: '--input',
      label: {
        en: 'Input Color',
        fr: "Couleur d'Entrée",
        nl: 'Input Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    ring: {
      key: '--ring',
      label: {
        en: 'Ring Color',
        fr: "Couleur d'Anneau",
        nl: 'Ring Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    chart1: {
      key: '--chart-1',
      label: {
        en: 'Chart Color 1',
        fr: 'Couleur de Graphique 1',
        nl: 'Grafiek Kleur 1',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    chart2: {
      key: '--chart-2',
      label: {
        en: 'Chart Color 2',
        fr: 'Couleur de Graphique 2',
        nl: 'Grafiek Kleur 2',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    chart3: {
      key: '--chart-3',
      label: {
        en: 'Chart Color 3',
        fr: 'Couleur de Graphique 3',
        nl: 'Grafiek Kleur 3',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    chart4: {
      key: '--chart-4',
      label: {
        en: 'Chart Color 4',
        fr: 'Couleur de Graphique 4',
        nl: 'Grafiek Kleur 4',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    chart5: {
      key: '--chart-5',
      label: {
        en: 'Chart Color 5',
        fr: 'Couleur de Graphique 5',
        nl: 'Grafiek Kleur 5',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebar: {
      key: '--sidebar',
      label: {
        en: 'Sidebar Color',
        fr: 'Couleur de la Barre Latérale',
        nl: 'Zijbalk Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarForeground: {
      key: '--sidebar-foreground',
      label: {
        en: 'Sidebar Foreground Color',
        fr: 'Couleur de Premier Plan de la Barre Latérale',
        nl: 'Zijbalk Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarPrimary: {
      key: '--sidebar-primary',
      label: {
        en: 'Sidebar Primary Color',
        fr: 'Couleur Primaire de la Barre Latérale',
        nl: 'Zijbalk Primaire Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarPrimaryForeground: {
      key: '--sidebar-primary-foreground',
      label: {
        en: 'Sidebar Primary Foreground Color',
        fr: 'Couleur de Premier Plan Primaire de la Barre Latérale',
        nl: 'Zijbalk Primaire Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarAccent: {
      key: '--sidebar-accent',
      label: {
        en: 'Sidebar Accent Color',
        fr: "Couleur d'Accent de la Barre Latérale",
        nl: 'Zijbalk Accent Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarAccentForeground: {
      key: '--sidebar-accent-foreground',
      label: {
        en: 'Sidebar Accent Foreground Color',
        fr: "Couleur de Premier Plan d'Accent de la Barre Latérale",
        nl: 'Zijbalk Accent Voorgrond Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarBorder: {
      key: '--sidebar-border',
      label: {
        en: 'Sidebar Border Color',
        fr: 'Couleur de Bordure de la Barre Latérale',
        nl: 'Zijbalk Rand Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
    sidebarRing: {
      key: '--sidebar-ring',
      label: {
        en: 'Sidebar Ring Color',
        fr: "Couleur d'Anneau de la Barre Latérale",
        nl: 'Zijbalk Ring Kleur',
      },
      defaultValue: {
        [THEME_MODES.LIGHT]: '',
        [THEME_MODES.DARK]: '',
      },
    },
  },
  sizes: {
    radius: {
      key: '--radius',
      label: {
        en: 'Border Radius',
        fr: 'Rayon de Bordure',
        nl: 'Randradius',
      },
      defaultValue: '',
    },
  },
} as const

// Extract CSS variable keys for each theme property
export const cssKeys = Object.fromEntries(
  Object.entries(themeConfig.colors).map(([name, config]) => [name, config.key]),
) as Record<keyof typeof themeConfig.colors, string>

// Extract CSS variable keys for each size property
export const sizeCssKeys = Object.fromEntries(
  Object.entries(themeConfig.sizes).map(([name, config]) => [name, config.key]),
) as Record<keyof typeof themeConfig.sizes, string>

// Define the color field names
export type ThemeColorKey = keyof typeof themeConfig.colors

// Define the size field names
export type ThemeSizeKey = keyof typeof themeConfig.sizes

// Helper function to validate hex color codes
const validateHexColor = (value: string | null | undefined): true | string => {
  if (!value) return true
  // Basic hex color validation
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
    return `Please enter a valid hex color code (e.g. #FF00DD)`
  }
  return true
}

// Helper function to validate size values
const validateSize = (value: string | null | undefined): true | string => {
  if (!value) return true
  // Allow px, rem, em, vh, vw, % or unitless values
  if (!/^(\d*\.?\d+)(px|rem|em|vh|vw|%)?$/.test(value)) {
    return `Please enter a valid size (e.g. 0.625rem, 10px, 50%)`
  }
  return true
}

/**
 * Create a color field with proper typing for PayloadCMS
 * This creates fields for a specific color and mode
 *
 * @param name - The name of the color field (must be a key from cssKeys)
 * @param mode - The theme mode (light or dark)
 * @returns A properly typed PayloadCMS field configuration
 */
export const createColorField = (name: ThemeColorKey, mode: ThemeMode): Field => {
  const { label, defaultValue } = themeConfig.colors[name]

  // Handle both string and object defaultValues for backward compatibility
  const colorDefaultValue = typeof defaultValue === 'string' ? defaultValue : defaultValue[mode]

  // Use prefixed field names to avoid conflicts (lightPrimary, darkPrimary)
  const fieldName =
    mode === THEME_MODES.LIGHT
      ? `light${name.charAt(0).toUpperCase()}${name.slice(1)}`
      : `dark${name.charAt(0).toUpperCase()}${name.slice(1)}`

  return {
    name: fieldName,
    type: 'text',
    label: {
      en: label.en,
      fr: label.fr,
      nl: label.nl,
    },
    defaultValue: colorDefaultValue,
    validate: validateHexColor,
    admin: {
      placeholder: colorDefaultValue,
      description: {
        en: `${mode} hex color (e.g. #FF5500)`,
        fr: `Couleur hex ${mode === THEME_MODES.LIGHT ? 'claire' : 'sombre'} (ex. #FF5500)`,
        nl: `${mode === THEME_MODES.LIGHT ? 'Lichte' : 'Donkere'} hex kleur (bijv. #FF5500)`,
      },
      width: '50%',
      components: {
        Field: '@/fields/ColorSelector#ColorSelector',
      },
    },
  }
}

/**
 * Create a size field with proper typing for PayloadCMS
 *
 * @param name - The name of the size field (must be a key from sizeCssKeys)
 * @returns A properly typed PayloadCMS field configuration
 */
export const createSizeField = (name: ThemeSizeKey): Field => {
  const { label, defaultValue } = themeConfig.sizes[name]

  return {
    name,
    type: 'text',
    label: {
      en: label.en,
      fr: label.fr,
      nl: label.nl,
    },
    defaultValue,
    validate: validateSize,
    admin: {
      placeholder: defaultValue,
      description: {
        en: 'Enter a valid size (e.g. 0.625rem, 10px, 2em)',
        fr: 'Entrez une taille valide (ex. 0.625rem, 10px, 2em)',
        nl: 'Voer een geldige grootte in (bijv. 0.625rem, 10px, 2em)',
      },
      width: '50%',
    },
  }
}

/**
 * Generate all light mode color fields for the theme configuration
 */
export const generateLightModeColorFields = (): Field[] => {
  return Object.keys(themeConfig.colors).map((key) =>
    createColorField(key as ThemeColorKey, THEME_MODES.LIGHT),
  )
}

/**
 * Generate all dark mode color fields for the theme configuration
 */
export const generateDarkModeColorFields = (): Field[] => {
  return Object.keys(themeConfig.colors).map((key) =>
    createColorField(key as ThemeColorKey, THEME_MODES.DARK),
  )
}

/**
 * Generate all size fields for the theme configuration
 */
export const generateSizeFields = (): Field[] => {
  return Object.keys(themeConfig.sizes).map((key) => createSizeField(key as ThemeSizeKey))
}

/**
 * Gets the CSS variable name for a given color in a specific mode
 * With the .dark class approach, we use the same variable names for both modes
 */
export const getColorVariableName = (colorKey: ThemeColorKey, mode: ThemeMode): string => {
  // Always return the same variable name (no -dark suffix)
  // as we use .dark class selector instead
  return cssKeys[colorKey]
}
