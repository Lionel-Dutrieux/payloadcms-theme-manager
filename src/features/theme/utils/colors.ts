import chroma from 'chroma-js'
import { ColorFormats } from '../models/types'

/**
 * Format OKLCH color with proper decimal values and handle edge cases
 */
export function formatOklch(color: chroma.Color): string {
  try {
    const [l, c, h] = color.oklch()
    const lightness = (l * 100).toFixed(1)
    const chroma = c.toFixed(3)

    // Handle special cases where hue is meaningless (black, white, greys)
    if (c < 0.0001) {
      // Using a small threshold for chromacity
      return `oklch(${lightness}% 0 0)`
    }

    // For colored values, include hue
    const hue = isNaN(h) ? 0 : h.toFixed(1)
    return `oklch(${lightness}% ${chroma} ${hue})`
  } catch (error) {
    console.error('Error formatting OKLCH:', error)
    return 'oklch(0% 0 0)'
  }
}

/**
 * Convert color to all supported formats
 */
export function convertColor(inputColor: string): ColorFormats | null {
  try {
    const color = chroma(inputColor)
    return {
      hex: color.hex(),
      hsl: color.css('hsl'),
      oklch: formatOklch(color),
      rgb: color.css('rgb'),
      reference: 'hex',
    }
  } catch {
    return null
  }
}

/**
 * Parse color value from string
 */
export function parseColorValue(value: string | null): ColorFormats | null {
  if (!value) return null
  try {
    return JSON.parse(value) as ColorFormats
  } catch {
    // If not JSON, assume it's a legacy hex value
    if (typeof value === 'string' && value.startsWith('#')) {
      return convertColor(value)
    }
    return null
  }
}

/**
 * Validate if string is a valid color
 */
export function isValidColor(color: string): boolean {
  try {
    chroma(color)
    return true
  } catch {
    return false
  }
}

/**
 * Validate hex color code
 */
export function validateHexColor(value: string | null | undefined): true | string {
  if (!value) return true

  try {
    // Try to parse as JSON first (new format)
    const parsed = JSON.parse(value)
    if (parsed && typeof parsed === 'object' && parsed.hex) {
      // Validate the hex value from the color object
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(parsed.hex)) {
        return `Please enter a valid hex color code (e.g. #FF00DD)`
      }
      return true
    }
  } catch {
    // If not JSON, validate as legacy hex color
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      return `Please enter a valid hex color code (e.g. #FF00DD)`
    }
  }

  return true
}
