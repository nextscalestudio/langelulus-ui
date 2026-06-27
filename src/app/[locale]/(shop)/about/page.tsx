import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
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

export default function AboutPage() {
  return (
    <>
      <div className="relative h-64 md:h-96 flex items-center justify-center">
        <Image
          src="/images/about/hero.jpg"
          alt="Về chúng tôi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <h1 className="relative font-serif text-[48px] text-white text-center leading-tight px-4">
          Về chúng tôi
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-serif text-base leading-relaxed text-secondary mb-12 text-center">
          Khám phá thế giới của L&apos;ANGELULUS — từ câu chuyện sáng lập đến triết lý thương hiệu,
          những nghệ nhân tài hoa và cam kết chất lượng của chúng tôi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutSubPages.map((page) => (
            <Link
              key={page.slug}
              href={page.href}
              className="block border border-secondary/20 p-6 hover:border-accent transition-colors group"
            >
              <h2 className="font-serif text-[22px] text-accent mb-3 group-hover:text-accent/80 transition-colors">
                {page.titleVi}
              </h2>
              <p className="font-serif text-sm leading-relaxed text-secondary">
                {page.descriptionVi}
              </p>
              <span className="mt-4 inline-block font-serif text-sm text-accent">
                Xem thêm →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
