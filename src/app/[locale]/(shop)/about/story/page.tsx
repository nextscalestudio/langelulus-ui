import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageShell from '@/components/about/AboutPageShell'
import { FadeInView } from '@/components/FadeInView'
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
      <div className="space-y-12">
        {/* Founding metadata — editorial label */}
        <FadeInView delay={0}>
          <p className="font-serif text-base tracking-widest uppercase text-accent/70 border-b border-secondary/15 pb-6">
            Thành lập năm {storyContent.foundedYear} &nbsp;·&nbsp; {storyContent.foundedCity}
          </p>
        </FadeInView>

        {/* Story paragraphs with staggered entrance */}
        {storyContent.paragraphsVi.map((paragraph, i) => (
          <FadeInView key={i} delay={0.1 + i * 0.1}>
            <p className="font-serif text-[17px] md:text-[18px] leading-[1.9] text-secondary">
              {paragraph}
            </p>
          </FadeInView>
        ))}
      </div>
    </AboutPageShell>
  )
}
