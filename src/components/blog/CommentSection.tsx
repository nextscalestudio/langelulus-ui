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

  const fieldClass =
    'w-full border border-gray-200 rounded-[8px] px-4 py-2.5 font-serif text-sm text-secondary bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all duration-200'

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h2 className="font-serif font-bold text-secondary text-2xl border-b border-gray-100 pb-4 mb-8">
        Comments ({comments.length})
      </h2>

      {comments.length === 0 ? (
        <p className="font-serif text-gray-400 text-[15px] mb-10">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <ul className="space-y-6 mb-8">
          {comments.map((c) => (
            <li key={c.id} className="border-b border-gray-100 pb-6">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-serif font-bold text-secondary text-sm">{c.author}</span>
                <span className="font-serif text-gray-400 text-xs">
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="font-serif font-bold text-secondary text-xl tracking-wide">Leave a Comment</h3>
        {error && <p className="font-serif text-red-500 text-sm">{error}</p>}
        <div>
          <label htmlFor="comment-author" className="block font-serif text-secondary text-sm mb-2">
            Name
          </label>
          <input
            id="comment-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="comment-body" className="block font-serif text-secondary text-sm mb-2">
            Comment
          </label>
          <textarea
            id="comment-body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`${fieldClass} resize-none`}
            placeholder="Share your thoughts…"
          />
        </div>
        <button
          type="submit"
          className="font-serif text-sm border border-gray-300 rounded-[8px] px-6 py-2.5 text-secondary hover:border-secondary hover:shadow-md transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </section>
  )
}
