'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeUp } from '@/lib/animations'

export default function BrandIntro() {
  const t = useTranslations('home.brandIntro')

  return (
    <section className="bg-bg py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square w-full">
          <Image
            src="/images/brand-intro.jpg"
            alt="Parfum brand story"
            fill
            className="object-cover"
          />
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-serif italic text-[28px] text-accent leading-snug mb-6">
            {t('tagline')}
          </p>
          <p className="font-serif text-[16px] text-secondary leading-[1.8] mb-4">
            {t('body1')}
          </p>
          <p className="font-serif text-[16px] text-secondary leading-[1.8]">
            {t('body2')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
