import { getTheme } from '@/features/theme/api/getTheme'
import { ThemeProvider } from '@/features/theme/components/ThemeProvider'
import { generateThemeCSS } from '@/features/theme/utils/css'
import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch theme and generate CSS in one call with default hex format
  const theme = await getTheme()
  const themeCSS = generateThemeCSS(theme, 'oklch')

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
