import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import ThemeToggle from '../components/theme-toggle'

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
          <footer className='site-footer px-6 text-foreground/60 text-xs flex items-center justify-between py-2 gap-4 border-t mt-8'>
            <p>OPEN INDEX</p>
            <div>
              <ThemeToggle />
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
