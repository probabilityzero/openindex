import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'A planet-scale catalog of works, resources, and metadata',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
