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
      <div className="lg:hidden mb-6 border border-secondary">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 font-serif font-bold text-secondary text-sm"
          aria-expanded={open}
        >
          Table of Contents
          <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        {open && (
          <ul className="px-4 pb-4 space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="font-serif text-[14px] text-[#6b7280] hover:text-accent transition-colors"
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
          <h2 className="font-serif font-bold text-secondary text-sm mb-3 border-b border-secondary pb-2">
            Contents
          </h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-serif text-[14px] text-[#6b7280] hover:text-accent transition-colors block"
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
