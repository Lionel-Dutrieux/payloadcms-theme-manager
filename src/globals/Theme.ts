import { GlobalConfig, Field, TabsField } from 'payload'
import { invalidateThemeCache } from '../lib/ThemeManager'
import {
  generateLightModeColorFields,
  generateDarkModeColorFields,
  generateSizeFields,
  ThemeSizeKey,
  DARK_MODE_ENABLED,
} from '../constants/themeConstants'

// Define the theme colors structure that matches our payload-types.ts
export type ThemeColors = Record<string, string | null>

// Define the theme sizes structure
export type ThemeSizes = {
  [K in ThemeSizeKey]?: string | null
}

// Create the color tabs field
const colorTabsField: TabsField = {
  type: 'tabs',
  tabs: [
    {
      label: {
        en: 'Light Mode',
        fr: 'Mode Clair',
        nl: 'Lichte Modus',
      },
      fields: generateLightModeColorFields(),
    },
    {
      label: {
        en: 'Dark Mode',
        fr: 'Mode Sombre',
        nl: 'Donkere Modus',
      },
      fields: generateDarkModeColorFields(),
    },
  ],
}

// Define the fields with proper typing
const themeFields: Field[] = [
  {
    type: 'group',
    name: 'settings',
    label: {
      en: 'Settings',
      fr: 'Paramètres',
      nl: 'Instellingen',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        label: {
          en: 'Enable Theme',
          fr: 'Activer le Thème',
          nl: 'Thema Inschakelen',
        },
        defaultValue: false,
      },
    ],
  },
]

// Add colors group with tabs for light/dark mode if dark mode is enabled
themeFields.push({
  name: 'colors',
  type: 'group',
  label: {
    en: 'Colors',
    fr: 'Couleurs',
    nl: 'Kleuren',
  },
  admin: {
    description: DARK_MODE_ENABLED
      ? {
          en: 'Configure colors for both light and dark modes',
          fr: 'Configurer les couleurs pour les modes clair et sombre',
          nl: 'Configureer kleuren voor zowel lichte als donkere modi',
        }
      : {
          en: 'Configure theme colors',
          fr: 'Configurer les couleurs du thème',
          nl: 'Configureer themakleuren',
        },
  },
  fields: DARK_MODE_ENABLED ? [colorTabsField] : generateLightModeColorFields(),
})

// Add sizes group
themeFields.push({
  name: 'sizes',
  type: 'group',
  label: {
    en: 'Sizes',
    fr: 'Tailles',
    nl: 'Maten',
  },
  fields: generateSizeFields(),
})

export const Theme: GlobalConfig = {
  slug: 'theme',
  dbName: 'theme',
  // TODO Add access control
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      // Invalidate theme cache after any changes
      async () => {
        invalidateThemeCache()
      },
    ],
  },
  fields: themeFields,
}
