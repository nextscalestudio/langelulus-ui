import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug } from '@/data/products'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ScentInfoSection from '@/components/product/ScentInfoSection'
import ProductSpecsSection from '@/components/product/ProductSpecsSection'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} | Parfum`,
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  return (
    <main className="bg-bg py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
        <div className="mt-10 flex flex-col gap-0">
          <ScentInfoSection scentProfile={product.scentProfile} />
          <ProductSpecsSection specs={product.specs} usageGuide={product.usageGuide} />
        </div>
      </div>
    </main>
  )
}
