'use client'

import { useState } from 'react'
import StarRating from './StarRating'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const formattedDate = new Date(review.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <div className="border-b border-[#e5e7eb] py-4 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif font-bold text-sm text-secondary">{review.author}</p>
            <p className="font-serif text-xs text-gray-500 mt-0.5">{formattedDate}</p>
          </div>
          <StarRating rating={review.rating} />
        </div>
        <p className="font-serif text-[15px] leading-[1.7] text-secondary mt-2">{review.comment}</p>
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {review.images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxSrc(src)}
                className="w-[60px] h-[60px] overflow-hidden border border-[#e5e7eb] flex-shrink-0"
                aria-label={`View photo ${i + 1}`}
              >
                {/* base64 data URIs are not supported by next/image optimization */}
                <img src={src} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 cursor-pointer"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div
            className="relative max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxSrc}
              alt="Review photo enlarged"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <button
              type="button"
              onClick={() => setLightboxSrc(null)}
              className="absolute top-2 right-2 bg-black/60 text-white text-lg w-8 h-8 flex items-center justify-center"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
