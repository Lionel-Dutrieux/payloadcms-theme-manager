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

// Fix for the Theme type until payload-types.ts is regenerated
// This extends the existing Theme type to include the sizes property
interface ExtendedTheme extends Theme {
  settings?: {
    enabled?: boolean
  }
  sizes?: {
    [key in ThemeSizeKey]?: string | null
  }
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
 * Generate CSS variables from theme object
 */
export function generateThemeCSS(theme: ExtendedTheme | null): string {
  // Return empty string if theme is null or disabled
  if (!theme || !theme.settings?.enabled) {
    console.log('[ThemeManager] Theme is null or disabled:', { theme })
    return ''
  }

  const { colors, sizes } = theme
  console.log('[ThemeManager] Processing theme:', { colors, sizes })
  const isDarkModeEnabled = DARK_MODE_ENABLED // Controlled only by constant, not by admin UI

  // Only include CSS variables that have defined values
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
      // Use the original CSS variable name (--primary, etc.) for light mode
      lightVars.push(`${cssKeys[key]}: ${lightValue};`)
    }

    // Process dark mode values if dark mode is enabled
    if (isDarkModeEnabled) {
      const darkValue = colors?.[darkFieldName as keyof typeof colors]

      if (darkValue) {
        // For dark mode, we don't use a -dark suffix, we use the same variable name
        // but under the .dark class selector
        darkVars.push(`${cssKeys[key]}: ${darkValue};`)
      } else if (lightValue) {
        // If no dark value is set but light value exists, use light value as fallback
        darkVars.push(`${cssKeys[key]}: ${lightValue};`)
      }
    }
  })

  // Process each size dynamically using the keys from sizeCssKeys
  Object.keys(sizeCssKeys).forEach((sizeName) => {
    const key = sizeName as ThemeSizeKey
    const value = sizes?.[key]

    if (value) {
      // Add size to light mode variables
      lightVars.push(`${sizeCssKeys[key]}: ${value};`)

      // Also add to dark mode - sizes typically don't change between modes
      if (isDarkModeEnabled) {
        darkVars.push(`${sizeCssKeys[key]}: ${value};`)
      }
    }
  })

  // If no CSS variables to set, return empty string
  if (lightVars.length === 0) {
    return ''
  }

  // Generate CSS with .dark class selector for dark mode if enabled
  if (isDarkModeEnabled && darkVars.length > 0) {
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
