import type { CartItem, Coupon } from '@/types'

export function getItemCount(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.quantity, 0)
}

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
}

export function getDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) return 0
  if (coupon.discountType === 'percentage') {
    return Math.round(subtotal * (coupon.discountValue / 100))
  }
  return coupon.discountValue
}

export function getTotal(subtotal: number, discount: number): number {
  return Math.max(0, subtotal - discount)
}
