'use client'

import { useEffect, useState } from 'react'
import type { AdminBlogPost } from '@/types'
import initialPosts from '@/data/blog-posts'
import Button from '@/components/ui/Button'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import BlogTable from './_components/BlogTable'
import BlogFormDrawer from './_components/BlogFormDrawer'

const STORAGE_KEY = 'admin-blog-posts'

function savePosts(posts: AdminBlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch {
    // localStorage unavailable
  }
}

function AdminBlogContent() {
  const toast = useToast()
  const [posts, setPosts] = useState<AdminBlogPost[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<AdminBlogPost | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setPosts(JSON.parse(raw) as AdminBlogPost[])
      } else {
        const seeded: AdminBlogPost[] = initialPosts.map((p) => ({ ...p, status: 'published' }))
        setPosts(seeded)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      }
    } catch {
      setPosts(initialPosts.map((p) => ({ ...p, status: 'published' })))
    }
  }, [])

  const handleSave = (post: AdminBlogPost) => {
    const isEdit = editTarget !== null
    setPosts((prev) => {
      const next = prev.find((p) => p.id === post.id)
        ? prev.map((p) => (p.id === post.id ? post : p))
        : [...prev, post]
      savePosts(next)
      return next
    })
    setDrawerOpen(false)
    setEditTarget(null)
    toast.success(isEdit ? 'Post updated.' : 'Post added.')
  }

  const handleDelete = (id: string) => {
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== id)
      savePosts(next)
      return next
    })
    toast.success('Post deleted.')
  }

  const openAdd = () => {
    setEditTarget(null)
    setDrawerOpen(true)
  }

  const openEdit = (post: AdminBlogPost) => {
    setEditTarget(post)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditTarget(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-[28px] text-secondary">Blog Posts</h1>
        <Button variant="primary" onClick={openAdd}>
          Add Post
        </Button>
      </div>

      <BlogTable posts={posts} onEdit={openEdit} onDelete={handleDelete} />

      {drawerOpen && (
        <BlogFormDrawer post={editTarget} onClose={closeDrawer} onSave={handleSave} />
      )}
    </div>
  )
}

export default function AdminBlogPage() {
  return (
    <ToastProvider>
      <AdminBlogContent />
    </ToastProvider>
  )
}
