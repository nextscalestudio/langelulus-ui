import Link from 'next/link'
import { auth } from '@/auth'
import CartIconButton from './CartIconButton'
import NavbarAuthButton from './NavbarAuthButton'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
]

export default async function Navbar() {
  const session = await auth()

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 bg-bg border-b border-secondary h-16 flex items-center px-6"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link
          href="/"
          aria-label="PARFUM home"
          className="font-serif font-bold text-accent text-xl tracking-widest"
        >
          PARFUM
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-serif text-secondary hover:text-accent transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <CartIconButton />
          <NavbarAuthButton user={session?.user} />
        </div>
      </div>
    </nav>
  )
}
