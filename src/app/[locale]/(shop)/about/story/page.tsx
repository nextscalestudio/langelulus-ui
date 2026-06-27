import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
import { storyContent } from '@/data/about'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutStoryTitle') }
}

export default function StoryPage() {
  return (
    <AboutPageShell title={storyContent.headingVi}>
      <div className="space-y-8">
        <p className="font-serif text-sm text-accent">
          Thành lập năm {storyContent.foundedYear} · {storyContent.foundedCity}
        </p>

        {storyContent.paragraphsVi.map((paragraph, i) => (
          <p
            key={i}
            className="font-serif text-base leading-relaxed text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </AboutPageShell>
  )
}
