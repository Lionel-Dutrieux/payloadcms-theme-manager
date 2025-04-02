import configPromise from '@payload-config'
import { revalidateTag, unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import {
  cssKeys,
  DARK_MODE_ENABLED,
  sizeCssKeys,
  ThemeColorKey,
  ThemeSizeKey,
} from '../constants/themeConstants'
import { getPresetById, PresetValue, ThemeColors } from '../constants/themePresets'
import { ThemeSizes } from '../globals/Theme'
import { Theme } from '../payload-types'

// Fix for the Theme type until payload-types.ts is regenerated
// This extends the existing Theme type to include the sizes property
interface ExtendedTheme extends Theme {
  settings?: {
    enabled?: boolean | null
    usePreset?: PresetValue | null
  }
  sizes?: ThemeSizes
}

// Cache tag for theme data
const THEME_CACHE_TAG = 'theme-data'

// Set cache time to 7 days (in seconds)
const CACHE_TIME_SECONDS = 60 * 60 * 24 * 7

/**
 * Fetch theme data from PayloadCMS using proper Next.js caching
 */
export const getTheme = unstable_cache(
  async (): Promise<ExtendedTheme | null> => {
    try {
      // Initialize Payload
      const payload = await getPayload({
        config: configPromise,
      })

      // Use local API to fetch theme data
      const themeData = await payload.findGlobal({
        slug: 'theme',
      })

      return themeData as ExtendedTheme
    } catch (error) {
      console.error('Error fetching theme:', error)
      return null
    }
  },
  ['theme-global'], // Key parts to identify this cached data
  {
    tags: [THEME_CACHE_TAG], // Tag for cache invalidation
    revalidate: CACHE_TIME_SECONDS, // Revalidate after 7 days
  },
)

/**
 * Invalidate theme cache
 * Call this when theme is updated
 */
export const invalidateThemeCache = () => {
  try {
    revalidateTag(THEME_CACHE_TAG)
    console.log('[ThemeManager] Theme cache invalidated')
  } catch (error) {
    console.error('Error invalidating theme cache:', error)
  }
}

/**
 * Convert theme colors to CSS variables with specified format
 */
function generateColorVariables(
  colors: ThemeColors,
  format: 'hex' | 'hsl' | 'oklch' = 'hex',
): string[] {
  return Object.entries(colors)
    .map(([key, value]) => {
      if (!value) return ''
      try {
        const colorData = JSON.parse(value)
        return `${cssKeys[key as ThemeColorKey]}: ${colorData[format] || colorData.hex};`
      } catch {
        // If not JSON, assume it's a legacy hex value
        return `${cssKeys[key as ThemeColorKey]}: ${value};`
      }
    })
    .filter(Boolean)
}

/**
 * Generate CSS variables from theme object
 */
export function generateThemeCSS(
  theme: ExtendedTheme | null,
  format: 'hex' | 'hsl' | 'oklch' = 'hex',
): string {
  // Return empty string if theme is null or disabled
  if (!theme || !theme.settings?.enabled) {
    console.log('[ThemeManager] Theme is null or disabled:', { theme })
    return ''
  }

  // Check if using a preset theme
  if (theme.settings.usePreset && theme.settings.usePreset !== 'custom') {
    const preset = getPresetById(theme.settings.usePreset)
    if (!preset) {
      console.error(`[ThemeManager] Preset theme not found: ${theme.settings.usePreset}`)
      return ''
    }

    // Generate CSS from preset
    const lightVars = generateColorVariables(preset.colors.light, format)
    const darkVars = DARK_MODE_ENABLED ? generateColorVariables(preset.colors.dark, format) : []

    // Add sizes
    Object.entries(preset.sizes).forEach(([key, value]) => {
      if (value) {
        const cssKey = sizeCssKeys[key as ThemeSizeKey]
        lightVars.push(`${cssKey}: ${value};`)
        if (DARK_MODE_ENABLED) {
          darkVars.push(`${cssKey}: ${value};`)
        }
      }
    })

    // Generate final CSS
    if (DARK_MODE_ENABLED && darkVars.length > 0) {
      return `
        :root {
          ${lightVars.join('\n          ')}
        }
        
        .dark {
          ${darkVars.join('\n          ')}
        }
      `
    }

    return `
      :root {
        ${lightVars.join('\n        ')}
      }
    `
  }

  // Handle custom theme
  const { colors, sizes } = theme
  console.log('[ThemeManager] Processing custom theme:', { colors, sizes })

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
      try {
        const colorData = JSON.parse(lightValue as string)
        lightVars.push(`${cssKeys[key]}: ${colorData[format] || colorData.hex};`)
      } catch {
        // If not JSON, assume it's a legacy hex value
        lightVars.push(`${cssKeys[key]}: ${lightValue};`)
      }
    }

    // Process dark mode values if dark mode is enabled
    if (DARK_MODE_ENABLED) {
      const darkValue = colors?.[darkFieldName as keyof typeof colors]

      if (darkValue) {
        try {
          const colorData = JSON.parse(darkValue as string)
          darkVars.push(`${cssKeys[key]}: ${colorData[format] || colorData.hex};`)
        } catch {
          // If not JSON, assume it's a legacy hex value
          darkVars.push(`${cssKeys[key]}: ${darkValue};`)
        }
      } else if (lightValue) {
        try {
          const colorData = JSON.parse(lightValue as string)
          darkVars.push(`${cssKeys[key]}: ${colorData[format] || colorData.hex};`)
        } catch {
          // If not JSON, assume it's a legacy hex value
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

/**
 * Convenience method to fetch and generate CSS in one call
 */
export async function getThemeCSS(format: 'hex' | 'hsl' | 'oklch' = 'hex'): Promise<string> {
  const theme = await getTheme()
  return generateThemeCSS(theme, format)
}
