'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const rawPathname = usePathname()

  function switchLocale(next: string) {
    const localePattern = new RegExp(`^/(${routing.locales.join('|')})(\/|$)`)
    const stripped = rawPathname.replace(localePattern, '/') || '/'
    window.location.href = `/${next}${stripped === '/' ? '' : stripped}`
  }

  return (
    <div className="flex items-center gap-1 font-serif text-sm" aria-label="Language switcher">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-secondary/40" aria-hidden="true">/</span>}
          <button
            onClick={() => switchLocale(l)}
            className={`transition-colors ${
              locale === l
                ? 'text-accent font-bold'
                : 'text-secondary hover:text-accent'
            }`}
            aria-current={locale === l ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
