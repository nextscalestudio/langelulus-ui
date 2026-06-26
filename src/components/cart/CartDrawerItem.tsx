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
    <div className="flex gap-3 py-4 border-b border-gray-200 last:border-b-0">
      <div className="relative w-20 h-20 shrink-0 border border-gray-200 overflow-hidden">
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
          <p className="font-serif text-sm text-secondary leading-snug line-clamp-2">{product.name}</p>
          <button
            aria-label="Remove item"
            onClick={() => updateQuantity(product.id, selectedVolume, 0)}
            className="text-gray-400 hover:text-red-500 transition-colors shrink-0 text-lg leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-0.5">{selectedVolume}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(product.id, selectedVolume, quantity - 1)}
              className="w-7 h-7 flex items-center justify-center border border-gray-300 text-secondary hover:bg-gray-100 transition-colors"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-serif">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateQuantity(product.id, selectedVolume, quantity + 1)}
              className="w-7 h-7 flex items-center justify-center border border-gray-300 text-secondary hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          <p className="font-serif font-bold text-sm text-accent">
            {fmt.format(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}
