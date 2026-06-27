'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import blogPosts from '@/data/blog-posts'
import Badge from '@/components/ui/Badge'
import { fadeUp, staggerContainer } from '@/lib/animations'

const recentPosts = [...blogPosts]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3)

export default function FeaturedArticles() {
  const t = useTranslations('home.featuredArticles')

  return (
    <section className="bg-bg py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif text-[36px] text-secondary text-center mb-12"
        >
          {t('heading')}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {recentPosts.map((post) => (
            <motion.article key={post.id} variants={fadeUp} className="flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden mb-4">
                <div className="relative aspect-video">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="flex flex-col flex-1">
                <Badge className="mb-3 self-start">{post.category}</Badge>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-serif font-bold text-[18px] text-secondary mb-2 hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-[16px] text-gray-500 line-clamp-2 mb-4 flex-1">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-serif text-accent underline hover:opacity-70 transition-opacity self-start"
                >
                  {t('readMore')}
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center font-serif px-5 py-2.5 text-base border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
