'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: '◈' },
  { label: 'Products', href: '/admin/products', icon: '◫' },
  { label: 'Orders', href: '/admin/orders', icon: '◉' },
  { label: 'Blog', href: '/admin/blog', icon: '▤' },
  { label: 'Customers', href: '/admin/customers', icon: '◌' },
  { label: 'Coupons', href: '/admin/coupons', icon: '◎' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-secondary text-white w-10 h-10 flex items-center justify-center text-xl"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Backdrop — mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 left-0 bottom-0 z-40 w-60 flex flex-col bg-secondary',
          'transition-transform duration-200',
          'lg:static lg:z-auto lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-serif text-sm font-bold tracking-widest text-white">
          L'Angelulus ADMIN
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4" aria-label="Admin navigation">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'flex items-center gap-3 px-3 py-2.5 font-serif text-sm transition-colors',
                      active
                        ? 'text-accent font-bold bg-accent/10'
                        : 'text-white hover:text-accent',
                    ].join(' ')}
                  >
                    <span aria-hidden="true" className="text-base w-5 text-center">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
