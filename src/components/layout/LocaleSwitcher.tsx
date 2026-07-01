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
    <div className="flex items-center gap-2 font-sans text-xs tracking-wide" aria-label="Language switcher">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`transition-colors duration-300 ${
            locale === l
              ? 'text-secondary font-medium'
              : 'text-muted hover:text-secondary'
          }`}
          aria-current={locale === l ? 'true' : undefined}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
