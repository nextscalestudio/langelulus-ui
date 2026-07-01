'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Product } from '@/types'
import products from '@/data/products'
import Button from '@/components/ui/Button'
import StarRating from '@/components/product/StarRating'
import { fadeUp, scaleIn } from '@/lib/animations'

const featured: Product[] = products.filter((p) => p.isFeatured).slice(0, 4)

const formatVND = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

export default function FeaturedProducts() {
  const t = useTranslations('home.featuredProducts')

  return (
    <section className="section-padding bg-bg-elevated">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Collection
          </p>
          <h2 className="font-display font-light text-display-md text-secondary mb-4">
            {t('heading')}
          </h2>
          <p className="font-sans text-sm text-muted leading-relaxed">
            {t('subheading')}
          </p>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {featured.map((product, index) => (
            <motion.article
              key={product.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`}
            >
              <motion.div
                variants={scaleIn}
                className={`relative aspect-[4/5] overflow-hidden rounded-3xl ${
                  index % 2 !== 0 ? 'lg:order-2' : ''
                }`}
              >
                <Link href={`/products/${product.slug}`} className="block w-full h-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </Link>
              </motion.div>

              <div className={`lg:py-8 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted mb-3">
                  {product.brand}
                </p>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-display font-light text-display-md text-secondary mb-4 hover:opacity-70 transition-opacity duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-sans text-sm text-secondary/60 leading-relaxed mb-6 max-w-md">
                  {product.shortDescription}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <StarRating rating={product.rating} />
                  <span className="font-sans text-sm font-medium text-secondary">
                    {formatVND(product.price)}
                  </span>
                </div>
                <Link href={`/products/${product.slug}`} className="text-link">
                  {t('shopProduct')}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 md:mt-28 flex justify-center"
        >
          <Link href="/products">
            <Button variant="outline" size="lg">{t('viewAll')}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
