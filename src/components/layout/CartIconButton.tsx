'use client'

import { useCartStore } from '@/lib/store/cart-store'
import { useUIStore } from '@/lib/store/ui-store'
import { getItemCount } from '@/lib/store/cart-helpers'

export default function CartIconButton() {
  const items = useCartStore((state) => state.items)
  const openCart = useUIStore((state) => state.openCart)
  const count = getItemCount(items)

  return (
    <button
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
      onClick={openCart}
      className="relative flex items-center justify-center text-secondary/70 hover:text-secondary transition-colors duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 flex items-center justify-center bg-accent text-white text-[9px] font-medium rounded-full w-4 h-4"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  )
}
