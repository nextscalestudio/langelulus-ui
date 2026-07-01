import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
import { FadeInView } from '@/components/FadeInView'
import { catalogueInfo } from '@/data/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutCatalogueTitle') }
}

export default function CataloguePage() {
  return (
    <AboutPageShell title={catalogueInfo.titleVi}>
      {/* Editorial: image left, text + CTA right */}
      <FadeInView delay={0}>
        <div className="flex flex-col md:flex-row gap-14 md:gap-20 items-start">
          {/* Cover image — portrait, prominent */}
          <div className="flex-shrink-0 w-full md:w-[280px]">
            <div className="relative aspect-[3/4] w-full md:w-[280px] overflow-hidden shadow-2xl">
              <Image
                src={catalogueInfo.coverImage}
                alt={catalogueInfo.titleVi}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text + download CTA */}
          <div className="flex-1 pt-4 md:pt-8">
            <p className="font-serif text-xs tracking-[0.25em] uppercase text-secondary/40 mb-6">
              Catalogue 2025
            </p>
            <p className="font-serif text-[17px] md:text-[18px] leading-[1.9] text-secondary/70 mb-10">
              {catalogueInfo.descriptionVi}
            </p>

            {/* Ghost download button — no flat solid fill on hover */}
            <a
              href={catalogueInfo.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-serif text-sm tracking-widest text-accent uppercase border border-accent/40 px-10 py-4 rounded-[10px] hover:shadow-lg hover:-translate-y-0.5 hover:bg-accent/5 transition-all duration-400"
            >
              Tải xuống Catalogue
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v9M3 7l4 3 4-3M1 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Soft divider + spec info */}
            <div className="mt-10 pt-10 border-t border-secondary/12">
              <p className="font-serif text-base text-secondary/40">
                PDF · Cập nhật 2025 · Hơn 50 tác phẩm hương thơm
              </p>
            </div>
          </div>
        </div>
      </FadeInView>
    </AboutPageShell>
  )
}
