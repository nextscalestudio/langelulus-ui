'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { SortOption } from '@/types'

interface SortSelectProps {
  current: SortOption
}

export default function SortSelect({ current }: SortSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value === 'default') {
      params.delete('sort')
    } else {
      params.set('sort', e.target.value)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="border border-secondary font-serif text-sm px-3 py-2 bg-bg text-secondary focus:outline-none"
    >
      <option value="default">Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name A–Z</option>
      <option value="newest">Newest</option>
    </select>
  )
}
