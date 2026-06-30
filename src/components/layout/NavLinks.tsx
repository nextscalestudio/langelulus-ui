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
      className="hidden md:flex items-center gap-10 lg:gap-12 list-none m-0 p-0"
    >
      {NAV_ITEMS.map((item, i) => (
        <li
          key={item.href}
          className="relative"
          onMouseEnter={() => item.children && setOpenIndex(i)}
          onMouseLeave={() => setOpenIndex(null)}
        >
          <Link href={item.href} className="nav-link">
            {t(item.labelKey)}
          </Link>

          {item.children && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
              <div
                className={`bg-bg-elevated/95 backdrop-blur-xl border border-border rounded-2xl shadow-soft-lg min-w-48 py-3 px-1 transition-all duration-300 ease-luxury ${
                  openIndex === i
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2.5 font-sans text-sm text-secondary/70 hover:text-secondary rounded-xl hover:bg-secondary/[0.04] transition-colors duration-300"
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
