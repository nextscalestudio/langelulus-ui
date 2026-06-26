import Link from 'next/link'
import type { Product } from '@/types'
import products from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import Button from '@/components/ui/Button'

const featured: Product[] = products.filter((p) => p.isFeatured).slice(0, 6)

export default function FeaturedProducts() {
  return (
    <section className="bg-bg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-[36px] text-secondary text-center mb-2">
          Featured Fragrances
        </h2>
        <p className="font-serif text-[16px] text-accent text-center mb-10">
          Handpicked signatures for every occasion
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/products">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
