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
      <h3 className="font-serif font-bold text-xl text-secondary mb-4">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {items.map((product) => (
          <div key={product.id} className="w-56 flex-shrink-0">
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
    <section className="bg-white mt-12 flex flex-col gap-10">
      <Row title={t('sameFamily')} items={byFamily} />
      <Row title={t('sameCollection')} items={byCollection} />
      <Row title={t('frequentlyBought')} items={frequentlyBought} />
    </section>
  )
}
