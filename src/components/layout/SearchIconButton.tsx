'use client'

import { useUIStore } from '@/lib/store/ui-store'

export default function SearchIconButton() {
  const openSearch = useUIStore((state) => state.openSearch)

  return (
    <button
      aria-label="Open search"
      onClick={openSearch}
      className="flex items-center justify-center text-secondary hover:text-accent transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  )
}
