'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface NavChild {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

const NAV_LINKS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  {
    label: 'Sản phẩm',
    href: '/products',
    children: [
      { label: 'Tất cả sản phẩm', href: '/products' },
      { label: 'Nam',              href: '/products?category=Nam' },
      { label: 'Nữ',              href: '/products?category=Nữ' },
      { label: 'Unisex',          href: '/products?category=Unisex' },
    ],
  },
  {
    label: 'Về chúng tôi',
    href: '/about',
    children: [
      { label: 'Câu chuyện',           href: '/about/story' },
      { label: 'Triết lý thương hiệu', href: '/about/philosophy' },
      { label: 'Nhà sáng tác hương',   href: '/about/perfumers' },
      { label: 'Chứng nhận',           href: '/about/certifications' },
      { label: 'Catalogue',            href: '/about/catalogue' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      { label: 'Tất cả bài viết', href: '/blog' },
      { label: 'Hướng dẫn hương', href: '/blog?category=Fragrance+Guide' },
      { label: 'Phong cách sống', href: '/blog?category=Lifestyle' },
    ],
  },
  { label: 'Liên hệ',   href: '/contact' },
  { label: 'Chính sách', href: '/policy' },
]

export default function NavLinks() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <ul
      ref={navRef}
      className="hidden md:flex items-center gap-8 list-none m-0 p-0"
    >
      {NAV_LINKS.map((item, i) => (
        <li
          key={item.href}
          className="relative"
          onMouseEnter={() => item.children && setOpenIndex(i)}
          onMouseLeave={() => setOpenIndex(null)}
        >
          <Link
            href={item.href}
            className="font-serif text-secondary hover:text-accent transition-colors flex items-center gap-1"
          >
            {item.label}
            {item.children && (
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-150 ${openIndex === i ? 'rotate-180' : ''}`}
              >
                <polyline points="2,4 6,8 10,4" />
              </svg>
            )}
          </Link>

          {item.children && (
            <div className="absolute top-full left-0 pt-2">
              <div
                className={`bg-white border border-black/10 shadow-lg min-w-44 py-2 transition-all duration-150 ${
                  openIndex === i
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2.5 font-serif text-sm text-secondary hover:text-accent hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenIndex(null)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
