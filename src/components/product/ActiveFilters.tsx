'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function ActiveFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get('category')
  const collection = searchParams.get('collection')
  const priceMin = searchParams.get('priceMin')
  const priceMax = searchParams.get('priceMax')
  const family = searchParams.get('family')
  const q = searchParams.get('q')

  const hasFilters = !!(category || collection || priceMin || priceMax || family || q)

  function removeParam(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  function removePriceRange() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('priceMin')
    params.delete('priceMax')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  function clearAll() {
    router.push(pathname)
  }

  if (!hasFilters) return null

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      {category && (
        <Pill label={`Category: ${category}`} onRemove={() => removeParam('category')} />
      )}
      {collection && (
        <Pill label={`Collection: ${collection}`} onRemove={() => removeParam('collection')} />
      )}
      {family && (
        <Pill label={`Family: ${family}`} onRemove={() => removeParam('family')} />
      )}
      {(priceMin || priceMax) && (
        <Pill label="Price range" onRemove={removePriceRange} />
      )}
      {q && (
        <Pill label={`"${q}"`} onRemove={() => removeParam('q')} />
      )}
      <button
        onClick={clearAll}
        className="text-accent text-[13px] underline underline-offset-2 ml-1"
      >
        Clear All
      </button>
    </div>
  )
}

function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-accent text-bg font-serif text-sm px-3 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:opacity-70 leading-none"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  )
}
