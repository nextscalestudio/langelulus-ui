'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { useUIStore } from '@/lib/store/ui-store'
import { useCartStore } from '@/lib/store/cart-store'
import CartDrawerItem from './CartDrawerItem'

const fmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

function subtotal(items: ReturnType<typeof useCartStore.getState>['items']) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export default function CartDrawer() {
  const t = useTranslations('cart')
  const isOpen = useUIStore((s) => s.isCartOpen)
  const closeCart = useUIStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[105] bg-black/40 backdrop-blur-[2px]"
            onClick={closeCart}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[110] h-full w-full max-w-sm bg-gradient-to-b from-white to-gray-50/40 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-gray-100">
          <h2 className="font-serif font-bold text-xl tracking-wide text-secondary">{t('title')}</h2>
          <button
            aria-label="Close cart"
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all duration-200 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <p className="font-serif text-secondary text-base">{t('empty')}</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="font-serif text-sm text-accent underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                {t('continueShopping')}
              </Link>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedVolume}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <CartDrawerItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <span className="font-serif font-bold text-base text-secondary">{t('subtotal')}</span>
              <span className="font-serif font-bold text-base text-secondary">
                {fmt.format(subtotal(items))}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-secondary to-gray-800 text-white font-serif font-bold py-3.5 text-sm rounded-[10px] hover:shadow-lg hover:shadow-black/20 hover:from-gray-900 hover:to-secondary transition-all duration-300"
            >
              {t('checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
