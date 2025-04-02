import {
  cssKeys,
  DARK_MODE_ENABLED,
  sizeCssKeys,
  ThemeColorKey,
  ThemeSizeKey,
} from '../config/constants'
import { getPresetById } from '../config/presets'
import { ColorFormat, ExtendedTheme, ThemeColors } from '../models/types'
import { parseColorValue } from './colors'

/**
 * Convert theme colors to CSS variables with specified format
 */
function generateColorVariables(colors: ThemeColors, format: ColorFormat = 'hex'): string[] {
  return Object.entries(colors)
    .map(([key, value]) => {
      if (!value) return ''
      const colorData = parseColorValue(value)
      if (colorData) {
        return `${cssKeys[key as ThemeColorKey]}: ${colorData[format] || colorData.hex};`
      }
      // If parsing fails, use the original value (legacy support)
      return `${cssKeys[key as ThemeColorKey]}: ${value};`
    })
    .filter(Boolean)
}

/**
 * Generate CSS variables from theme object
 */
export function generateThemeCSS(theme: ExtendedTheme | null, format: ColorFormat = 'hex'): string {
  // Return empty string if theme is null or disabled
  if (!theme || !theme.settings?.enabled) {
    console.log('[Theme] Theme is null or disabled:', { theme })
    return ''
  }

  // Get colors and sizes from preset if usePreset is not 'custom'
  let { colors, sizes } = theme
  if (theme.settings?.usePreset && theme.settings.usePreset !== 'custom') {
    const preset = getPresetById(theme.settings.usePreset)
    if (preset) {
      colors = DARK_MODE_ENABLED
        ? {
            ...Object.entries(preset.colors.light).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [`light${key.charAt(0).toUpperCase()}${key.slice(1)}`]: value,
              }),
              {},
            ),
            ...Object.entries(preset.colors.dark).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [`dark${key.charAt(0).toUpperCase()}${key.slice(1)}`]: value,
              }),
              {},
            ),
          }
        : Object.entries(preset.colors.light).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [`light${key.charAt(0).toUpperCase()}${key.slice(1)}`]: value,
            }),
            {},
          )
      sizes = preset.sizes
    }
  }

  console.log('[Theme] Processing theme:', { colors, sizes })

  const lightVars: string[] = []
  const darkVars: string[] = []

  // Process each color dynamically using the keys from cssKeys
  Object.keys(cssKeys).forEach((colorName) => {
    const key = colorName as ThemeColorKey

    // Get field names based on our naming convention (lightPrimary, darkPrimary)
    const lightFieldName = `light${key.charAt(0).toUpperCase()}${key.slice(1)}`
    const darkFieldName = `dark${key.charAt(0).toUpperCase()}${key.slice(1)}`

    // Get the values using these field names
    const lightValue = colors?.[lightFieldName as keyof typeof colors]

    if (lightValue) {
      const colorData = parseColorValue(lightValue as string)
      if (colorData) {
        lightVars.push(`${cssKeys[key]}: ${colorData[format] || colorData.hex};`)
      } else {
        // Fallback to original value if parsing fails
        lightVars.push(`${cssKeys[key]}: ${lightValue};`)
      }
    }

    // Process dark mode values if dark mode is enabled
    if (DARK_MODE_ENABLED) {
      const darkValue = colors?.[darkFieldName as keyof typeof colors]

      if (darkValue) {
        const colorData = parseColorValue(darkValue as string)
        if (colorData) {
          darkVars.push(`${cssKeys[key]}: ${colorData[format] || colorData.hex};`)
        } else {
          darkVars.push(`${cssKeys[key]}: ${darkValue};`)
        }
      } else if (lightValue) {
        // Use light value as fallback for dark mode
        const colorData = parseColorValue(lightValue as string)
        if (colorData) {
          darkVars.push(`${cssKeys[key]}: ${colorData[format] || colorData.hex};`)
        } else {
          darkVars.push(`${cssKeys[key]}: ${lightValue};`)
        }
      }
    }
  })

  // Process sizes
  Object.entries(sizes || {}).forEach(([key, value]) => {
    if (value) {
      const cssKey = sizeCssKeys[key as ThemeSizeKey]
      lightVars.push(`${cssKey}: ${value};`)
      if (DARK_MODE_ENABLED) {
        darkVars.push(`${cssKey}: ${value};`)
      }
    }
  })

  // If no CSS variables to set, return empty string
  if (lightVars.length === 0) {
    return ''
  }

  // Generate CSS with .dark class selector for dark mode if enabled
  if (DARK_MODE_ENABLED && darkVars.length > 0) {
    return `
      :root {
        ${lightVars.join('\n        ')}
      }
      
      .dark {
        ${darkVars.join('\n        ')}
      }
    `
  }

  // Just light mode
  return `
    :root {
      ${lightVars.join('\n      ')}
    }
  `
}
