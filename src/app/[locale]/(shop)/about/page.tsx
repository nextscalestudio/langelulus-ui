import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { aboutSubPages } from '@/data/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutTitle') }
}

export default async function AboutPage() {
  const locale = await getLocale()
  const t = await getTranslations('about')

  return (
    <>
      <div className="relative h-64 md:h-96 flex items-center justify-center">
        <Image
          src="/images/about/hero.jpg"
          alt={t('overviewHeading')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <h1 className="relative font-serif text-[48px] text-white text-center leading-tight px-4">
          {t('overviewHeading')}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-serif text-base leading-relaxed text-secondary mb-12 text-center">
          {t('overviewDescription')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutSubPages.map((page) => (
            <Link
              key={page.slug}
              href={page.href}
              className="block border border-secondary/20 p-6 hover:border-accent transition-colors group"
            >
              <h2 className="font-serif text-[22px] text-accent mb-3 group-hover:text-accent/80 transition-colors">
                {locale === 'vi' ? page.titleVi : page.titleEn}
              </h2>
              <p className="font-serif text-sm leading-relaxed text-secondary">
                {locale === 'vi' ? page.descriptionVi : page.descriptionEn}
              </p>
              <span className="mt-4 inline-block font-serif text-sm text-accent">
                {t('learnMore')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
