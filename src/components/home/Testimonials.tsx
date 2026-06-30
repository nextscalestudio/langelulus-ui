'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { testimonials } from '@/data/testimonials'
import { fadeUp } from '@/lib/animations'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-6" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? 'text-accent' : 'text-secondary/15'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const t = useTranslations('home.testimonials')
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
    <section className="section-padding bg-gradient-section">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Testimonials
          </p>
          <h2 className="font-display font-light text-display-md text-secondary">
            {t('heading')}
          </h2>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 md:-mx-10 md:px-10"
        >
          {testimonials.map((item, i) => (
            <article
              key={item.id}
              data-card-index={i}
              className="flex-none w-[85vw] max-w-md snap-start rounded-3xl p-8 md:p-10 bg-bg-elevated shadow-soft border border-border"
            >
              <StarRating rating={item.rating} />
              <blockquote className="font-display text-lg md:text-xl text-secondary/80 leading-relaxed mb-8 font-light italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer>
                <p className="font-sans text-sm font-medium text-secondary">{item.author}</p>
                <p className="font-sans text-xs text-muted mt-1">{item.product}</p>
              </footer>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-secondary/15'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
