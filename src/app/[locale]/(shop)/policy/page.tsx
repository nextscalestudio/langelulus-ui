import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { policies } from '@/data/policies'
import { FadeInView } from '@/components/FadeInView'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('policyTitle') }
}

export default async function PolicyPage() {
  const t = await getTranslations('policy')

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-[80px] md:pt-[120px] pb-[60px] md:pb-[80px]">
        <FadeInView>
          <p className="font-serif text-xs tracking-[0.25em] uppercase text-secondary/35 mb-6">
            {t('lastUpdated')}
          </p>
          <h1 className="font-serif text-[52px] md:text-[80px] leading-[1.05] text-secondary mb-6">
            {t('heading')}
          </h1>
          <p className="font-serif text-[18px] text-secondary/55 max-w-xl leading-relaxed">
            {t('subheading')}
          </p>
        </FadeInView>
      </div>

      {/* Gradient section divider */}
      <div className="h-px max-w-7xl mx-auto bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-[60px] lg:py-[120px]">
        <div className="flex gap-16">
          {/* Sticky TOC — hidden on mobile */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav aria-label="Policy sections" className="sticky top-28">
              <p className="font-serif text-xs tracking-[0.2em] uppercase text-secondary/30 mb-6">
                {t('contents')}
              </p>
              <ul className="space-y-4">
                {policies.map((policy) => (
                  <li key={policy.id}>
                    <a
                      href={`#${policy.id}`}
                      className="font-serif text-sm text-secondary/45 hover:text-accent transition-colors duration-200 block leading-snug"
                    >
                      {policy.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Policy content */}
          <div className="flex-1 min-w-0">
            {policies.map((policy, index) => (
              <FadeInView key={policy.id} delay={index * 0.06}>
                <section id={policy.id}>
                  {index > 0 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent my-14" />
                  )}
                  <h2 className="font-serif text-[26px] md:text-[32px] text-secondary mb-6 leading-tight">
                    {policy.title}
                  </h2>
                  {policy.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="font-serif text-[16px] md:text-[18px] text-secondary/65 leading-[1.9] mb-5 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </section>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
