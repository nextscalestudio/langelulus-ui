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
    <aside className="w-[280px] shrink-0 hidden lg:block space-y-8">
      <div>
        <h2 className="font-serif font-bold text-[16px] text-secondary border-b border-secondary pb-2 mb-4">
          {t('latestPosts')}
        </h2>
        <ul className="space-y-2">
          {latestPosts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="font-serif text-sm text-secondary hover:text-accent transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-serif font-bold text-[16px] text-secondary border-b border-secondary pb-2 mb-4">
          {t('categories')}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`font-serif text-sm px-3 py-1 border transition-colors ${
              !activeCategory
                ? 'bg-accent text-white border-accent'
                : 'border-secondary text-secondary hover:text-accent hover:border-accent'
            }`}
          >
            {t('all')}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`font-serif text-sm px-3 py-1 border transition-colors ${
                activeCategory === cat
                  ? 'bg-accent text-white border-accent'
                  : 'border-secondary text-secondary hover:text-accent hover:border-accent'
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
