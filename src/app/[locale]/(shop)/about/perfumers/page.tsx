import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
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
      <div className="space-y-12">
        {perfumers.map((perfumer) => (
          <div
            key={perfumer.id}
            className="flex flex-col md:flex-row gap-8 border border-secondary/20 p-6"
          >
            <div className="flex-shrink-0">
              <Image
                src={perfumer.image}
                alt={perfumer.name}
                width={280}
                height={280}
                className="object-cover w-full md:w-[280px] h-[280px]"
              />
            </div>

            <div className="flex-1">
              <h2 className="font-serif text-[24px] text-accent mb-1">
                {perfumer.name}
              </h2>
              <p className="font-serif text-sm text-secondary mb-1">
                {perfumer.roleVi}
              </p>
              <p className="font-serif text-sm text-secondary/60 mb-4">
                {perfumer.yearsExp} năm kinh nghiệm
              </p>
              <p className="font-serif text-base leading-relaxed text-secondary mb-4">
                {perfumer.bioVi}
              </p>
              <div className="flex flex-wrap gap-2">
                {perfumer.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="font-serif text-xs border border-accent/40 text-accent px-3 py-1"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AboutPageShell>
  )
}
