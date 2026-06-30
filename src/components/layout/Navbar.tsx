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
      className="sticky top-0 z-50 glass-nav border-b border-border h-[52px] md:h-14 flex items-center px-6 md:px-10 lg:px-16"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link
          href="/"
          aria-label="PARFUM home"
          className="font-display font-medium text-secondary text-lg tracking-[0.15em] hover:opacity-70 transition-opacity duration-300"
        >
          PARFUM
        </Link>

        <NavLinks />

        <div className="flex items-center gap-5 md:gap-6">
          <LocaleSwitcher />
          <SearchIconButton />
          <CartIconButton />
          <NavbarAuthButton user={session?.user} />
        </div>
      </div>
    </nav>
  )
}
