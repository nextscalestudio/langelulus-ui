'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link, useRouter } from '@/i18n/navigation'
import { useCartStore } from '@/lib/store/cart-store'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/ui/Button'
import coupons from '@/data/coupons'
import { useTranslations } from 'next-intl'

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function CartPage() {
  const t = useTranslations('cart')
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
      toast.error(t('invalidCoupon'))
      return
    }

    applyCoupon(found)
    setCouponInput('')
  }

  if (items.length === 0) return null

  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-8 py-[120px] lg:py-[160px]">
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-serif text-6xl lg:text-7xl text-secondary mb-16"
      >
        {t('pageTitle')}
      </motion.h1>

      <div className="lg:grid lg:grid-cols-5 lg:gap-16">
        {/* Items column */}
        <div className="lg:col-span-3">
          <div className="divide-y divide-gray-100">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.selectedVolume}`}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="flex gap-6 py-8"
              >
                <div className="relative w-[110px] h-[110px] shrink-0 overflow-hidden rounded-[8px] border border-gray-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="110px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-base text-secondary leading-snug">
                    {item.product.name}
                  </p>
                  <p className="font-serif text-sm text-gray-400 mt-1 tracking-wide">{item.selectedVolume}</p>
                  <p className="font-serif font-bold text-secondary mt-2">
                    {fmt.format(item.product.price)}
                  </p>

                  <div className="flex items-center gap-0.5 mt-4">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedVolume, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-l-[8px] border border-gray-200 text-secondary hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-serif text-sm border-y border-gray-200 h-8 flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedVolume, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-r-[8px] border border-gray-200 text-secondary hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between shrink-0">
                  <p className="font-serif font-bold text-secondary">
                    {fmt.format(item.product.price * item.quantity)}
                  </p>
                  <button
                    aria-label={`Remove ${item.product.name}`}
                    onClick={() => updateQuantity(item.product.id, item.selectedVolume, 0)}
                    className="text-gray-300 hover:text-secondary transition-all duration-200"
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
              </motion.div>
            ))}
          </div>

          {/* Coupon */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-10"
          >
            {coupon ? (
              <div className="flex items-center justify-between gap-3 p-4 bg-gray-50 border border-gray-200 rounded-[8px]">
                <span className="font-serif text-sm text-secondary">
                  Coupon <strong>{coupon.code}</strong> applied —{' '}
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% off`
                    : fmt.format(coupon.discountValue) + ' off'}
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-gray-400 hover:text-secondary transition-colors font-serif underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-0">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  placeholder={t('couponPlaceholder')}
                  className="flex-1 border border-gray-200 border-r-0 px-4 py-3 font-serif text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary rounded-l-[8px] transition-all duration-200"
                />
                <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>
                  {t('apply')}
                </Button>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/products"
              className="font-serif text-sm text-secondary hover:text-accent underline underline-offset-4 transition-colors"
            >
              {t('backToShopping')}
            </Link>
          </motion.div>
        </div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-2 mt-16 lg:mt-0"
        >
          <div className="border border-gray-100 rounded-[10px] p-8 shadow-sm bg-gradient-to-b from-white to-gray-50/60">
            <h2 className="font-serif font-bold text-2xl text-secondary mb-6">{t('orderSummary')}</h2>

            <div className="space-y-4 font-serif text-base">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('subtotal')}</span>
                <span className="text-secondary">{fmt.format(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>{t('discount')}</span>
                  <span>− {fmt.format(discount)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-100 pt-4 font-bold text-lg">
                <span className="text-secondary">{t('total')}</span>
                <span className="text-secondary">{fmt.format(total)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full mt-8"
              onClick={() => router.push('/checkout')}
            >
              {t('checkout')}
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
