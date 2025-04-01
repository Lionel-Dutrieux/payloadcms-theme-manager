# PayloadCMS Theme Manager

A powerful and flexible theme management system for PayloadCMS that enables dynamic CSS variable management through an intuitive admin interface. Built with TypeScript and optimized for Next.js applications.

## Key Features

- 🎨 **Dynamic Theme Management**: Full control over your site's theme through the PayloadCMS admin panel
- 🎯 **CSS Variables**: Manage colors and sizes with built-in validation
- 🌓 **Light/Dark Mode**: Seamless support for light and dark color schemes
- 🎭 **Theme Presets**: Ready-to-use theme presets with both light and dark variants
- ⚡ **Next.js Integration**: Optimized performance with Next.js API and caching
- 🔒 **Type-Safe**: Complete TypeScript support for enhanced developer experience
- 🌍 **Multilingual**: Admin interface available in English, French, and Dutch
- 🚀 **Performance-Focused**: Efficient caching and minimal runtime impact

## Showcase

[Watch the video](https://i.lionel-dutrieux.com/u/rUvNbh.mp4) if it's not displayed above.

<video width="100%" controls>
  <source src="https://i.lionel-dutrieux.com/u/cIkAIm.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Quick Start

### 1. Install Required Files

Copy these core files to your PayloadCMS project:

```bash
src/
├── constants/
│   ├── themeConstants.ts    # Core theme configuration
│   └── themePresets.ts     # Theme presets definitions
├── globals/
│   └── Theme.ts            # PayloadCMS global configuration
└── lib/
    └── ThemeManager.ts     # Theme management and CSS generation
```

### 2. Configure PayloadCMS

Add the Theme global to your PayloadCMS configuration:

```typescript
import { Theme } from './globals/Theme'

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
import { getThemeCSS } from '@/lib/ThemeManager'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeCSS = await getThemeCSS()
  
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Theme Presets

The theme system includes a powerful preset system that allows you to define and use pre-configured themes. Each preset includes both light and dark mode variants.

### Using Theme Presets

1. In the PayloadCMS admin panel, navigate to the Theme global
2. Enable the theme using the checkbox
3. Choose a preset from the dropdown menu
4. Save your changes

### Creating Custom Presets

Add your own theme presets by modifying `src/constants/themePresets.ts`:

```typescript
export const themePresets: ThemePreset[] = [
  {
    id: 'my-custom-theme',
    name: 'My Custom Theme',
    colors: {
      light: {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        // ... other color variables
      },
      dark: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#60a5fa',
        primaryForeground: '#000000',
        // ... other color variables
      }
    },
    sizes: {
      radius: '0.5rem',
    },
  },
  // ... other presets
]
```

### Theme Color Structure

Each preset must implement the `ThemeColors` interface:

```typescript
export type ThemeColors = {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  border: string
  input: string
  ring: string
}
```

### Adding New Color Variables

1. Add the new variable to the `ThemeColors` type in `themePresets.ts`:
```typescript
export type ThemeColors = {
  // ... existing colors
  newColor: string
  newColorForeground: string
}
```

2. Add the CSS variable mapping in `themeConstants.ts`:
```typescript
export const cssKeys = {
  // ... existing keys
  newColor: '--new-color',
  newColorForeground: '--new-color-foreground',
}
```

3. Update all theme presets with the new colors:
```typescript
colors: {
  light: {
    // ... existing colors
    newColor: '#value',
    newColorForeground: '#value',
  },
  dark: {
    // ... existing colors
    newColor: '#value',
    newColorForeground: '#value',
  }
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
  --primary: #3B82F6;
  --radius: 0.625rem;
}

.dark {
  --primary: #60A5FA;
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
<div className="bg-[var(--primary)] rounded-[var(--radius)]">
  Themed Component
</div>
```

### In Styled Components
```tsx
const ThemedButton = styled.button`
  background-color: var(--primary);
  border-radius: var(--radius);
`;
```

## Dark Mode Integration

Implement dark mode toggling with next-themes:

```tsx
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}

// Theme toggle component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  )
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

## Performance

The theme system is optimized for performance:

- 🚀 7-day cache duration (configurable)
- 🔄 Smart cache invalidation
- ⚡ On-demand CSS generation
- 📦 Minimal bundle impact
