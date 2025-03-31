# PayloadCMS Theme Manager

A powerful and flexible theme management system for PayloadCMS that enables dynamic CSS variable management through an intuitive admin interface. Built with TypeScript and optimized for Next.js applications.

## Key Features

- 🎨 **Dynamic Theme Management**: Full control over your site's theme through the PayloadCMS admin panel
- 🎯 **CSS Variables**: Manage colors and sizes with built-in validation
- 🌓 **Light/Dark Mode**: Seamless support for light and dark color schemes
- ⚡ **Next.js Integration**: Optimized performance with Next.js API and caching
- 🔒 **Type-Safe**: Complete TypeScript support for enhanced developer experience
- 🌍 **Multilingual**: Admin interface available in English, French, and Dutch
- 🚀 **Performance-Focused**: Efficient caching and minimal runtime impact

## Showcase

[Watch the video](https://i.lionel-dutrieux.com/u/cIkAIm.mov) if it's not displayed above.

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
│   └── themeConstants.ts    # Core theme configuration
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

## Architecture

The theme system consists of three main components working together:

1. **Theme Constants** (`themeConstants.ts`)
   - Defines available theme options
   - Sets default values
   - Implements validation rules

2. **Theme Global** (`Theme.ts`)
   - Creates PayloadCMS global configuration
   - Manages theme settings storage
   - Handles admin interface structure

3. **Theme Manager** (`ThemeManager.ts`)
   - Manages theme data fetching
   - Implements caching strategy
   - Generates CSS variables

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
