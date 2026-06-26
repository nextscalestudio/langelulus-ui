import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Parfum',
  description: 'Perfume Shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-serif">
        {children}
      </body>
    </html>
  )
}
