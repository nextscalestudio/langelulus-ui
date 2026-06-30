'use client'

import { useEffect, useState } from 'react'
import { getReviewsByProductId } from '@/data/reviews'
import { useToast } from '@/components/ui/Toast'
import Modal from '@/components/ui/Modal'
import StarRating from './StarRating'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import type { NewReviewForm, Review } from '@/types'
import { useTranslations } from 'next-intl'

interface ReviewSectionProps {
  productId: string
}

function computeAvg(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const t = useTranslations('product.reviews')
  const toast = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const staticReviews = getReviewsByProductId(productId)
    const stored = localStorage.getItem(`reviews-${productId}`)
    const localReviews: Review[] = stored ? (JSON.parse(stored) as Review[]) : []
    setReviews([...staticReviews, ...localReviews])
  }, [productId])

  const avgRating = computeAvg(reviews)

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  const handleSubmit = (data: NewReviewForm & { images: string[] }) => {
    const newReview: Review = {
      id: `local-${Date.now()}`,
      productId,
      author: data.author,
      rating: data.rating,
      comment: data.comment,
      images: data.images.length > 0 ? data.images : undefined,
      createdAt: new Date().toISOString(),
    }

    const stored = localStorage.getItem(`reviews-${productId}`)
    const existing: Review[] = stored ? (JSON.parse(stored) as Review[]) : []
    localStorage.setItem(`reviews-${productId}`, JSON.stringify([...existing, newReview]))

    setReviews((prev) => [...prev, newReview])
    setIsFormOpen(false)
    toast.success(t('submitted'))
  }

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl text-secondary mb-6">{t('heading')}</h2>

      <div className="flex flex-col sm:flex-row gap-8 mb-8">
        <div className="flex flex-col items-center justify-center min-w-[120px]">
          <p className="font-serif text-[48px] font-bold text-secondary leading-none">
            {avgRating.toFixed(1)}
          </p>
          <StarRating rating={avgRating} className="mt-2" />
          <p className="font-serif text-sm text-gray-500 mt-1">
            {t('count', { count: reviews.length })}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          {distribution.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="font-serif text-sm text-secondary w-3 text-right">{star}</span>
              <span className="text-sm text-gray-500">★</span>
              <div className="flex-1 h-2 bg-[#e5e7eb] overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{
                    width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : '0%',
                  }}
                />
              </div>
              <span className="font-serif text-sm text-gray-500 w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        className="border border-secondary font-serif text-sm text-secondary px-6 py-2 hover:bg-secondary hover:text-white transition-colors mb-6"
      >
        {t('writeReview')}
      </button>

      <div>
        {reviews.length === 0 ? (
          <p className="font-serif text-sm text-gray-500 py-4">
            {t('noReviews')}
          </p>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={t('modalTitle')}>
        <ReviewForm onSubmit={handleSubmit} onClose={() => setIsFormOpen(false)} />
      </Modal>
    </section>
  )
}
