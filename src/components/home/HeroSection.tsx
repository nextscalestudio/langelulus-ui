'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { fadeIn, slideUp } from '@/lib/animations'

export default function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-end overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Luxury perfume background"
        fill
        priority
        className="object-cover scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent" />

      <div className="relative z-10 w-full section-padding pb-16 md:pb-24">
        <div className="section-container">
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="font-sans text-xs md:text-sm text-white/60 tracking-[0.2em] uppercase mb-6"
          >
            L&apos;ANGELULUS
          </motion.p>
          <motion.h1
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="font-display font-light text-display-xl text-white max-w-4xl mb-6"
          >
            {t('heading')}
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="font-sans text-base md:text-lg text-white/70 max-w-xl mb-10 leading-relaxed"
          >
            {t('subheading')}
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/products">
              <Button variant="primary" size="lg">{t('cta')}</Button>
            </Link>
            <Link href="/about/story" className="text-link text-white/80 hover:text-white">
              {t('learnMore')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
