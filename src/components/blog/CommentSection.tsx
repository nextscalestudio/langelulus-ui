'use client'

import { useEffect, useState } from 'react'

interface Comment {
  id: string
  author: string
  body: string
  createdAt: string
}

interface CommentSectionProps {
  slug: string
}

function storageKey(slug: string) {
  return `comments-${slug}`
}

function loadComments(slug: string): Comment[] {
  try {
    const raw = localStorage.getItem(storageKey(slug))
    return raw ? (JSON.parse(raw) as Comment[]) : []
  } catch {
    return []
  }
}

function saveComments(slug: string, comments: Comment[]) {
  localStorage.setItem(storageKey(slug), JSON.stringify(comments))
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setComments(loadComments(slug))
  }, [slug])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author.trim() || !body.trim()) {
      setError('Please fill in both fields.')
      return
    }
    setError('')
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      author: author.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...comments, newComment]
    saveComments(slug, updated)
    setComments(updated)
    setAuthor('')
    setBody('')
  }

  return (
    <section className="mt-12">
      <h2 className="font-serif font-bold text-secondary text-xl border-b border-secondary pb-3 mb-6">
        Comments ({comments.length})
      </h2>

      {comments.length === 0 ? (
        <p className="font-serif text-[#6b7280] text-sm mb-8">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <ul className="space-y-6 mb-8">
          {comments.map((c) => (
            <li key={c.id} className="border-b border-secondary/20 pb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-serif font-bold text-secondary text-sm">{c.author}</span>
                <span className="font-serif text-[#6b7280] text-xs">
                  {new Date(c.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="font-serif text-secondary text-sm leading-relaxed">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-serif font-bold text-secondary text-base">Leave a Comment</h3>
        {error && <p className="font-serif text-red-500 text-sm">{error}</p>}
        <div>
          <label htmlFor="comment-author" className="block font-serif text-secondary text-sm mb-1">
            Name
          </label>
          <input
            id="comment-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-secondary px-3 py-2 font-serif text-sm text-secondary bg-bg focus:outline-none focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="comment-body" className="block font-serif text-secondary text-sm mb-1">
            Comment
          </label>
          <textarea
            id="comment-body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-secondary px-3 py-2 font-serif text-sm text-secondary bg-bg focus:outline-none focus:border-accent resize-none"
            placeholder="Share your thoughts…"
          />
        </div>
        <button
          type="submit"
          className="font-serif text-sm border border-secondary px-6 py-2 text-secondary hover:bg-secondary hover:text-bg transition-colors"
        >
          Submit
        </button>
      </form>
    </section>
  )
}
