'use client'

import { useState } from 'react'

interface SocialLink {
  name: string
  href: string
  icon: string
  color: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/langelulus',
    color: '#1877f2',
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    name: 'Messenger',
    href: 'https://m.me/langelulus',
    color: '#0084ff',
    icon: 'M12 2C6.477 2 2 6.145 2 11.243c0 2.914 1.318 5.52 3.393 7.288V22l3.068-1.695A11.15 11.15 0 0 0 12 20.485c5.523 0 10-4.145 10-9.242C22 6.145 17.523 2 12 2zm1.002 12.443-2.547-2.72-4.97 2.72 5.467-5.797 2.61 2.72 4.906-2.72-5.466 5.797z',
  },
  {
    name: 'Zalo',
    href: 'https://zalo.me/0123456789',
    color: '#0068ff',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V9h2v7zm4 0h-2V9h2v7z',
  },
  {
    name: 'Phone',
    href: 'tel:0123456789',
    color: '#22c55e',
    icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.95 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.88 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  },
]

export default function SocialWidget() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {expanded &&
        SOCIAL_LINKS.map((link) => (
          <div key={link.name} className="group relative flex items-center">
            <span className="absolute right-14 whitespace-nowrap rounded bg-secondary px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {link.name}
            </span>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
              style={{ backgroundColor: link.color }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={link.icon} />
              </svg>
            </a>
          </div>
        ))}

      <button
        aria-label={expanded ? 'Close social links' : 'Open social links'}
        onClick={() => setExpanded((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {expanded ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}
