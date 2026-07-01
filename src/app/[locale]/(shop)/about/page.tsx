import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { aboutSubPages } from '@/data/about'
import AboutPageShell from '@/components/about/AboutPageShell'
import { FadeInView } from '@/components/FadeInView'

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

  // Resolve locale-specific text server-side
  const cards = aboutSubPages.map((page) => ({
    slug: page.slug,
    href: page.href,
    title: locale === 'vi' ? page.titleVi : page.titleEn,
    description: locale === 'vi' ? page.descriptionVi : page.descriptionEn,
  }))

  return (
    <AboutPageShell title={t('overviewHeading')} subtitle={t('overviewDescription')}>
      {/* Featured first card — full width */}
      <FadeInView delay={0}>
        <Link
          href={cards[0].href}
          className="group block border border-secondary/15 p-10 md:p-14 mb-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
        >
          <span className="font-serif text-xs tracking-[0.25em] uppercase text-secondary/40 block mb-4">
            01
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-secondary mb-5 group-hover:text-accent transition-colors duration-300 leading-tight">
            {cards[0].title}
          </h2>
          <p className="font-serif text-base md:text-[18px] leading-relaxed text-secondary/65 max-w-2xl mb-6">
            {cards[0].description}
          </p>
          <span className="font-serif text-sm tracking-widest text-accent uppercase">
            {t('learnMore')} →
          </span>
        </Link>
      </FadeInView>

      {/* 2-column grid for remaining cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {cards.slice(1, 4).map((card, i) => (
          <FadeInView key={card.slug} delay={(i + 1) * 0.1}>
            <Link
              href={card.href}
              className="group block border border-secondary/15 p-8 md:p-10 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <span className="font-serif text-xs tracking-[0.25em] uppercase text-secondary/40 block mb-3">
                0{i + 2}
              </span>
              <h2 className="font-serif text-[24px] md:text-[28px] text-secondary mb-4 group-hover:text-accent transition-colors duration-300 leading-tight">
                {card.title}
              </h2>
              <p className="font-serif text-base leading-relaxed text-secondary/65 mb-6">
                {card.description}
              </p>
              <span className="font-serif text-sm tracking-widest text-accent uppercase">
                {t('learnMore')} →
              </span>
            </Link>
          </FadeInView>
        ))}
      </div>

      {/* Catalogue — full-width banner card */}
      <FadeInView delay={0.4}>
        <Link
          href={cards[4].href}
          className="group flex flex-col md:flex-row items-center justify-between gap-8 border border-secondary/15 p-10 md:p-14 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
        >
          <div>
            <span className="font-serif text-xs tracking-[0.25em] uppercase text-secondary/40 block mb-4">
              05
            </span>
            <h2 className="font-serif text-[24px] md:text-[28px] text-secondary mb-4 group-hover:text-accent transition-colors duration-300">
              {cards[4].title}
            </h2>
            <p className="font-serif text-base leading-relaxed text-secondary/65 max-w-xl">
              {cards[4].description}
            </p>
          </div>
          <span className="flex-shrink-0 font-serif text-sm tracking-widest text-accent uppercase border border-accent/40 px-8 py-3 group-hover:bg-accent/5 group-hover:shadow-md transition-all duration-300 rounded-[10px]">
            {t('learnMore')} →
          </span>
        </Link>
      </FadeInView>
    </AboutPageShell>
  )
}
