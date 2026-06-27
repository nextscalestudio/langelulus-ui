import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import blogPosts from '@/data/blog-posts'
import PostCard from '@/components/blog/PostCard'
import BlogSidebar from '@/components/blog/BlogSidebar'
import { Link } from '@/i18n/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('blogTitle') }
}

const POSTS_PER_PAGE = 6

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, page } = await searchParams

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const featured = sorted[0]
  const categories = Array.from(new Set(sorted.map((p) => p.category)))

  const filtered = category ? sorted.filter((p) => p.category === category) : sorted

  const currentPage = Math.max(1, parseInt(page ?? '1', 10))
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const featuredDate = new Date(featured.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-bg">
      {/* Featured banner */}
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={featured.thumbnail}
          alt={featured.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-7xl mx-auto">
          <span className="font-serif text-white/70 text-xs mb-2">{featuredDate}</span>
          <h1 className="font-serif font-bold text-white text-3xl md:text-[32px] leading-snug max-w-xl">
            {featured.title}
          </h1>
          <Link
            href={`/blog/${featured.slug}`}
            className="mt-3 font-serif text-sm text-white underline hover:text-accent transition-colors"
          >
            Read more
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <Link
            href="/blog"
            className={`font-serif text-sm px-4 py-1.5 shrink-0 transition-colors ${
              !category
                ? 'bg-accent text-white'
                : 'border border-secondary text-secondary hover:text-accent hover:border-accent'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`font-serif text-sm px-4 py-1.5 shrink-0 transition-colors ${
                category === cat
                  ? 'bg-accent text-white'
                  : 'border border-secondary text-secondary hover:text-accent hover:border-accent'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex gap-10">
          {/* Post grid */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <p className="font-serif text-secondary/60 py-12 text-center">No posts found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginated.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1
                  const href = category
                    ? `/blog?category=${encodeURIComponent(category)}&page=${pageNum}`
                    : `/blog?page=${pageNum}`
                  return (
                    <Link
                      key={pageNum}
                      href={href}
                      className={`font-serif text-sm w-9 h-9 flex items-center justify-center border transition-colors ${
                        currentPage === pageNum
                          ? 'bg-accent text-white border-accent'
                          : 'border-secondary text-secondary hover:border-accent hover:text-accent'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar latestPosts={sorted} categories={categories} activeCategory={category ?? ''} />
        </div>
      </div>
    </div>
  )
}
