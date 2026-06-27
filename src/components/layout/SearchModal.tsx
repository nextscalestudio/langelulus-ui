'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from '@/i18n/navigation'
import { useUIStore } from '@/lib/store/ui-store'
import products from '@/data/products'
import blogPosts from '@/data/blog-posts'

type SearchResultType = 'product' | 'blog' | 'page'

interface SearchResult {
  type: SearchResultType
  title: string
  subtitle?: string
  href: string
  image?: string
}

const STATIC_PAGES: SearchResult[] = [
  { type: 'page', title: 'About', href: '/about' },
  { type: 'page', title: 'Contact', href: '/contact' },
  { type: 'page', title: 'Policy', href: '/policy' },
]

const priceFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

function runSearch(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return []

  const productResults: SearchResult[] = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    )
    .slice(0, 4)
    .map((p) => ({
      type: 'product' as const,
      title: p.name,
      subtitle: priceFormatter.format(p.price),
      href: `/products/${p.slug}`,
      image: p.images[0],
    }))

  const blogResults: SearchResult[] = blogPosts
    .filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    )
    .slice(0, 4)
    .map((b) => ({
      type: 'blog' as const,
      title: b.title,
      subtitle: b.category,
      href: `/blog/${b.slug}`,
    }))

  const pageResults: SearchResult[] = STATIC_PAGES.slice(0, 4)

  return [...productResults, ...blogResults, ...pageResults]
}

function ArticleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 text-[#6b7280]"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function PageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 text-[#6b7280]"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

const GROUP_LABELS: Record<SearchResultType, string> = {
  product: 'Products',
  blog: 'Articles',
  page: 'Pages',
}

const GROUP_ORDER: SearchResultType[] = ['product', 'blog', 'page']

export default function SearchModal() {
  const isOpen = useUIStore((s) => s.isSearchOpen)
  const closeSearch = useUIStore((s) => s.closeSearch)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [highlighted, setHighlighted] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setResults([])
      setHighlighted(-1)
    }
  }, [isOpen])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setResults(runSearch(query))
      setHighlighted(-1)
    }, 200)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const navigate = useCallback(
    (href: string) => {
      router.push(href)
      closeSearch()
    },
    [router, closeSearch]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSearch()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, -1))
    } else if (e.key === 'Enter' && highlighted >= 0) {
      navigate(results[highlighted].href)
    }
  }

  if (!isOpen) return null

  const grouped: Record<SearchResultType, SearchResult[]> = {
    product: results.filter((r) => r.type === 'product'),
    blog: results.filter((r) => r.type === 'blog'),
    page: results.filter((r) => r.type === 'page'),
  }

  // Pre-compute flat offsets so each item knows its highlight index
  const offsets: Record<SearchResultType, number> = {
    product: 0,
    blog: grouped.product.length,
    page: grouped.product.length + grouped.blog.length,
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearch()
      }}
    >
      <div className="w-full max-w-2xl">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, articles…"
          className="w-full h-14 bg-white text-secondary font-serif px-6 outline-none"
          style={{ fontSize: '18px', fontFamily: 'Times New Roman, serif' }}
          aria-label="Search"
          autoComplete="off"
        />

        {query.length === 0 && (
          <p className="text-white/60 text-center mt-8 font-serif text-lg">
            Try searching for a product or article
          </p>
        )}

        {query.length >= 2 && results.length === 0 && (
          <p className="text-white/60 text-center mt-8 font-serif text-lg">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {results.length > 0 && (
          <div className="bg-white mt-1">
            {GROUP_ORDER.map((type) => {
              const items = grouped[type]
              if (items.length === 0) return null
              const offset = offsets[type]
              return (
                <div key={type}>
                  <p className="px-4 pt-3 pb-1 text-[12px] uppercase tracking-wider text-[#6b7280]">
                    {GROUP_LABELS[type]}
                  </p>
                  {items.map((item, i) => {
                    const flatIdx = offset + i
                    const isHighlighted = highlighted === flatIdx
                    return (
                      <button
                        key={item.href}
                        onClick={() => navigate(item.href)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                        style={{
                          background: isHighlighted
                            ? 'rgba(255,255,255,0.05)'
                            : undefined,
                        }}
                      >
                        {type === 'product' && item.image ? (
                          <Image
                            src={item.image}
                            alt=""
                            width={40}
                            height={40}
                            className="object-cover flex-shrink-0"
                          />
                        ) : type === 'product' ? (
                          <div className="w-10 h-10 bg-gray-100 flex-shrink-0" />
                        ) : null}
                        {type === 'blog' && <ArticleIcon />}
                        {type === 'page' && <PageIcon />}
                        <div className="min-w-0">
                          <p className="font-serif text-secondary truncate">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-sm text-[#6b7280] truncate">{item.subtitle}</p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
