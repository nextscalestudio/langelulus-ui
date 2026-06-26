import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Luxury perfume background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-serif text-[36px] md:text-[64px] text-white leading-tight mb-4">
          Discover Your Signature Scent
        </h1>
        <p className="font-serif text-[20px] text-white/80 mb-8">
          Luxury perfumes crafted for those who dare to be unforgettable
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">Shop Now</Button>
        </Link>
      </div>
    </section>
  )
}
