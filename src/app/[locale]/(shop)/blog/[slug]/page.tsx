import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import blogPosts, { getPostBySlug } from '@/data/blog-posts'
import Badge from '@/components/ui/Badge'
import PostCard from '@/components/blog/PostCard'
import TableOfContents, { parseToc } from '@/components/blog/TableOfContents'
import CommentSection from '@/components/blog/CommentSection'
import ShareButtons from '@/components/blog/ShareButtons'
import { FadeInView } from '@/components/FadeInView'

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | L'Angelulus`,
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
      {/* Hero — full-bleed, tall */}
      <div className="relative w-full h-[480px] md:h-[640px]">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Soft gradient fade into page background */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-[60px] lg:py-[120px]">
        <div className="flex gap-12">
          {/* TOC — desktop sticky, mobile collapsible */}
          <TableOfContents items={tocItems} />

          {/* Article */}
          <FadeInView className="flex-1 min-w-0">
            <article>
              <Badge className="mb-5">{post.category}</Badge>

              <h1 className="font-serif font-bold text-secondary text-[40px] md:text-[64px] leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta row */}
              <p className="font-serif text-[14px] text-gray-400 mb-8 tracking-wide">
                L&apos;Angelulus Editorial · {publishedDate} · {post.readTime} min read
              </p>

              {/* Share buttons */}
              <ShareButtons url={pageUrl} title={post.title} />

              {/* Article body */}
              <div className="mt-10 max-w-prose space-y-6">
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
                        className="font-serif font-bold text-secondary text-2xl md:text-3xl mt-12 mb-2 scroll-mt-24"
                      >
                        {text}
                      </h2>
                    )
                  }
                  return (
                    <p
                      key={i}
                      className="font-serif text-secondary/80"
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
          </FadeInView>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <FadeInView>
            <section className="mt-24 pt-16 border-t border-gray-100">
              <p className="font-serif text-xs tracking-[0.2em] uppercase text-secondary/40 mb-3">
                Continue Reading
              </p>
              <h2 className="font-serif font-bold text-secondary text-3xl mb-12">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          </FadeInView>
        )}
      </div>
    </div>
  )
}
