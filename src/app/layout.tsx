import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'

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
        <body className="font-serif">
          <GoogleAnalytics />
          {children}
        </body>
      </html>
    </ViewTransitions>
  )
}
