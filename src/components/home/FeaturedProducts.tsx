'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'
import products from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import Button from '@/components/ui/Button'
import { fadeUp, staggerContainer } from '@/lib/animations'

const featured: Product[] = products.filter((p) => p.isFeatured).slice(0, 6)

export default function FeaturedProducts() {
  return (
    <section className="bg-bg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif text-[36px] text-secondary text-center mb-2"
        >
          Featured Fragrances
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif text-[16px] text-accent text-center mb-10"
        >
          Handpicked signatures for every occasion
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {featured.map((product: Product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 flex justify-center">
          <Link href="/products">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
