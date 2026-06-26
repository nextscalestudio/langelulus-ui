import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10 px-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
        <span className="font-serif font-bold text-[18px]">PARFUM</span>
        <nav className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif text-white hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-serif text-[12px] text-white opacity-60 text-center">
          © 2024 PARFUM. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
