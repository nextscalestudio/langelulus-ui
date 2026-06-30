import { Link } from '@/i18n/navigation'
import { auth } from '@/auth'
import CartIconButton from './CartIconButton'
import NavbarAuthButton from './NavbarAuthButton'
import SearchIconButton from './SearchIconButton'
import NavLinks from './NavLinks'
import LocaleSwitcher from './LocaleSwitcher'

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

        <NavLinks />

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <SearchIconButton />
          <CartIconButton />
          <NavbarAuthButton user={session?.user} />
        </div>
      </div>
    </nav>
  )
}
