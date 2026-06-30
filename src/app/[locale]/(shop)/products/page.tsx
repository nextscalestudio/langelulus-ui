import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { SortOption } from '@/types'
import products from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import SortSelect from '@/components/product/SortSelect'
import ProductFilters from '@/components/product/ProductFilters'
import FilterDrawer from '@/components/product/FilterDrawer'
import ActiveFilters from '@/components/product/ActiveFilters'
import Skeleton from '@/components/ui/Skeleton'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('productsTitle') }
}

interface SearchParams {
  category?: string
  collection?: string
  sort?: string
  q?: string
  priceMin?: string
  priceMax?: string
  family?: string
}

function applyFiltersAndSort(params: SearchParams) {
  const sort = (params.sort ?? 'default') as SortOption
  let result = [...products]

  if (params.category) {
    const cat = params.category.toLowerCase()
    result = result.filter(p => p.category.toLowerCase() === cat)
  }

  if (params.collection) {
    const col = params.collection.toLowerCase()
    result = result.filter(p => p.collection?.toLowerCase() === col)
  }

  if (params.family) {
    const fam = params.family.toLowerCase()
    result = result.filter(p => p.scentProfile.family.toLowerCase() === fam)
  }

  if (params.priceMin) {
    const min = Number(params.priceMin)
    result = result.filter(p => p.price >= min)
  }

  if (params.priceMax) {
    const max = Number(params.priceMax)
    result = result.filter(p => p.price <= max)
  }

  if (params.q) {
    const q = params.q.toLowerCase()
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    )
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      result.reverse()
      break
  }

  return { filtered: result, sort }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { filtered, sort } = applyFiltersAndSort(searchParams)
  const t = await getTranslations('product')

  return (
    <main className="section-padding bg-bg pt-16 md:pt-20">
      <div className="section-container">
        <h1 className="font-display font-light text-display-md text-secondary mb-3">{t('allProducts')}</h1>
        <p className="font-sans text-sm text-muted mb-10">{t('showing', { count: filtered.length })}</p>

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <Suspense fallback={<Skeleton className="h-9 w-28" />}>
            <FilterDrawer products={products} />
          </Suspense>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-20">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <ProductFilters products={products} />
            </Suspense>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
              <Suspense fallback={null}>
                <ActiveFilters />
              </Suspense>
              <div className="ml-auto">
                <Suspense fallback={<Skeleton className="h-10 w-48" />}>
                  <SortSelect current={sort} />
                </Suspense>
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 py-20">{t('noProducts')}</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
