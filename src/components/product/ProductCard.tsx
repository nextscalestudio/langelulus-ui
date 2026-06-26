'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import StarRating from './StarRating'

const formatVND = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const toast = useToast()

  function handleAddToCart() {
    // TODO: wire cart store addItem() in spec 24
    toast.success('Added to cart')
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border border-[#e5e7eb] bg-white transition-all hover:-translate-y-1 hover:shadow-md"
      aria-label={product.name}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Badge>Out of Stock</Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-serif text-[16px] text-secondary leading-snug">{product.name}</p>
        <StarRating rating={product.rating} />
        <p className="font-serif font-bold text-accent">{formatVND(product.price)}</p>

        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-1"
        >
          <Button
            variant="primary"
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
