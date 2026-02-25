import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import ThemeToggle from '../components/theme-toggle'
import Footer from '../components/footer'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'A catalog of works, resources, and metadata',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
