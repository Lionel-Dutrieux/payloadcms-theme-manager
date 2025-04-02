# PayloadCMS Theme Manager

A powerful and flexible theme management system for PayloadCMS that enables dynamic CSS variable management through an intuitive admin interface. Built with TypeScript and optimized for Next.js applications.

## Key Features

- 🎨 **Dynamic Theme Management**: Full control over your site's theme through the PayloadCMS admin panel
- 🎯 **CSS Variables**: Manage colors and sizes with built-in validation and multiple color formats (HEX, HSL, OKLCH, RGB)
- 🌓 **Light/Dark Mode**: Seamless support for light and dark color schemes
- 🎭 **Theme Presets**: Ready-to-use theme presets with both light and dark variants
- ⚡ **Next.js Integration**: Optimized performance with Next.js API and caching
- 🔒 **Type-Safe**: Complete TypeScript support for enhanced developer experience
- 🌍 **Multilingual**: Admin interface available in English, French, and Dutch
- 🚀 **Performance-Focused**: Efficient caching and minimal runtime impact
- 🎯 **Color Format Support**: Multiple color format support (HEX, HSL, OKLCH, RGB)
- 🔄 **Real-time Preview**: Live preview of theme changes in the admin panel

## Project Structure

```bash
src/
├── features/
│   └── theme/
│       ├── api/          # API endpoints and handlers
│       ├── components/   # React components for theme management
│       ├── config/       # Theme configuration and presets
│       ├── models/       # PayloadCMS models and TypeScript types
│       └── utils/        # Utility functions for color handling and CSS generation
├── globals/
│   └── Theme.ts         # PayloadCMS Theme global configuration
```

## Installation

1. Install the required dependencies:

```bash
pnpm install chroma-js @types/chroma-js --save
```

2. Copy the theme management system files to your PayloadCMS project.

3. Add the Theme global to your PayloadCMS configuration:

```typescript
import { Theme } from '@/globals/Theme'

export default buildConfig({
  globals: [
    Theme,
    // ... other globals
  ],
})
```

## Theme Configuration

The theme system is built around a flexible configuration system that supports:

### Color Management

- Multiple color formats (HEX, HSL, OKLCH, RGB)
- Automatic color format conversion
- Color validation
- Light and dark mode variants

```typescript
// Example color configuration
colors: {
  light: {
    primary: '#0070f3',
    primaryForeground: '#ffffff',
    secondary: '#f5f5f5',
    secondaryForeground: '#000000',
  },
  dark: {
    primary: '#0070f3',
    primaryForeground: '#ffffff',
    secondary: '#1a1a1a',
    secondaryForeground: '#ffffff',
  }
}
```

### Size Management

- Configurable size variables
- Support for any CSS unit
- Consistent sizing across themes

```typescript
sizes: {
  radius: '0.5rem',
  radiusLg: '0.75rem',
  radiusSm: '0.25rem',
}
```

## Theme Presets

The system includes a powerful preset system:

```typescript
export interface ThemePreset {
  id: string
  name: {
    en: string
    fr: string
    nl: string
  }
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  sizes: ThemeSizes
}
```

### Using Presets

1. Navigate to the Theme global in the PayloadCMS admin panel
2. Enable the theme
3. Select a preset from the dropdown
4. Or choose "Custom Theme" to create your own

### Creating Custom Presets

Add your presets in `src/features/theme/config/presets.ts`:

```typescript
export const themePresets: ThemePreset[] = [
  {
    id: 'my-theme',
    name: {
      en: 'My Theme',
      fr: 'Mon Thème',
      nl: 'Mijn Thema',
    },
    colors: {
      light: {
        // Light mode colors
      },
      dark: {
        // Dark mode colors
      },
    },
    sizes: {
      // Size variables
    },
  },
]
```

## CSS Generation

The theme system automatically generates CSS variables based on your configuration:

```css
:root {
  --primary: #0070f3;
  --primary-foreground: #ffffff;
  /* ... other variables */
}

.dark {
  --primary: #60a5fa;
  --primary-foreground: #000000;
  /* ... other variables */
}
```

## Usage in Components

### React/Next.js Components

```tsx
const Button = styled.button`
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
`
```

### Tailwind CSS

```tsx
<div className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)]">
  Themed Component
</div>
```

## Performance Considerations

The theme system is optimized for performance:

- CSS variables are generated server-side
- Theme changes trigger automatic cache invalidation
- Minimal client-side JavaScript
- Efficient color format conversions

## Type Safety

The system provides complete TypeScript support:

```typescript
import { ThemeColors, ThemeSizes, ColorFormats } from '@/features/theme/models/types'

// Type-safe color formats
type ColorFormat = 'hex' | 'hsl' | 'oklch' | 'rgb'

// Type-safe theme configuration
interface ExtendedTheme {
  settings?: {
    enabled?: boolean | null
    usePreset?: 'custom' | string | null
  }
  colors?: ThemeColors
  sizes?: ThemeSizes
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Showcase

[Watch the video](https://i.lionel-dutrieux.com/u/1KCgpp.mp4) if it's not displayed above.

<video width="100%" controls>
  <source src="https://i.lionel-dutrieux.com/u/1KCgpp.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Quick Start

### 1. Install Required Files

Copy these core files to your PayloadCMS project:

```bash
src/
├── features/
│   └── theme/
│       ├── server.ts       # Server-side exports
│       ├── client.ts       # Client-side exports
│       ├── shared.ts       # Shared types and utilities
│       ├── config/         # Theme configuration
│       ├── models/         # PayloadCMS models
│       └── utils/          # Utility functions
```

### 2. Configure PayloadCMS

Add the Theme global to your PayloadCMS configuration:

```typescript
import { Theme } from '@/globals/Theme'

export default buildConfig({
  globals: [
    Theme,
    // ... other globals
  ],
})
```

### 3. Integrate with Your Layout

```tsx
// app/layout.tsx
import { generateThemeCSS, getTheme } from '@/features/theme/server'
import { ThemeProvider } from '@/features/theme/client'
import { type ThemeMode } from '@/features/theme/shared'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme()
  const themeCSS = generateThemeCSS(theme)

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

## Dark Mode Implementation

The theme system provides robust dark mode support with the following features:

- 🔧 **Developer-Controlled**: Enable/disable via `DARK_MODE_ENABLED` in `themeConstants.ts`
- 📑 **Tabbed Interface**: Separate light/dark mode configuration in admin UI
- 🔄 **Class-Based Toggle**: Uses `.dark` class for theme switching

Example output:

```css
:root {
  --primary: #3b82f6;
  --radius: 0.625rem;
}

.dark {
  --primary: #60a5fa;
  --radius: 0.625rem;
}
```

## Usage Examples

### In CSS/SCSS

```css
.component {
  background-color: var(--primary);
  border-radius: var(--radius);
}
```

### In Tailwind CSS

```tsx
<div className="bg-[var(--primary)] rounded-[var(--radius)]">Themed Component</div>
```

### In Styled Components

```tsx
const ThemedButton = styled.button`
  background-color: var(--primary);
  border-radius: var(--radius);
`
```

## Dark Mode Integration

Implement dark mode toggling:

```tsx
// app/components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/features/theme/client'
import { type ThemeMode } from '@/features/theme/shared'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle theme</button>
}
```

## Adding Custom Variables

Add new theme variables by extending `themeConstants.ts`:

```typescript
export const themeConfig = {
  colors: {
    highlight: {
      key: '--highlight',
      label: {
        en: 'Highlight Color',
        fr: 'Couleur de Surlignage',
        nl: 'Markeringskleur',
      },
      defaultValue: {
        light: '#FFC107',
        dark: '#FFD54F',
      },
    },
  },
  sizes: {
    buttonPadding: {
      key: '--button-padding',
      label: {
        en: 'Button Padding',
        fr: 'Rembourrage de Bouton',
        nl: 'Knopvulling',
      },
      defaultValue: '0.75rem',
    },
  },
}
```
