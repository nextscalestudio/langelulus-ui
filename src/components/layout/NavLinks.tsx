'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

interface NavChild {
  labelKey: string
  href: string
}

interface NavItem {
  labelKey: string
  href: string
  children?: NavChild[]
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'home', href: '/' },
  {
    labelKey: 'products',
    href: '/products',
    children: [
      { labelKey: 'productsAll',    href: '/products' },
      { labelKey: 'productsNam',    href: '/products?category=Nam' },
      { labelKey: 'productsNu',     href: '/products?category=Nữ' },
      { labelKey: 'productsUnisex', href: '/products?category=Unisex' },
    ],
  },
  {
    labelKey: 'about',
    href: '/about',
    children: [
      { labelKey: 'aboutStory',      href: '/about/story' },
      { labelKey: 'aboutPhilosophy', href: '/about/philosophy' },
      { labelKey: 'aboutPerfumers',  href: '/about/perfumers' },
      { labelKey: 'aboutCerts',      href: '/about/certifications' },
      { labelKey: 'aboutCatalogue',  href: '/about/catalogue' },
    ],
  },
  {
    labelKey: 'blog',
    href: '/blog',
    children: [
      { labelKey: 'blogAll',       href: '/blog' },
      { labelKey: 'blogGuide',     href: '/blog?category=Fragrance+Guide' },
      { labelKey: 'blogLifestyle', href: '/blog?category=Lifestyle' },
    ],
  },
  { labelKey: 'contact', href: '/contact' },
  { labelKey: 'policy',  href: '/policy' },
]

export default function NavLinks() {
  const t = useTranslations('nav')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLUListElement>(null)
  
  console.log("Test locale:", t(NAV_ITEMS[0].labelKey));

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
      {NAV_ITEMS.map((item, i) => (
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
            {t(item.labelKey)}
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
                    {t(child.labelKey)}
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
