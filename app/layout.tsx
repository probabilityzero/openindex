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
        </ThemeProvider>
        <footer className='mx-auto max-w-7xl' style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #333', fontSize: '12px', color: '#666', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0 }}>Built for long-term cost efficiency. No tracking, no ads, no bloat.</p>
          <div style={{ marginLeft: '1rem' }}>
            <ThemeToggle />
          </div>
        </footer>
      </body>
    </html>
  )
}
