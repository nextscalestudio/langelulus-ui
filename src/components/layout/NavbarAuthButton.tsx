'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
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
        aria-label="Sign in"
        onClick={() => signIn('google')}
        className="font-serif border border-secondary px-4 py-1.5 text-secondary hover:bg-secondary hover:text-bg transition-colors"
      >
        Sign In
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Account menu"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center rounded-full overflow-hidden w-8 h-8 border border-secondary focus:outline-none"
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
        <div className="absolute right-0 mt-2 w-36 bg-white border border-[#e5e7eb] shadow-md z-50">
          <button
            onClick={async () => {
              setOpen(false)
              clearCart()
              await signOut()
            }}
            className="w-full text-left px-4 py-2 font-serif text-[14px] text-secondary hover:text-accent transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
