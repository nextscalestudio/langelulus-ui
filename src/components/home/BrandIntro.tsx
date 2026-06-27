'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function BrandIntro() {
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
            Scent is memory. We craft yours.
          </p>
          <p className="font-serif text-[16px] text-secondary leading-[1.8] mb-4">
            At Parfum, we believe every fragrance tells a story. Founded by passionate perfumers
            who travelled the world sourcing the finest ingredients, our collection is a love letter
            to the art of fine fragrance.
          </p>
          <p className="font-serif text-[16px] text-secondary leading-[1.8]">
            Each bottle is more than a scent — it&apos;s an invitation to discover who you are.
            Authentic. Refined. Unforgettable.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
