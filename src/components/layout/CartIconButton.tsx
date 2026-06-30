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
      className="relative flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
          className="absolute -top-2 -right-2 flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full w-[18px] h-[18px]"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  )
}
