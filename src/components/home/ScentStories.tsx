'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { scentStories } from '@/data/scent-stories'
import { fadeUp } from '@/lib/animations'

export default function ScentStories() {
  return (
    <section className="bg-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif text-[36px] text-secondary text-center mb-16"
        >
          Scent Stories
        </motion.h2>
        <div className="flex flex-col gap-20">
          {scentStories.map((story, index) => (
            <motion.div
              key={story.productSlug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row gap-10 items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2 relative aspect-square">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif italic text-[28px] text-accent mb-4">
                  {story.title}
                </h3>
                <p className="font-serif text-[16px] text-secondary leading-[1.8] mb-6">
                  {story.body}
                </p>
                <Link
                  href={`/products/${story.productSlug}`}
                  className="font-serif text-accent underline hover:opacity-70 transition-opacity"
                >
                  Read more
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
