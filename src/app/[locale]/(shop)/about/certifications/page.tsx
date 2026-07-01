import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
import { FadeInView } from '@/components/FadeInView'
import { certifications } from '@/data/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutCertsTitle') }
}

export default function CertificationsPage() {
  return (
    <AboutPageShell title="Chứng nhận">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {certifications.map((cert, i) => (
          <FadeInView key={cert.id} delay={i * 0.1}>
            <div className="border border-secondary/15 p-8 md:p-10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
              <div className="flex items-start justify-between gap-4 mb-5">
                <h2 className="font-serif text-[22px] md:text-[24px] text-secondary leading-snug">
                  {cert.nameVi}
                </h2>
                <span className="flex-shrink-0 font-serif text-xs tracking-widest border border-secondary/25 text-secondary/50 px-3 py-1 rounded-[8px]">
                  {cert.year}
                </span>
              </div>
              <p className="font-serif text-base text-secondary/50 mb-5 pb-5 border-b border-secondary/12">
                {cert.issuerVi}
              </p>
              <p className="font-serif text-[17px] leading-[1.8] text-secondary/70">
                {cert.descriptionVi}
              </p>
            </div>
          </FadeInView>
        ))}
      </div>
    </AboutPageShell>
  )
}
