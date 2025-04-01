import { GlobalConfig, Field, TabsField } from 'payload'
import { invalidateThemeCache } from '../lib/ThemeManager'
import {
  generateLightModeColorFields,
  generateDarkModeColorFields,
  generateSizeFields,
  ThemeSizeKey,
  DARK_MODE_ENABLED,
} from '../constants/themeConstants'
import { themePresets } from '../constants/themePresets'

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
      {
        name: 'usePreset',
        type: 'select',
        label: {
          en: 'Use Theme Preset',
          fr: 'Utiliser un Thème Prédéfini',
          nl: 'Gebruik Thema Voorinstelling',
        },
        options: [
          {
            label: {
              en: 'Custom Theme',
              fr: 'Thème Personnalisé',
              nl: 'Aangepast Thema',
            },
            value: 'custom',
          },
          ...themePresets.map((preset) => ({
            label: preset.name,
            value: preset.id,
          })),
        ],
        defaultValue: 'custom',
        admin: {
          description: {
            en: 'Select a predefined theme or create a custom one',
            fr: 'Sélectionnez un thème prédéfini ou créez-en un personnalisé',
            nl: 'Selecteer een voorgedefinieerd thema of maak een aangepast thema',
          },
        },
      },
    ],
  },
]

// Add colors group with tabs for light/dark mode if dark mode is enabled
// Only show if usePreset is set to 'custom'
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
    condition: (data, siblingData) => {
      return siblingData?.settings?.usePreset === 'custom'
    },
  },
  fields: DARK_MODE_ENABLED ? [colorTabsField] : generateLightModeColorFields(),
})

// Add sizes group
// Only show if usePreset is set to 'custom'
themeFields.push({
  name: 'sizes',
  type: 'group',
  label: {
    en: 'Sizes',
    fr: 'Tailles',
    nl: 'Maten',
  },
  admin: {
    condition: (data, siblingData) => {
      return siblingData?.settings?.usePreset === 'custom'
    },
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
  admin: {
    livePreview: {
      url: '/',
    },
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
