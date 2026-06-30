'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { collections } from '@/data/collections'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

const MotionLink = motion(Link)

export default function CollectionsSection() {
  const t = useTranslations('home.collections')
  const [featured, ...rest] = collections

  return (
    <section className="section-padding bg-bg">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Curated
          </p>
          <h2 className="font-display font-light text-display-md text-secondary">
            {t('heading')}
          </h2>
        </motion.div>

        {featured && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-6 md:mb-8"
          >
            <MotionLink
              href={`/products?collection=${featured.slug}`}
              className="group relative block aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl"
              aria-label={`Explore ${featured.name} collection`}
            >
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h3 className="font-display font-light text-display-md text-white mb-2">
                  {featured.name}
                </h3>
                <span className="text-link text-white/80 group-hover:text-white">
                  {t('explore')} →
                </span>
              </div>
            </MotionLink>
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {rest.map((collection) => (
            <MotionLink
              key={collection.slug}
              variants={fadeUp}
              href={`/products?collection=${collection.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl block"
              aria-label={`Explore ${collection.name} collection`}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-display text-2xl text-white font-light mb-1">
                  {collection.name}
                </h3>
                <span className="font-sans text-xs text-white/70 tracking-wide uppercase">
                  {t('explore')}
                </span>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
