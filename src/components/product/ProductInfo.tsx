'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Product, CartItem } from '@/types'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface ProductInfoProps {
  product: Product
}

// TODO: spec 24 — replace with cart store addItem
function addItem(_item: CartItem) {}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter()
  const toast = useToast()

  const [selectedVolume, setSelectedVolume] = useState(product.availableVolumes[0])
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('wishlist')
    if (stored) {
      const list: string[] = JSON.parse(stored) as string[]
      setWishlisted(list.includes(product.id))
    }
  }, [product.id])

  function toggleWishlist() {
    const stored = localStorage.getItem('wishlist')
    const list: string[] = stored ? (JSON.parse(stored) as string[]) : []
    const updated = wishlisted
      ? list.filter((id) => id !== product.id)
      : [...list, product.id]
    localStorage.setItem('wishlist', JSON.stringify(updated))
    setWishlisted(!wishlisted)
  }

  function handleAddToCart() {
    addItem({ product, quantity, selectedVolume })
    toast.success('Added to cart')
  }

  function handleBuyNow() {
    addItem({ product, quantity, selectedVolume })
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-[2rem] leading-tight text-secondary">{product.name}</h1>

      <p className="text-sm leading-relaxed text-gray-600">{product.shortDescription}</p>

      <p className="font-serif font-bold text-[1.75rem] text-accent">{formatPrice(product.price)}</p>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-secondary">Volume</span>
        <div className="flex flex-wrap gap-2">
          {product.availableVolumes.map((vol) => (
            <button
              key={vol}
              onClick={() => setSelectedVolume(vol)}
              className={`px-4 py-2 text-sm font-serif border transition-colors ${
                selectedVolume === vol
                  ? 'border-secondary bg-secondary text-white'
                  : 'border-secondary text-secondary hover:bg-gray-50'
              }`}
            >
              {vol}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-secondary">Quantity</span>
        <div className="flex items-center border border-secondary w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-secondary hover:bg-gray-50 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[3rem] py-2 text-center font-serif text-secondary">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-secondary hover:bg-gray-50 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" className="w-full justify-center" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="secondary" className="w-full justify-center" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>

      <button
        onClick={toggleWishlist}
        className="flex items-center gap-2 text-sm font-serif text-secondary hover:text-accent transition-colors w-fit"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className={`w-5 h-5 transition-colors ${
            wishlisted ? 'fill-accent text-accent' : 'fill-none text-secondary'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  )
}
