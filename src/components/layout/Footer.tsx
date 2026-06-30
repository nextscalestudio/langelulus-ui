import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function Footer() {
  const tNav = await getTranslations('nav')
  const tFooter = await getTranslations('footer')

  const FOOTER_LINKS = [
    { label: tNav('home'),     href: '/' },
    { label: tNav('products'), href: '/products' },
    { label: tNav('contact'),  href: '/contact' },
  ]

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
          {tFooter('copyright')}
        </p>
      </div>
    </footer>
  )
}
