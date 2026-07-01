'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="border border-gray-100 rounded-[12px] p-8 shadow-sm bg-gradient-to-b from-white to-gray-50/60"
    >
      <h2 className="font-serif font-bold text-2xl tracking-wide text-secondary mb-6">Order Summary</h2>

      <ul className="divide-y divide-gray-100 mb-6">
        {items.map((item) => (
          <li
            key={`${item.product.id}-${item.selectedVolume}`}
            className="flex gap-4 py-4"
          >
            <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-[8px] border border-gray-100">
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
              <p className="font-serif text-xs text-gray-400 mt-1 tracking-wide">
                {item.selectedVolume} × {item.quantity}
              </p>
            </div>
            <p className="font-serif font-bold text-sm text-secondary shrink-0">
              {fmt.format(item.product.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="space-y-3 font-serif text-sm border-t border-gray-100 pt-5">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-secondary">{fmt.format(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-gray-500">
            <span>Discount{coupon ? ` (${coupon.code})` : ''}</span>
            <span>− {fmt.format(discount)}</span>
          </div>
        )}

        <div className="flex justify-between border-t border-gray-100 pt-4 font-bold text-base">
          <span className="text-secondary">Total</span>
          <span className="text-secondary">{fmt.format(total)}</span>
        </div>
      </div>
    </motion.div>
  )
}
