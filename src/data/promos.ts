interface PromoItem {
  message: string
  code?: string
}

export const promos: PromoItem[] = [
  { message: 'Free shipping on orders over 500,000 VND', code: 'FREESHIP' },
  { message: 'Use code PARFUM10 for 10% off your first order', code: 'PARFUM10' },
  { message: 'New arrivals every Friday — follow us for early access' },
]
