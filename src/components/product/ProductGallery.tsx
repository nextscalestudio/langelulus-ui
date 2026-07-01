'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-square rounded-2xl border border-border overflow-hidden group bg-bg-subtle">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all duration-300 ${
                i === activeIndex
                  ? 'border-secondary opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <Image
                src={src}
                alt={`${name} view ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
