import products from '@/data/products'
import ProductCard from './ProductCard'
import type { Product } from '@/types'
import { getTranslations } from 'next-intl/server'

interface RelatedProductsProps {
  current: Product
}

interface RowProps {
  title: string
  items: Product[]
}

function Row({ title, items }: RowProps) {
  if (items.length === 0) return null
  return (
    <div>
      <h3 className="font-serif font-light text-2xl lg:text-3xl text-secondary mb-8">{title}</h3>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
        {items.map((product) => (
          <div key={product.id} className="w-64 flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function RelatedProducts({ current }: RelatedProductsProps) {
  const t = await getTranslations('product.related')

  const byFamily = products
    .filter((p) => p.scentProfile.family === current.scentProfile.family && p.id !== current.id)
    .slice(0, 6)

  const byCollection = products
    .filter((p) => p.collection !== undefined && p.collection === current.collection && p.id !== current.id)
    .slice(0, 6)

  const frequentlyBought = products
    .filter((p) => current.relatedProductIds.includes(p.id))
    .slice(0, 6)

  if (byFamily.length === 0 && byCollection.length === 0 && frequentlyBought.length === 0) {
    return null
  }

  return (
    <section className="mt-20 lg:mt-28 flex flex-col gap-16 lg:gap-20">
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />
      <Row title={t('sameFamily')} items={byFamily} />
      <Row title={t('sameCollection')} items={byCollection} />
      <Row title={t('frequentlyBought')} items={frequentlyBought} />
    </section>
  )
}
