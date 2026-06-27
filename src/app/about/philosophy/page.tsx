import type { Metadata } from 'next'
import AboutPageShell from '@/components/about/AboutPageShell'
import { philosophyPrinciples } from '@/data/about'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Triết lý | Parfum' }
}

export default function PhilosophyPage() {
  return (
    <AboutPageShell title="Triết lý thương hiệu">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {philosophyPrinciples.map((principle) => (
          <div
            key={principle.id}
            className="border border-secondary/20 p-6"
          >
            <span className="font-serif text-[40px] text-accent/30 leading-none block mb-3">
              {principle.number}
            </span>
            <h2 className="font-serif text-[22px] text-accent mb-3">
              {principle.titleVi}
            </h2>
            <p className="font-serif text-base leading-relaxed text-secondary">
              {principle.descriptionVi}
            </p>
          </div>
        ))}
      </div>
    </AboutPageShell>
  )
}
