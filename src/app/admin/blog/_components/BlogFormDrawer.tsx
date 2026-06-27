'use client'

import { useEffect, useRef, useState } from 'react'
import type { AdminBlogPost } from '@/types'
import Button from '@/components/ui/Button'

interface BlogFormDrawerProps {
  post: AdminBlogPost | null
  onClose: () => void
  onSave: (post: AdminBlogPost) => void
}

interface FormState {
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string
  thumbnail: string
  status: 'published' | 'draft'
  readTime: string
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function BlogFormDrawer({ post, onClose, onSave }: BlogFormDrawerProps) {
  const [form, setForm] = useState<FormState>({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '',
    tags: '',
    thumbnail: '',
    status: 'draft',
    readTime: '',
  })
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        category: post.category,
        tags: post.tags.join(', '),
        thumbnail: post.thumbnail,
        status: post.status,
        readTime: String(post.readTime),
      })
    } else {
      setForm({
        title: '',
        slug: '',
        description: '',
        content: '',
        category: '',
        tags: '',
        thumbnail: '',
        status: 'draft',
        readTime: '',
      })
    }
    setSlugManuallyEdited(false)
    setErrors({})
  }, [post])

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugManuallyEdited ? f.slug : generateSlug(value),
    }))
  }

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true)
    setForm((f) => ({ ...f, slug: value }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.title.trim()) next.title = 'Title is required'
    if (!form.slug.trim()) next.slug = 'Slug is required'
    if (!form.description.trim()) next.description = 'Description is required'
    if (!form.content.trim()) next.content = 'Content is required'
    if (!form.category.trim()) next.category = 'Category is required'
    if (!form.readTime || isNaN(Number(form.readTime)) || Number(form.readTime) <= 0)
      next.readTime = 'Valid read time is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const saved: AdminBlogPost = post
      ? {
          ...post,
          title: form.title.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          content: form.content.trim(),
          category: form.category.trim(),
          tags,
          thumbnail: form.thumbnail.trim(),
          status: form.status,
          readTime: Number(form.readTime),
        }
      : {
          id: `bp${Date.now()}`,
          title: form.title.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          content: form.content.trim(),
          category: form.category.trim(),
          tags,
          thumbnail: form.thumbnail.trim(),
          status: form.status,
          readTime: Number(form.readTime),
          publishedAt: new Date().toISOString(),
        }

    onSave(saved)
  }

  const fieldClass =
    'w-full border border-secondary px-3 py-2 font-serif text-sm text-secondary outline-none focus:ring-1 focus:ring-accent'

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={post ? 'Edit Post' : 'Add Post'}
        className="fixed right-0 top-0 bottom-0 z-50 w-[600px] bg-white flex flex-col shadow-2xl"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
          <h2 className="font-serif text-xl text-secondary">
            {post ? 'Edit Post' : 'Add Post'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="text-gray-400 hover:text-secondary text-2xl leading-none"
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-title">
              Title *
            </label>
            <input
              id="bf-title"
              ref={firstInputRef}
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={fieldClass}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-slug">
              Slug *
            </label>
            <input
              id="bf-slug"
              type="text"
              value={form.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className={fieldClass}
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-desc">
              Description *
            </label>
            <textarea
              id="bf-desc"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={`${fieldClass} resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-content">
              Content * (plain text / markdown)
            </label>
            <textarea
              id="bf-content"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="w-full h-64 border border-secondary px-3 py-2 font-mono text-sm text-secondary outline-none focus:ring-1 focus:ring-accent resize-none"
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-category">
              Category *
            </label>
            <input
              id="bf-category"
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={fieldClass}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-tags">
              Tags (comma-separated)
            </label>
            <input
              id="bf-tags"
              type="text"
              placeholder="tips, guide, lifestyle"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className={fieldClass}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-thumb">
              Thumbnail URL
            </label>
            <input
              id="bf-thumb"
              type="url"
              placeholder="https://..."
              value={form.thumbnail}
              onChange={(e) => setForm((f) => ({ ...f, thumbnail: e.target.value }))}
              className={fieldClass}
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-readtime">
              Read Time (minutes) *
            </label>
            <input
              id="bf-readtime"
              type="number"
              min="1"
              value={form.readTime}
              onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              className={fieldClass}
            />
            {errors.readTime && <p className="text-red-500 text-xs mt-1">{errors.readTime}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="bf-status">
              Status
            </label>
            <select
              id="bf-status"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as 'published' | 'draft' }))
              }
              className={fieldClass}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" variant="primary">
              {post ? 'Save Changes' : 'Add Post'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </aside>
    </>
  )
}
