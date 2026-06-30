'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { fadeIn } from '@/lib/animations'

export default function HeroSection() {
  const t = useTranslations('home.hero')

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
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="font-serif text-[36px] md:text-[64px] text-white leading-tight mb-4"
        >
          {t('heading')}
        </motion.h1>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="font-serif text-[20px] text-white/80 mb-8"
        >
          {t('subheading')}
        </motion.p>
        <Link href="/products">
          <Button variant="primary" size="lg">{t('cta')}</Button>
        </Link>
      </div>
    </section>
  )
}
