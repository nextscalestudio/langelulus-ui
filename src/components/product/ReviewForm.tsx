'use client'

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import type { NewReviewForm } from '@/types'
import { useTranslations } from 'next-intl'

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

interface ReviewFormProps {
  onSubmit: (data: NewReviewForm & { images: string[] }) => void
  onClose: () => void
}

export default function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const t = useTranslations('product.reviewForm')
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const result = ev.target?.result
        if (typeof result === 'string') {
          setImages((prev) => [...prev, result])
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!author.trim() || rating === 0 || !comment.trim()) return
    onSubmit({ author: author.trim(), rating, comment: comment.trim(), images })
  }

  const displayRating = hovered || rating
  const isValid = author.trim() !== '' && rating > 0 && comment.trim() !== ''

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="font-serif text-sm text-secondary block mb-1">{t('rating')}</label>
        <div className="flex gap-1" role="group" aria-label="Select rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-8 h-8 transition-colors ${star <= displayRating ? 'text-accent' : 'text-[#e5e7eb]'}`}
                aria-hidden="true"
              >
                <path d={STAR_PATH} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-author" className="font-serif text-sm text-secondary block mb-1">
          {t('name')}
        </label>
        <input
          id="review-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border border-[#e5e7eb] font-serif text-sm text-secondary px-3 py-2 focus:outline-none focus:border-secondary"
          placeholder={t('namePlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="review-comment" className="font-serif text-sm text-secondary block mb-1">
          {t('reviewLabel')}
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className="w-full border border-[#e5e7eb] font-serif text-sm text-secondary px-3 py-2 focus:outline-none focus:border-secondary resize-none"
          placeholder={t('reviewPlaceholder')}
        />
      </div>

      <div>
        <label className="font-serif text-sm text-secondary block mb-1">{t('photos')}</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
          aria-label="Upload review photos"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="border border-[#e5e7eb] font-serif text-sm text-secondary px-4 py-1.5 hover:border-secondary transition-colors"
        >
          {t('addPhotos')}
        </button>
        {images.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((src, i) => (
              <div key={i} className="relative w-[60px] h-[60px]">
                <img
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-full object-cover border border-[#e5e7eb]"
                />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center leading-none"
                  aria-label={`Remove photo ${i + 1}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onClose}
          className="font-serif text-sm text-secondary px-4 py-2 border border-[#e5e7eb] hover:border-secondary transition-colors"
        >
          {t('cancel')}
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="font-serif text-sm bg-secondary text-white px-6 py-2 hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  )
}
