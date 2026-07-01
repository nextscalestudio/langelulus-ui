'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeUp, scaleIn } from '@/lib/animations'

export default function BrandIntro() {
  const t = useTranslations('home.brandIntro')

  return (
    <section className="section-padding bg-bg-elevated">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl"
        >
          <Image
            src="/images/brand-intro.jpg"
            alt="L'Angelulus brand story"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="lg:py-8"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-6">
            Our Story
          </p>
          <h2 className="font-display font-light text-display-md text-secondary mb-8 leading-snug">
            {t('tagline')}
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary/70 leading-[1.9] mb-6">
            {t('body1')}
          </p>
          <p className="font-sans text-sm md:text-base text-secondary/70 leading-[1.9]">
            {t('body2')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
