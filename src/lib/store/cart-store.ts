import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Coupon, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  coupon: Coupon | null
  addItem: (product: Product, volume: string, quantity?: number) => void
  removeItem: (productId: string, volume: string) => void
  updateQuantity: (productId: string, volume: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,

      addItem: (product, volume, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id && item.selectedVolume === volume
          )
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.selectedVolume === volume
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity, selectedVolume: volume }],
          }
        }),

      removeItem: (productId, volume) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedVolume === volume)
          ),
        })),

      updateQuantity: (productId, volume, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.product.id === productId && item.selectedVolume === volume)
              ),
            }
          }
          return {
            items: state.items.map((item) =>
              item.product.id === productId && item.selectedVolume === volume
                ? { ...item, quantity }
                : item
            ),
          }
        }),

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),
    }),
    {
      name: 'langelulus-cart',
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
)
