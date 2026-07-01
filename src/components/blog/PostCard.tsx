'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/types'

interface PostCardProps {
  post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-secondary/10">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="mt-5">
          <span className="inline-block text-xs font-serif text-accent border border-accent/40 bg-accent/[0.04] px-2.5 py-0.5 rounded-[6px]">
            {post.category}
          </span>

          <h3 className="mt-3 font-serif text-secondary text-[17px] font-bold leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {post.title}
          </h3>

          <p className="mt-2 font-serif text-secondary/60 text-[15px] line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <p className="mt-3 font-serif text-gray-400 text-xs tracking-[0.1em] uppercase">{date}</p>
        </div>
      </Link>
    </motion.div>
  )
}
