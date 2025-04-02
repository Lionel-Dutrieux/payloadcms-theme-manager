export interface ColorFormats {
  hex: string
  hsl: string
  oklch: string
  rgb: string
  reference: 'hex' // This indicates which format is the reference/default
}

export type ColorValue = ColorFormats | null

// Helper type for the field value in PayloadCMS
export type PayloadColorValue = string // This will be JSON stringified ColorFormats
