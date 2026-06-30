'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { galleryImages } from '@/data/gallery'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function LifestyleGallery() {
  const t = useTranslations('home.gallery')

  return (
    <section className="section-padding bg-bg pb-30">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Lifestyle
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
          className="columns-2 md:columns-3 gap-4 md:gap-6"
        >
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.src}
              variants={scaleIn}
              className="group relative break-inside-avoid mb-4 md:mb-6 overflow-hidden rounded-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.02]"
              />

              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <p className="font-sans text-sm text-white text-center px-6">{image.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
