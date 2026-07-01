import { Link } from '@/i18n/navigation'
import type { BlogPost } from '@/types'
import { getTranslations } from 'next-intl/server'

interface BlogSidebarProps {
  latestPosts: BlogPost[]
  categories: string[]
  activeCategory: string
}

export default async function BlogSidebar({ latestPosts, categories, activeCategory }: BlogSidebarProps) {
  const t = await getTranslations('blog')
  return (
    <aside className="w-[280px] shrink-0 hidden lg:block space-y-12">
      <div>
        <h2 className="font-serif text-xs tracking-[0.2em] uppercase text-secondary/40 border-b border-gray-100 pb-3 mb-6">
          {t('latestPosts')}
        </h2>
        <ul className="space-y-4">
          {latestPosts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="font-serif text-[15px] text-secondary hover:text-accent underline-offset-2 hover:underline transition-all duration-200 line-clamp-2 leading-snug"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-serif text-xs tracking-[0.2em] uppercase text-secondary/40 border-b border-gray-100 pb-3 mb-6">
          {t('categories')}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`font-serif text-xs px-3 py-1.5 rounded-[8px] border transition-all duration-200 ${
              !activeCategory
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
              className={`font-serif text-xs px-3 py-1.5 rounded-[8px] border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-accent text-accent bg-accent/[0.05]'
                  : 'border-gray-200 text-secondary hover:border-gray-400'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
