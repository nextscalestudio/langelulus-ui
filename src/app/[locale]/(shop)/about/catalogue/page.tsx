import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
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
      <div className="text-center space-y-8">
        <p className="font-serif text-base leading-relaxed text-secondary max-w-2xl mx-auto">
          {catalogueInfo.descriptionVi}
        </p>

        <a
          href={catalogueInfo.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-serif text-sm border border-accent text-accent px-8 py-3 hover:bg-accent hover:text-white transition-colors"
        >
          Tải xuống Catalogue
        </a>

        <div className="border-t border-secondary/20 pt-8">
          <div className="relative mx-auto max-w-sm aspect-[3/4] border border-secondary/20">
            <Image
              src={catalogueInfo.coverImage}
              alt={catalogueInfo.titleVi}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </AboutPageShell>
  )
}
