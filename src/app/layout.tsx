import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'
import CartDrawer from '@/components/cart/CartDrawer'
import PageTransition from '@/components/layout/PageTransition'
import SearchModal from '@/components/layout/SearchModal'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'
import SocialWidget from '@/components/ui/SocialWidget'

export const metadata: Metadata = {
  title: { default: 'Parfum', template: '%s | Parfum' },
  description: 'Luxury perfumes — discover your signature scent.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Parfum',
  },
  robots: { index: true, follow: true },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-serif">
        <GoogleAnalytics />
        <ToastProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <SocialWidget />
        </ToastProvider>
      </body>
    </html>
  )
}
