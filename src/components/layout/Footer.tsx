import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import SectionDivider from '@/components/ui/SectionDivider'

export default async function Footer() {
  const tNav = await getTranslations('nav')
  const tFooter = await getTranslations('footer')

  const FOOTER_LINKS = [
    { label: tNav('home'),     href: '/' },
    { label: tNav('products'), href: '/products' },
    { label: tNav('about'),    href: '/about' },
    { label: tNav('blog'),     href: '/blog' },
    { label: tNav('contact'),  href: '/contact' },
    { label: tNav('policy'),   href: '/policy' },
  ]

  return (
    <footer className="bg-bg-subtle py-16 md:py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionDivider />
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <span className="font-display text-xl tracking-[0.12em] text-secondary">PARFUM</span>
            <p className="mt-4 font-sans text-sm text-muted leading-relaxed max-w-xs">
              {tFooter('tagline')}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-secondary/70 hover:text-accent transition-colors duration-300 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:text-right">
            <p className="font-sans text-xs text-muted">
              {tFooter('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
