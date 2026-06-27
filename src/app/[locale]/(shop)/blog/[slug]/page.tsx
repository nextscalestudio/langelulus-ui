import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import blogPosts, { getPostBySlug } from '@/data/blog-posts'
import Badge from '@/components/ui/Badge'
import PostCard from '@/components/blog/PostCard'
import TableOfContents, { parseToc } from '@/components/blog/TableOfContents'
import CommentSection from '@/components/blog/CommentSection'
import ShareButtons from '@/components/blog/ShareButtons'

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Parfum`,
    description: post.description,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const tocItems = parseToc(post.content)

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/blog/${post.slug}`

  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <div className="relative w-full aspect-video max-h-80">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* TOC — desktop sticky, mobile collapsible */}
          <TableOfContents items={tocItems} />

          {/* Article */}
          <article className="flex-1 min-w-0">
            <Badge className="mb-4">{post.category}</Badge>

            <h1
              className="font-serif font-bold text-[#000000] leading-tight mb-4"
              style={{ fontSize: '40px' }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <p className="font-serif text-[14px] text-[#6b7280] mb-6">
              Parfum Editorial · {publishedDate} · {post.readTime} min read
            </p>

            {/* Share buttons */}
            <ShareButtons url={pageUrl} title={post.title} />

            {/* Article body */}
            <div className="mt-8 max-w-prose space-y-5">
              {paragraphs.map((para, i) => {
                if (/^##\s+/.test(para)) {
                  const text = para.replace(/^##\s+/, '').trim()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                  return (
                    <h2
                      key={i}
                      id={id}
                      className="font-serif font-bold text-secondary text-xl mt-8 scroll-mt-24"
                    >
                      {text}
                    </h2>
                  )
                }
                return (
                  <p
                    key={i}
                    className="font-serif text-secondary"
                    style={{ fontSize: '17px', lineHeight: '1.9' }}
                  >
                    {para}
                  </p>
                )
              })}
            </div>

            {/* Comments */}
            <CommentSection slug={post.slug} />
          </article>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-secondary pt-10">
            <h2 className="font-serif font-bold text-secondary text-xl mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
