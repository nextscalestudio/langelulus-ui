import Image from 'next/image'
import { Link } from '@/i18n/navigation'
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
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-video w-full overflow-hidden bg-secondary/10">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-3">
        <span className="inline-block text-xs font-serif text-white bg-accent px-2 py-0.5">
          {post.category}
        </span>

        <h3 className="mt-2 font-serif text-secondary text-base font-bold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>

        <p className="mt-1 font-serif text-secondary/70 text-sm line-clamp-2">
          {post.description}
        </p>

        <p className="mt-2 font-serif text-secondary/50 text-xs">{date}</p>
      </div>
    </Link>
  )
}
