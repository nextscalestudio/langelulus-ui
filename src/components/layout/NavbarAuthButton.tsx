'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useCartStore } from '@/lib/store/cart-store'

interface NavbarAuthButtonProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
}

export default function NavbarAuthButton({ user }: NavbarAuthButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const clearCart = useCartStore((state) => state.clearCart)
  const t = useTranslations('auth')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) {
    return (
      <button
        aria-label={t('signIn')}
        onClick={() => signIn('google')}
        className="font-sans text-xs tracking-wide text-secondary/70 hover:text-secondary transition-colors duration-300"
      >
        {t('signIn')}
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Account menu"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center rounded-full overflow-hidden w-7 h-7 ring-1 ring-border focus:outline-none focus:ring-secondary/20 transition-shadow duration-300"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? 'User avatar'}
            width={32}
            height={32}
            className="w-8 h-8 object-cover"
          />
        ) : (
          <span className="w-8 h-8 flex items-center justify-center bg-secondary text-bg font-serif text-sm">
            {user.name?.[0]?.toUpperCase() ?? 'U'}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-bg-elevated/95 backdrop-blur-xl border border-border rounded-2xl shadow-soft-lg z-50 py-1">
          <button
            onClick={async () => {
              setOpen(false)
              clearCart()
              await signOut()
            }}
            className="w-full text-left px-4 py-2.5 font-sans text-sm text-secondary/70 hover:text-secondary rounded-xl hover:bg-secondary/[0.04] transition-colors duration-300"
          >
            {t('signOut')}
          </button>
        </div>
      )}
    </div>
  )
}
