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
