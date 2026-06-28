'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { Product } from '@/types'
import { useTranslations } from 'next-intl'

interface ProductFiltersProps {
  products: Product[]
}

const formatVND = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

export default function ProductFilters({ products }: ProductFiltersProps) {
  const t = useTranslations('product.filters')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))).sort(),
    [products],
  )
  const collections = useMemo(
    () =>
      Array.from(
        new Set(
          products.map(p => p.collection).filter((c): c is string => c !== undefined),
        ),
      ).sort(),
    [products],
  )
  const families = useMemo(
    () => Array.from(new Set(products.map(p => p.scentProfile.family))).sort(),
    [products],
  )
  const absMin = useMemo(() => Math.min(...products.map(p => p.price)), [products])
  const absMax = useMemo(() => Math.max(...products.map(p => p.price)), [products])

  const currentCategory = searchParams.get('category') ?? ''
  const currentCollection = searchParams.get('collection') ?? ''
  const currentFamily = searchParams.get('family') ?? ''
  const currentPriceMin = Number(searchParams.get('priceMin') ?? absMin)
  const currentPriceMax = Number(searchParams.get('priceMax') ?? absMax)

  const [localMin, setLocalMin] = useState(currentPriceMin)
  const [localMax, setLocalMax] = useState(currentPriceMax)

  function toggleParam(key: string, value: string, current: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (current === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  function applyPriceRange() {
    const params = new URLSearchParams(searchParams.toString())
    if (localMin <= absMin) {
      params.delete('priceMin')
    } else {
      params.set('priceMin', String(localMin))
    }
    if (localMax >= absMax) {
      params.delete('priceMax')
    } else {
      params.set('priceMax', String(localMax))
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const minPercent = ((localMin - absMin) / (absMax - absMin)) * 100
  const maxPercent = ((localMax - absMin) / (absMax - absMin)) * 100

  return (
    <div className="space-y-6">
      <Section title={t('category')}>
        {categories.map(cat => (
          <CheckRow
            key={cat}
            label={cat}
            checked={currentCategory === cat}
            onChange={() => toggleParam('category', cat, currentCategory)}
          />
        ))}
      </Section>

      <Section title={t('collection')}>
        {collections.map(col => (
          <CheckRow
            key={col}
            label={col}
            checked={currentCollection === col}
            onChange={() => toggleParam('collection', col, currentCollection)}
          />
        ))}
      </Section>

      <Section title={t('fragranceFamily')}>
        {families.map(fam => (
          <CheckRow
            key={fam}
            label={fam}
            checked={currentFamily === fam}
            onChange={() => toggleParam('family', fam, currentFamily)}
          />
        ))}
      </Section>

      <Section title={t('priceRange')}>
        <div className="space-y-3">
          {/* Dual-handle slider */}
          <div className="relative h-6 select-none">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full pointer-events-none">
              <div
                className="absolute h-full bg-accent rounded-full"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />
            </div>
            <input
              type="range"
              min={absMin}
              max={absMax}
              step={100000}
              value={localMin}
              onChange={e => {
                const v = Math.min(Number(e.target.value), localMax - 100000)
                setLocalMin(v)
              }}
              onMouseUp={applyPriceRange}
              onTouchEnd={applyPriceRange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: localMin > absMax - 100000 ? 5 : 3 }}
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={absMin}
              max={absMax}
              step={100000}
              value={localMax}
              onChange={e => {
                const v = Math.max(Number(e.target.value), localMin + 100000)
                setLocalMax(v)
              }}
              onMouseUp={applyPriceRange}
              onTouchEnd={applyPriceRange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: 4 }}
              aria-label="Maximum price"
            />
          </div>
          <div className="flex justify-between font-serif text-xs text-gray-500">
            <span>{formatVND(localMin)}</span>
            <span>{formatVND(localMax)}</span>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif font-bold text-sm text-secondary uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-accent w-4 h-4"
      />
      <span className="font-serif text-sm text-secondary">{label}</span>
    </label>
  )
}
