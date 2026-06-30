import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
        },
      }
    : {}),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value ?? 'vi'

  return (
    <ViewTransitions>
      <html lang={lang}>
        <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
          <GoogleAnalytics />
          {children}
        </body>
      </html>
    </ViewTransitions>
  )
}
