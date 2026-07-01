import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import blogPosts from '@/data/blog-posts'
import PostCard from '@/components/blog/PostCard'
import BlogSidebar from '@/components/blog/BlogSidebar'
import { Link } from '@/i18n/navigation'
import { FadeInView } from '@/components/FadeInView'

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
  const locale = await getLocale()
  const t = await getTranslations('blog')

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const featured = sorted[0]
  const categories = Array.from(new Set(sorted.map((p) => p.category)))

  const filtered = category ? sorted.filter((p) => p.category === category) : sorted

  const currentPage = Math.max(1, parseInt(page ?? '1', 10))
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const featuredDate = new Date(featured.publishedAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-bg">
      {/* Featured hero — full-bleed editorial */}
      <div className="relative w-full h-[480px] md:h-[620px]">
        <Image
          src={featured.thumbnail}
          alt={featured.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-14 md:pb-20 max-w-7xl mx-auto">
          <span className="font-serif text-white/60 text-xs tracking-[0.2em] uppercase mb-4">
            {featuredDate}
          </span>
          <h1 className="font-serif font-bold text-white text-[42px] md:text-[72px] leading-tight max-w-2xl">
            {featured.title}
          </h1>
          <Link
            href={`/blog/${featured.slug}`}
            className="mt-6 inline-block font-serif text-sm text-white border border-white/50 rounded-[8px] px-6 py-2.5 hover:bg-white/10 hover:border-white transition-all duration-300 w-fit"
          >
            {t('readMore')}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-[60px] lg:py-[120px]">
        {/* Category tabs */}
        <FadeInView>
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            <Link
              href="/blog"
              className={`font-serif text-sm px-5 py-2 shrink-0 rounded-[8px] border transition-all duration-200 ${
                !category
                  ? 'border-accent text-accent bg-accent/[0.05]'
                  : 'border-gray-200 text-secondary hover:border-gray-400'
              }`}
            >
              {t('all')}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`font-serif text-sm px-5 py-2 shrink-0 rounded-[8px] border transition-all duration-200 ${
                  category === cat
                    ? 'border-accent text-accent bg-accent/[0.05]'
                    : 'border-gray-200 text-secondary hover:border-gray-400'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </FadeInView>

        <div className="flex gap-12">
          {/* Post grid */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <p className="font-serif text-secondary/60 py-24 text-center text-lg">
                {t('noPostsFound')}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginated.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1
                  const href = category
                    ? `/blog?category=${encodeURIComponent(category)}&page=${pageNum}`
                    : `/blog?page=${pageNum}`
                  return (
                    <Link
                      key={pageNum}
                      href={href}
                      className={`font-serif text-sm w-10 h-10 flex items-center justify-center rounded-[8px] border transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'border-accent text-accent bg-accent/[0.05]'
                          : 'border-gray-200 text-secondary hover:border-gray-400'
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
