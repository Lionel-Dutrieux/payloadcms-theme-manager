import { ThemeProvider } from '@/providers/ThemeProvider'
import React from 'react'
import { getThemeCSS } from '../../lib/ThemeManager'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch theme and generate CSS in one call with default hex format
  const themeCSS = await getThemeCSS('oklch')

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: themeCSS,
          }}
        />
      </head>
      <body>
        <main>
          <ThemeProvider defaultTheme="light" storageKey="theme-preference">
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
