'use client'

import { useEffect, useRef, useState } from 'react'
import { testimonials } from '@/data/testimonials'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-accent' : 'text-white/30'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observers: IntersectionObserver[] = []

    container.querySelectorAll<HTMLElement>('[data-card-index]').forEach((card) => {
      const idx = Number(card.dataset.cardIndex)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx)
        },
        { root: container, threshold: 0.5 }
      )
      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  function scrollToCard(index: number) {
    const container = scrollRef.current
    if (!container) return
    const card = container.querySelector<HTMLElement>(`[data-card-index="${index}"]`)
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <section className="bg-secondary py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-[36px] text-white text-center mb-12">
          What Our Customers Say
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              data-card-index={i}
              className="flex-none w-[80vw] max-w-sm snap-start rounded-lg p-8 border bg-white/5 border-white/10"
            >
              <StarRating rating={t.rating} />
              <blockquote className="font-serif italic text-[16px] text-white leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer>
                <p className="font-serif font-bold text-[14px] text-accent">{t.author}</p>
                <p className="font-serif text-[13px] text-white/50 mt-1">{t.product}</p>
              </footer>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIndex ? 'bg-accent' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
