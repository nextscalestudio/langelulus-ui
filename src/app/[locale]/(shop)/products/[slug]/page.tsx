import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug } from '@/data/products'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ScentInfoSection from '@/components/product/ScentInfoSection'
import ProductSpecsSection from '@/components/product/ProductSpecsSection'
import ProductPolicies from '@/components/product/ProductPolicies'
import ReviewSection from '@/components/product/ReviewSection'
import RelatedProducts from '@/components/product/RelatedProducts'
import ProductJsonLd from './_components/ProductJsonLd'

interface PageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.name,
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  return (
    <>
      <ProductJsonLd product={product} />
      <main className="bg-bg section-padding pt-24 lg:pt-36">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
        <div className="mt-20 lg:mt-32 flex flex-col gap-0">
          <ScentInfoSection scentProfile={product.scentProfile} />
          <ProductSpecsSection specs={product.specs} usageGuide={product.usageGuide} />
        </div>
        <div className="mt-20 lg:mt-28">
          <ProductPolicies />
        </div>
        <ReviewSection productId={product.id} />
        <RelatedProducts current={product} />
      </div>
    </main>
    </>
  )
}
