'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { scentStories } from '@/data/scent-stories'
import { fadeUp, scaleIn } from '@/lib/animations'
import SectionDivider from '@/components/ui/SectionDivider'

export default function ScentStories() {
  const t = useTranslations('home.scentStories')

  return (
    <section className="section-padding bg-bg-elevated">
      <div className="section-container">
        <SectionDivider />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-16 mb-20 md:mb-28 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Editorial
          </p>
          <h2 className="font-display font-light text-display-md text-secondary">
            {t('heading')}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-36">
          {scentStories.map((story, index) => {
            const imageBlock = (
              <motion.div
                key={`img-${story.productSlug}`}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            )

            const textBlock = (
              <div key={`text-${story.productSlug}`} className="lg:py-8">
                <h3 className="font-display font-light text-display-md text-secondary mb-6 leading-snug">
                  {story.title}
                </h3>
                <p className="font-sans text-sm text-secondary/60 leading-[1.9] mb-8">
                  {story.body}
                </p>
                <Link href={`/products/${story.productSlug}`} className="text-link">
                  {t('readMore')} →
                </Link>
              </div>
            )

            return (
              <motion.div
                key={story.productSlug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
              >
                {index % 2 === 0 ? (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    <div className="lg:order-2">{imageBlock}</div>
                    <div className="lg:order-1">{textBlock}</div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
