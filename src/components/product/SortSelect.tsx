'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { SortOption } from '@/types'

interface SortSelectProps {
  current: SortOption
}

const OPTION_KEYS: { value: SortOption; tKey: string }[] = [
  { value: 'default',    tKey: 'default' },
  { value: 'price-asc',  tKey: 'priceAsc' },
  { value: 'price-desc', tKey: 'priceDesc' },
  { value: 'name-asc',   tKey: 'nameAsc' },
  { value: 'newest',     tKey: 'newest' },
]

export default function SortSelect({ current }: SortSelectProps) {
  const t = useTranslations('product.sort')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLabel = OPTION_KEYS.find((o) => o.value === current)
  const label = currentLabel ? t(currentLabel.tKey) : t('default')

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  function select(value: SortOption) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'default') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2.5 font-sans text-sm text-secondary border border-border rounded-[10px] px-4 py-2.5 bg-bg hover:border-secondary/40 hover:shadow-sm transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <div className="nav-dropdown" style={{ left: 'auto', right: 0, transform: 'none' }}>
        <div
          role="listbox"
          className={`nav-dropdown-panel min-w-max ${
            open
              ? 'opacity-100 translate-y-0 visible pointer-events-auto'
              : 'opacity-0 translate-y-2 invisible pointer-events-none'
          }`}
        >
          {OPTION_KEYS.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={current === opt.value}
              onClick={() => select(opt.value)}
              className={`block w-full text-left px-4 py-2.5 font-sans text-sm rounded-xl transition-colors duration-200 ${
                current === opt.value
                  ? 'text-secondary bg-secondary/[0.05] font-medium'
                  : 'text-muted hover:text-secondary hover:bg-secondary/[0.04]'
              }`}
            >
              {t(opt.tKey)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
