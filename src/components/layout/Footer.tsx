import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function Footer() {
  const tNav = await getTranslations('nav')
  const tFooter = await getTranslations('footer')

  const shopLinks = [
    { label: tNav('productsAll'),    href: '/products' },
    { label: tNav('productsNam'),    href: '/products?gender=men' },
    { label: tNav('productsNu'),     href: '/products?gender=women' },
    { label: tNav('productsUnisex'), href: '/products?gender=unisex' },
  ]

  const brandLinks = [
    { label: tNav('aboutStory'),      href: '/about' },
    { label: tNav('aboutPhilosophy'), href: '/about/philosophy' },
    { label: tNav('aboutPerfumers'),  href: '/about/perfumers' },
    { label: tNav('aboutCerts'),      href: '/about/certifications' },
    { label: tNav('aboutCatalogue'),  href: '/about/catalogue' },
  ]

  const supportLinks = [
    { label: tNav('contact'), href: '/contact' },
    { label: tNav('blog'),    href: '/blog' },
    { label: tNav('policy'),  href: '/policy' },
  ]

  return (
    <footer className="bg-black text-white/70">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <span className="font-serif text-2xl tracking-[0.14em] text-white">
              L&apos;ANGELULUS
            </span>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              {tFooter('description')}
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-2 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>{tFooter('address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                </svg>
                <a href={`tel:${tFooter('phone')}`} className="hover:text-white transition-colors duration-200">
                  {tFooter('phone')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${tFooter('email')}`} className="hover:text-white transition-colors duration-200">
                  {tFooter('email')}
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div>
              <p className="text-xs tracking-widest text-white/30 mb-3 uppercase">{tFooter('followUs')}</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-white mb-5 uppercase">
              {tFooter('shopTitle')}
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-white mb-5 uppercase">
              {tFooter('companyTitle')}
            </h3>
            <ul className="flex flex-col gap-3">
              {brandLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] font-medium text-white mb-5 uppercase">
              {tFooter('supportTitle')}
            </h3>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs tracking-[0.15em] text-white/40 uppercase mb-3">
                {tFooter('newsletter.heading')}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={tFooter('newsletter.placeholder')}
                  className="flex-1 bg-white/5 border border-white/10 text-white text-xs px-3 py-2 placeholder:text-white/25 focus:outline-none focus:border-white/30 rounded-l transition-colors duration-200 min-w-0"
                />
                <button className="bg-white text-black text-xs px-4 py-2 font-medium tracking-wider hover:bg-white/90 transition-colors duration-200 rounded-r whitespace-nowrap">
                  {tFooter('newsletter.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            {tFooter('copyright')}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DA0000] inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300] inline-block" />
            {tFooter('madeIn')}
          </div>
        </div>
      </div>
    </footer>
  )
}
