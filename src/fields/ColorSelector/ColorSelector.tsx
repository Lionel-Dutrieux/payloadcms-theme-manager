'use client'

import { ColorFormats, ColorValue } from '@/features/theme/models/types'
import { FieldLabel, useField } from '@payloadcms/ui'
import chroma from 'chroma-js'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import './style.scss'

type FieldConfig = {
  name: string
  label?: string
  required?: boolean
  placeholder?: string
  description?: string
}

type ColorSelectorProps = {
  path: string
  field: FieldConfig
}

const DEBOUNCE_DELAY = 150 // ms

export function ColorSelector({ path, field }: ColorSelectorProps) {
  const { value, setValue } = useField<string>({ path })
  const [showFormats, setShowFormats] = useState(false)
  const [draftColor, setDraftColor] = useState<string>('')
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined)
  const skipNextUpdate = useRef(false)

  // Format OKLCH to use decimals instead of percentages and handle edge cases
  const formatOklch = useCallback((color: chroma.Color): string => {
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
  }, [])

  // Convert color to all formats
  const convertColor = useCallback(
    (inputColor: string): ColorFormats | null => {
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
    },
    [formatOklch],
  )

  // Parse the JSON string to get the color formats - memoized
  const parseValue = useCallback(
    (val: string | null): ColorValue => {
      if (!val) return null
      try {
        return JSON.parse(val) as ColorFormats
      } catch {
        // If the value is not JSON, assume it's a legacy hex value
        if (typeof val === 'string' && val.startsWith('#')) {
          try {
            const color = chroma(val)
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
        return null
      }
    },
    [formatOklch],
  )

  const colorValue = useMemo(() => parseValue(value), [value, parseValue])
  const displayColor = draftColor || colorValue?.hex || ''

  // Debounced color update
  const updateColorWithDebounce = useCallback(
    (newColor: string) => {
      if (skipNextUpdate.current) {
        skipNextUpdate.current = false
        return
      }

      setDraftColor(newColor)

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(() => {
        const colorFormats = convertColor(newColor)
        if (colorFormats) {
          setValue(JSON.stringify(colorFormats))
          setDraftColor('')
        }
      }, DEBOUNCE_DELAY)
    },
    [convertColor, setValue],
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value
      if (!input) {
        setValue(null)
        setDraftColor('')
        return
      }

      updateColorWithDebounce(input)
    },
    [updateColorWithDebounce, setValue],
  )

  const handleColorPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateColorWithDebounce(e.target.value)
    },
    [updateColorWithDebounce],
  )

  const toggleFormats = useCallback(() => {
    setShowFormats((prev) => !prev)
  }, [])

  const isValidColor = useCallback((color: string): boolean => {
    try {
      chroma(color)
      return true
    } catch {
      return false
    }
  }, [])

  // Cleanup debounce timer
  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const validDisplayColor = useMemo(
    () => (isValidColor(displayColor) ? displayColor : 'transparent'),
    [displayColor, isValidColor],
  )

  return (
    <div className="color-selector__field">
      <div className="color-selector__header">
        <FieldLabel htmlFor={path} label={field.label || field.name} required={field.required} />
        {colorValue && (
          <button
            type="button"
            onClick={toggleFormats}
            className="color-selector__toggle"
            aria-expanded={showFormats}
          >
            {showFormats ? '−' : '+'}
          </button>
        )}
      </div>
      <div className="color-selector__input-wrapper">
        <input
          type="text"
          id={path}
          name={path}
          value={displayColor}
          onChange={handleTextChange}
          placeholder={field.placeholder || '#000000'}
          required={field.required}
          className={`color-selector__text-field ${!isValidColor(displayColor) && displayColor ? 'color-selector__text-field--error' : ''}`}
        />
        <div className="color-selector__color-preview-container">
          <div
            className="color-selector__color-preview"
            style={{ backgroundColor: validDisplayColor }}
          ></div>
          <input
            type="color"
            value={isValidColor(displayColor) ? displayColor : '#000000'}
            onChange={handleColorPickerChange}
            className="color-selector__color-picker"
            aria-label="Color picker"
          />
        </div>
      </div>
      {field.description && <div className="color-selector__description">{field.description}</div>}
      {colorValue && showFormats && (
        <div className="color-selector__formats">
          <div className="color-selector__format">
            <div
              className="color-selector__format-preview"
              style={{ backgroundColor: colorValue.hsl }}
            ></div>
            <span>{colorValue.hsl}</span>
          </div>
          <div className="color-selector__format">
            <div
              className="color-selector__format-preview"
              style={{ backgroundColor: colorValue.rgb }}
            ></div>
            <span>{colorValue.rgb}</span>
          </div>
          <div className="color-selector__format">
            <div
              className="color-selector__format-preview"
              style={{ backgroundColor: colorValue.oklch }}
            ></div>
            <span>{colorValue.oklch}</span>
          </div>
        </div>
      )}
    </div>
  )
}
