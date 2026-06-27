import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/home/HeroSection'
import PromoStrip from '@/components/home/PromoStrip'
import BrandIntro from '@/components/home/BrandIntro'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CollectionsSection from '@/components/home/CollectionsSection'
import ScentStories from '@/components/home/ScentStories'
import Testimonials from '@/components/home/Testimonials'
import FeaturedArticles from '@/components/home/FeaturedArticles'
import LifestyleGallery from '@/components/home/LifestyleGallery'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  }
}

export default function HomePage() {
  return (
    <main>
      <PromoStrip />
      <HeroSection />
      <BrandIntro />
      <WhyChooseUs />
      <FeaturedProducts />
      <CollectionsSection />
      <ScentStories />
      <Testimonials />
      <FeaturedArticles />
      <LifestyleGallery />
    </main>
  )
}
