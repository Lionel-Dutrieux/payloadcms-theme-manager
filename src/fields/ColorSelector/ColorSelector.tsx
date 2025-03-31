'use client'

import './style.scss'

import { FieldLabel } from '@payloadcms/ui'
import { useField } from '@payloadcms/ui'
import React from 'react'

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

export function ColorSelector({ path, field }: ColorSelectorProps) {
  const { value, setValue } = useField({ path })

  // Convert the value to a valid hex color or return null for empty values
  const normalizeColor = (inputColor: unknown): string | null => {
    if (!inputColor) return null
    if (typeof inputColor === 'string' && inputColor) {
      return inputColor.startsWith('#') ? inputColor : `#${inputColor}`
    }
    return null
  }

  const displayColor = normalizeColor(value)

  return (
    <div className="color-selector__field">
      <FieldLabel htmlFor={path} label={field.label || field.name} required={field.required} />
      <div className="color-selector__input-wrapper">
        <input
          type="text"
          id={path}
          name={path}
          value={displayColor || ''}
          onChange={(e) => setValue(e.target.value || null)}
          placeholder={field.placeholder || '#000000'}
          required={field.required}
          className="color-selector__text-field"
        />
        <div className="color-selector__color-preview-container">
          <div
            className="color-selector__color-preview"
            style={{ backgroundColor: displayColor || 'transparent' }}
          ></div>
          <input
            type="color"
            value={displayColor || '#000000'}
            onChange={(e) => setValue(e.target.value || null)}
            className="color-selector__color-picker"
            aria-label="Color picker"
          />
        </div>
      </div>
      {field.description && <div className="color-selector__description">{field.description}</div>}
    </div>
  )
}
