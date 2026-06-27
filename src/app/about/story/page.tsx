import type { Metadata } from 'next'
import AboutPageShell from '@/components/about/AboutPageShell'
import { storyContent } from '@/data/about'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Câu chuyện | Parfum' }
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
