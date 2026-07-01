'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import blogPosts from '@/data/blog-posts'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

const recentPosts = [...blogPosts]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3)

export default function FeaturedArticles() {
  const t = useTranslations('home.featuredArticles')
  const [featured, ...rest] = recentPosts

  return (
    <section className="section-padding bg-bg-elevated">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 max-w-2xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Journal
          </p>
          <h2 className="font-display font-light text-display-md text-secondary">
            {t('heading')}
          </h2>
        </motion.div>

        {featured && (
          <motion.article
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20"
          >
            <Link href={`/blog/${featured.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 ease-luxury hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Link>
            <div className="lg:py-4">
              <Badge className="mb-4">{featured.category}</Badge>
              <Link href={`/blog/${featured.slug}`}>
                <h3 className="font-display font-light text-display-md text-secondary mb-4 hover:opacity-70 transition-opacity duration-300">
                  {featured.title}
                </h3>
              </Link>
              <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                {featured.description}
              </p>
              <Link href={`/blog/${featured.slug}`} className="text-link">
                {t('readMore')} →
              </Link>
            </div>
          </motion.article>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16"
        >
          {rest.map((post) => (
            <motion.article key={post.id} variants={fadeUp} className="group">
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-2xl mb-5">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <Badge className="mb-3">{post.category}</Badge>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-sans text-base font-medium text-secondary mb-2 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
              </Link>
              <p className="font-sans text-sm text-muted line-clamp-2">
                {post.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Link href="/blog">
            <Button variant="outline" size="lg">{t('viewAll')}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
