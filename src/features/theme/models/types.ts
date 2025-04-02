import { Theme as PayloadTheme } from '../../../payload-types'
import { ThemeSizeKey } from '../config/constants'
import { PresetValue } from '../config/presets'

// Theme colors structure
export type ThemeColors = Record<string, string | null>

// Theme sizes structure
export type ThemeSizes = {
  [K in ThemeSizeKey]?: string | null
}

// Extended Theme type that includes all properties
export interface ExtendedTheme extends PayloadTheme {
  settings?: {
    enabled?: boolean | null
    usePreset?: PresetValue | null
  }
  sizes?: ThemeSizes
}

// Color format types
export type ColorFormat = 'hex' | 'hsl' | 'oklch'

export interface ColorFormats {
  hex: string
  hsl: string
  oklch: string
  rgb: string
  reference: 'hex'
}

export type ColorValue = ColorFormats | null
