import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'
import CartDrawer from '@/components/cart/CartDrawer'
import PageTransition from '@/components/layout/PageTransition'
import SearchModal from '@/components/layout/SearchModal'
import SocialWidget from '@/components/ui/SocialWidget'
import { routing } from '@/i18n/routing'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: { default: t('siteName'), template: `%s | ${t('siteName')}` },
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      siteName: t('siteName'),
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastProvider>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <CartDrawer />
        <SearchModal />
        <SocialWidget />
      </ToastProvider>
    </NextIntlClientProvider>
  )
}
