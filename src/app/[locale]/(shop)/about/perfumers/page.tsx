import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
import { FadeInView } from '@/components/FadeInView'
import { perfumers } from '@/data/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutPerfumersTitle') }
}

export default function PerfumersPage() {
  return (
    <AboutPageShell title="Nhà sáng tác hương">
      <div className="space-y-20">
        {perfumers.map((perfumer, i) => {
          const isEven = i % 2 === 0
          return (
            <FadeInView key={perfumer.id} delay={i * 0.1}>
              <div
                className={`flex flex-col md:flex-row gap-12 md:gap-16 items-start ${
                  !isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Portrait — larger, editorial */}
                <div className="flex-shrink-0 w-full md:w-[340px]">
                  <div className="relative aspect-[3/4] w-full md:w-[340px] overflow-hidden">
                    <Image
                      src={perfumer.image}
                      alt={perfumer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Bio — generous spacing, open layout */}
                <div className="flex-1 pt-4 md:pt-10">
                  <p className="font-serif text-xs tracking-[0.25em] uppercase text-secondary/40 mb-4">
                    {perfumer.yearsExp} năm kinh nghiệm
                  </p>
                  <h2 className="font-serif text-[32px] md:text-[40px] text-secondary leading-tight mb-3">
                    {perfumer.name}
                  </h2>
                  <p className="font-serif text-base text-secondary/60 mb-8 border-b border-secondary/15 pb-8">
                    {perfumer.roleVi}
                  </p>
                  <p className="font-serif text-[17px] md:text-[18px] leading-[1.9] text-secondary/70 mb-10">
                    {perfumer.bioVi}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {perfumer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="font-serif text-sm border border-secondary/25 text-secondary/60 px-4 py-1.5 rounded-[8px]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Soft divider between perfumers */}
              {i < perfumers.length - 1 && (
                <div className="mt-20 h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />
              )}
            </FadeInView>
          )
        })}
      </div>
    </AboutPageShell>
  )
}
