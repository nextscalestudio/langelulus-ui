'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Product } from '@/types'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import StarRating from './StarRating'
import { useCartStore } from '@/lib/store/cart-store'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const formatVND = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('product')
  const toast = useToast()
  const addItem = useCartStore((state) => state.addItem)

  function handleAddToCart() {
    addItem(product, product.availableVolumes[0])
    toast.success(t('addedToCart'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      aria-label={product.name}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bg-subtle mb-5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 backdrop-blur-[2px]">
            <Badge>{t('outOfStock')}</Badge>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-luxury"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="secondary"
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="w-full"
          >
            {t('addToCart')}
          </Button>
        </div>
      </div>

      <div className="px-1">
        <p className="font-serif text-xs text-secondary/40 tracking-wide uppercase mb-1">
          {product.brand}
        </p>
        <p className="font-serif text-sm text-secondary leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
          {product.name}
        </p>
        <div className="flex items-center justify-between gap-2">
          <StarRating rating={product.rating} />
          <p className="font-serif text-sm text-secondary">
            {formatVND(product.price)}
          </p>
        </div>
      </div>
    </Link>
    </motion.div>
  )
}
