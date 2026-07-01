import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
import { FadeInView } from '@/components/FadeInView'
import { philosophyPrinciples } from '@/data/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutPhilosophyTitle') }
}

export default function PhilosophyPage() {
  return (
    <AboutPageShell title="Triết lý thương hiệu">
      <div className="space-y-16">
        {/* Full-width featured principle — alternating editorial layout */}
        {philosophyPrinciples.map((principle, i) => {
          const isEven = i % 2 === 0
          return (
            <FadeInView key={principle.id} delay={i * 0.1}>
              <div className={`flex flex-col md:flex-row gap-10 md:gap-16 items-start ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Large decorative number */}
                <div className="flex-shrink-0 w-full md:w-40 text-center md:text-left">
                  <span className="font-serif text-[96px] md:text-[120px] leading-none text-secondary/8 select-none block">
                    {String(principle.number).padStart(2, '0')}
                  </span>
                </div>

                {/* Principle text */}
                <div className="flex-1 border-t border-secondary/15 pt-8">
                  <h2 className="font-serif text-[28px] md:text-[32px] text-secondary mb-6 leading-tight">
                    {principle.titleVi}
                  </h2>
                  <p className="font-serif text-[17px] md:text-[18px] leading-[1.9] text-secondary/70">
                    {principle.descriptionVi}
                  </p>
                </div>
              </div>
            </FadeInView>
          )
        })}
      </div>
    </AboutPageShell>
  )
}
