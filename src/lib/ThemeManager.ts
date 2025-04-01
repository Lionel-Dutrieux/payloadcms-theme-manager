import { Theme } from '../payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache, revalidateTag } from 'next/cache'
import {
  cssKeys,
  ThemeColorKey,
  sizeCssKeys,
  ThemeSizeKey,
  THEME_MODES,
  DARK_MODE_ENABLED,
  getColorVariableName,
} from '../constants/themeConstants'
import { ThemeSizes } from '../globals/Theme'
import { getPresetById, ThemeColors, PresetValue } from '../constants/themePresets'

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
 * Convert theme colors to CSS variables
 */
function generateColorVariables(colors: ThemeColors): string[] {
  return Object.entries(colors).map(([key, value]) => {
    return `${cssKeys[key as ThemeColorKey]}: ${value};`
  })
}

/**
 * Generate CSS variables from theme object
 */
export function generateThemeCSS(theme: ExtendedTheme | null): string {
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
    const lightVars = generateColorVariables(preset.colors.light)
    const darkVars = DARK_MODE_ENABLED ? generateColorVariables(preset.colors.dark) : []

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
      lightVars.push(`${cssKeys[key]}: ${lightValue};`)
    }

    // Process dark mode values if dark mode is enabled
    if (DARK_MODE_ENABLED) {
      const darkValue = colors?.[darkFieldName as keyof typeof colors]

      if (darkValue) {
        darkVars.push(`${cssKeys[key]}: ${darkValue};`)
      } else if (lightValue) {
        darkVars.push(`${cssKeys[key]}: ${lightValue};`)
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
export async function getThemeCSS(): Promise<string> {
  const theme = await getTheme()
  return generateThemeCSS(theme)
}
