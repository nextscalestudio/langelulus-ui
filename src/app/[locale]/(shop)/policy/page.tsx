import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { policies } from '@/data/policies'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('policyTitle') }
}

export default function PolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <p className="font-serif text-[13px] text-gray-500 mb-10">Last Updated: January 2025</p>

      <div className="flex gap-16">
        {/* Sticky TOC — hidden on mobile */}
        <aside className="hidden lg:block w-60 shrink-0">
          <nav aria-label="Policy sections" className="sticky top-8">
            <ul className="space-y-3">
              {policies.map((policy) => (
                <li key={policy.id}>
                  <a
                    href={`#${policy.id}`}
                    className="font-serif text-sm text-gray-500 hover:text-accent hover:font-bold transition-colors block"
                  >
                    {policy.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Policy content */}
        <div className="flex-1 min-w-0">
          {policies.map((policy, index) => (
            <section key={policy.id} id={policy.id}>
              {index > 0 && <div className="border-t border-gray-200 my-8" />}
              <h2 className="font-serif text-[24px] text-secondary mb-4">{policy.title}</h2>
              {policy.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-serif text-base text-secondary leading-[1.8] mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
