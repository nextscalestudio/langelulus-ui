import type { Metadata } from 'next'
import AboutPageShell from '@/components/about/AboutPageShell'
import { certifications } from '@/data/about'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Chứng nhận | Parfum' }
}

export default function CertificationsPage() {
  return (
    <AboutPageShell title="Chứng nhận">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border border-secondary/20 p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-serif text-[18px] text-accent leading-snug">
                {cert.nameVi}
              </h2>
              <span className="flex-shrink-0 font-serif text-sm font-semibold border border-accent/30 text-accent px-2 py-0.5">
                {cert.year}
              </span>
            </div>
            <p className="font-serif text-sm text-secondary/70 mb-3">
              {cert.issuerVi}
            </p>
            <div className="border-t border-secondary/20 pt-3">
              <p className="font-serif text-sm leading-relaxed text-secondary">
                {cert.descriptionVi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AboutPageShell>
  )
}
