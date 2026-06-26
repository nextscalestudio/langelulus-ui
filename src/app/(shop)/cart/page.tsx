'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cart-store'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/ui/Button'
import coupons from '@/data/coupons'

const fmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

function calcSubtotal(items: ReturnType<typeof useCartStore.getState>['items']) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

function calcDiscount(
  subtotal: number,
  coupon: ReturnType<typeof useCartStore.getState>['coupon']
) {
  if (!coupon) return 0
  if (coupon.discountType === 'percentage') {
    return Math.round(subtotal * (coupon.discountValue / 100))
  }
  return coupon.discountValue
}

export default function CartPage() {
  const router = useRouter()
  const toast = useToast()

  const items = useCartStore((s) => s.items)
  const coupon = useCartStore((s) => s.coupon)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const removeCoupon = useCartStore((s) => s.removeCoupon)

  const [couponInput, setCouponInput] = useState('')

  useEffect(() => {
    if (items.length === 0) router.replace('/products')
  }, [items.length, router])

  const subtotal = calcSubtotal(items)
  const discount = calcDiscount(subtotal, coupon)
  const total = subtotal - discount

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    const now = new Date()
    const found = coupons.find((c) => c.code === code)

    const isValid =
      found &&
      (!found.expiresAt || new Date(found.expiresAt) > now) &&
      (!found.minOrderValue || subtotal >= found.minOrderValue)

    if (!isValid) {
      toast.error('Invalid or expired coupon code')
      return
    }

    applyCoupon(found)
    setCouponInput('')
  }

  if (items.length === 0) return null

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-secondary mb-10">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-5 lg:gap-12">
        {/* Items column */}
        <div className="lg:col-span-3">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVolume}`}
                className="flex gap-4 py-6"
              >
                <div className="relative w-[100px] h-[100px] shrink-0 overflow-hidden border border-gray-200">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-base text-secondary leading-snug">
                    {item.product.name}
                  </p>
                  <p className="font-serif text-sm text-gray-500 mt-0.5">{item.selectedVolume}</p>
                  <p className="font-serif font-bold text-accent mt-1">
                    {fmt.format(item.product.price)}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedVolume, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 text-secondary hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-serif text-sm">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedVolume, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 text-secondary hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between shrink-0">
                  <p className="font-serif font-bold text-accent">
                    {fmt.format(item.product.price * item.quantity)}
                  </p>
                  <button
                    aria-label={`Remove ${item.product.name}`}
                    onClick={() =>
                      updateQuantity(item.product.id, item.selectedVolume, 0)
                    }
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="mt-6">
            {coupon ? (
              <div className="flex items-center justify-between gap-3 p-3 bg-green-50 border border-green-200">
                <span className="font-serif text-sm text-green-700">
                  Coupon <strong>{coupon.code}</strong> applied —{' '}
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% off`
                    : fmt.format(coupon.discountValue) + ' off'}
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-gray-500 hover:text-red-500 transition-colors font-serif underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  placeholder="Coupon code"
                  className="flex-1 border border-secondary px-3 py-2 font-serif text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <Link
              href="/products"
              className="font-serif text-sm text-secondary hover:text-accent underline underline-offset-2 transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2 mt-10 lg:mt-0">
          <div className="border border-gray-200 p-6">
            <h2 className="font-serif font-bold text-lg text-secondary mb-4">Order Summary</h2>

            <div className="space-y-3 font-serif text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-secondary">{fmt.format(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>− {fmt.format(discount)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-200 pt-3 font-bold text-base">
                <span className="text-secondary">Total</span>
                <span className="text-secondary">{fmt.format(total)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full mt-6"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
