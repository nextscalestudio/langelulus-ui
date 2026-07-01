'use client'

import { useState } from 'react'

interface TocItem {
  id: string
  text: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [open, setOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <>
      {/* Mobile collapsible */}
      <div className="lg:hidden mb-6 border border-gray-200 rounded-[10px] overflow-hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 font-serif font-bold text-secondary text-sm tracking-wide"
          aria-expanded={open}
        >
          Table of Contents
          <span aria-hidden="true" className="text-gray-400 transition-transform duration-200" style={{ display: 'inline-block', transform: open ? 'rotate(45deg)' : 'none' }}>
            +
          </span>
        </button>
        {open && (
          <ul className="px-4 pb-4 space-y-2.5 border-t border-gray-100">
            {items.map((item) => (
              <li key={item.id} className="first:pt-3">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="font-serif text-sm text-gray-500 hover:text-accent underline-offset-2 hover:underline transition-all duration-200"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop sticky */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">
          <h2 className="font-serif text-xs tracking-[0.2em] uppercase text-secondary/40 mb-4 border-b border-gray-100 pb-2.5">
            Contents
          </h2>
          <ul className="space-y-2.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-serif text-sm text-gray-500 hover:text-accent underline-offset-2 hover:underline transition-all duration-200 block"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export function parseToc(content: string): TocItem[] {
  const lines = content.split('\n')
  return lines
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, '').trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
      return { id, text }
    })
}
