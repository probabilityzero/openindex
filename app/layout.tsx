import type { Metadata } from 'next'
import './globals.css'

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
        <main className="flex-1">
          {children}
        </main>
        <footer className='mx-auto max-w-7xl'>
          <p>Built for long-term cost efficiency. No tracking, no ads, no bloat.</p>
        </footer>
      </body>
    </html>
  )
}
