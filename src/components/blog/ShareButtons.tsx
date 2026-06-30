'use client'

import { useToast } from '@/components/ui/Toast'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const toast = useToast()

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied!')
    })
  }

  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const twHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="font-serif text-sm text-[#6b7280]">Share:</span>

      {/* Facebook */}
      <a
        href={fbHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex items-center justify-center w-9 h-9 border border-secondary text-secondary hover:bg-accent hover:border-accent hover:text-white transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>

      {/* Twitter / X */}
      <a
        href={twHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter / X"
        className="flex items-center justify-center w-9 h-9 border border-secondary text-secondary hover:bg-accent hover:border-accent hover:text-white transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex items-center justify-center w-9 h-9 border border-secondary text-secondary hover:bg-accent hover:border-accent hover:text-white transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  )
}
