import type { Coupon } from '@/types'

const coupons: Coupon[] = [
  {
    code: 'PARFUM10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 500_000,
    expiresAt: '2024-12-31T23:59:59Z',
  },
  {
    code: 'WELCOME200',
    discountType: 'fixed',
    discountValue: 200_000,
    minOrderValue: 1_000_000,
    expiresAt: '2024-12-31T23:59:59Z',
  },
]

export default coupons
