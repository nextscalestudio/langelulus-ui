import HeroSection from '@/components/home/HeroSection'
import PromoStrip from '@/components/home/PromoStrip'
import BrandIntro from '@/components/home/BrandIntro'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CollectionsSection from '@/components/home/CollectionsSection'

export default function HomePage() {
  return (
    <main>
      <PromoStrip />
      <HeroSection />
      <BrandIntro />
      <WhyChooseUs />
      <FeaturedProducts />
      <CollectionsSection />
    </main>
  )
}
