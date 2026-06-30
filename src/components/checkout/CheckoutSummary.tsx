'use client'

import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart-store'
import { getSubtotal, getDiscount, getTotal } from '@/lib/store/cart-helpers'

const fmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

export default function CheckoutSummary() {
  const items = useCartStore((s) => s.items)
  const coupon = useCartStore((s) => s.coupon)

  const subtotal = getSubtotal(items)
  const discount = getDiscount(subtotal, coupon)
  const total = getTotal(subtotal, discount)

  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-serif font-bold text-lg text-secondary mb-4">Order Summary</h2>

      <ul className="divide-y divide-gray-200 mb-4">
        {items.map((item) => (
          <li
            key={`${item.product.id}-${item.selectedVolume}`}
            className="flex gap-3 py-3"
          >
            <div className="relative w-14 h-14 shrink-0 overflow-hidden border border-gray-200">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm text-secondary leading-snug line-clamp-2">
                {item.product.name}
              </p>
              <p className="font-serif text-xs text-gray-500 mt-0.5">
                {item.selectedVolume} × {item.quantity}
              </p>
            </div>
            <p className="font-serif font-bold text-sm text-accent shrink-0">
              {fmt.format(item.product.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="space-y-2 font-serif text-sm border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-secondary">{fmt.format(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount{coupon ? ` (${coupon.code})` : ''}</span>
            <span>− {fmt.format(discount)}</span>
          </div>
        )}

        <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-base">
          <span className="text-secondary">Total</span>
          <span className="text-secondary">{fmt.format(total)}</span>
        </div>
      </div>
    </div>
  )
}
