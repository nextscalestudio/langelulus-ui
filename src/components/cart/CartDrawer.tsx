'use client'

import { useEffect } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useUIStore } from '@/lib/store/ui-store'
import { useCartStore } from '@/lib/store/cart-store'
import CartDrawerItem from './CartDrawerItem'

const fmt = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

function subtotal(items: ReturnType<typeof useCartStore.getState>['items']) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export default function CartDrawer() {
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
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-serif font-bold text-xl text-secondary">Your Cart</h2>
          <button
            aria-label="Close cart"
            onClick={closeCart}
            className="text-gray-400 hover:text-secondary transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="font-serif text-secondary">Your cart is empty</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="font-serif text-sm text-accent underline underline-offset-2"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartDrawerItem
                  key={`${item.product.id}-${item.selectedVolume}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif font-bold text-base text-secondary">Subtotal</span>
              <span className="font-serif font-bold text-base text-secondary">
                {fmt.format(subtotal(items))}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-accent text-white font-serif font-bold py-3 text-sm hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
