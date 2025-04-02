import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { CACHE_TIME_SECONDS, THEME_CACHE_TAG } from '../config/constants'
import { ExtendedTheme } from '../models/types'

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
      console.error('[Theme] Error fetching theme:', error)
      return null
    }
  },
  ['theme-global'], // Key parts to identify this cached data
  {
    tags: [THEME_CACHE_TAG], // Tag for cache invalidation
    revalidate: CACHE_TIME_SECONDS, // Revalidate after 7 days
  },
)
