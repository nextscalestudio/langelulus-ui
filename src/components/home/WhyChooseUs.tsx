'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeUp, staggerContainer } from '@/lib/animations'
import SectionDivider from '@/components/ui/SectionDivider'

const REASONS = ['authentic', 'shipping', 'returns', 'expert'] as const

export default function WhyChooseUs() {
  const t = useTranslations('home.whyChooseUs')

  return (
    <section className="section-padding bg-gradient-section">
      <div className="section-container">
        <SectionDivider />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-16 pb-20 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Why Parfum
          </p>
          <h2 className="font-display font-light text-display-md text-secondary">
            {t('heading')}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {REASONS.map((reason) => (
            <motion.div
              key={reason}
              variants={fadeUp}
              className="text-center lg:text-left px-4 lg:px-0"
            >
              <span className="inline-block font-display text-3xl text-accent/30 mb-4">
                {String(REASONS.indexOf(reason) + 1).padStart(2, '0')}
              </span>
              <h3 className="font-sans text-sm font-medium text-secondary mb-3 tracking-wide">
                {t(`${reason}.title`)}
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {t(`${reason}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
