'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square border border-[#e5e7eb] overflow-hidden group">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 h-16 border-2 overflow-hidden flex-shrink-0 transition-colors ${
                i === activeIndex ? 'border-accent' : 'border-[#e5e7eb]'
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
    </div>
  )
}
