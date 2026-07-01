'use client'

import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart-store'
import type { CartItem } from '@/types'

interface Props {
  item: CartItem
}

const fmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

export default function CartDrawerItem({ item }: Props) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  const { product, quantity, selectedVolume } = item

  return (
    <div className="flex gap-5 py-6 border-b border-gray-100 last:border-b-0">
      <div className="relative w-20 h-20 shrink-0 rounded-[8px] border border-gray-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif text-base text-secondary leading-snug line-clamp-2">{product.name}</p>
          <button
            aria-label="Remove item"
            onClick={() => updateQuantity(product.id, selectedVolume, 0)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-secondary hover:bg-gray-100 transition-all duration-200 shrink-0 text-lg leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-1 tracking-wide">{selectedVolume}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-0.5">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(product.id, selectedVolume, quantity - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-l-[8px] border border-gray-200 text-secondary hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-serif border-y border-gray-200 h-7 flex items-center justify-center">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateQuantity(product.id, selectedVolume, quantity + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-r-[8px] border border-gray-200 text-secondary hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
            >
              +
            </button>
          </div>

          <p className="font-serif font-bold text-sm text-secondary">
            {fmt.format(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}
