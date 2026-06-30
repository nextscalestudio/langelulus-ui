'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { AdminBlogPost } from '@/types'

interface BlogTableProps {
  posts: AdminBlogPost[]
  onEdit: (post: AdminBlogPost) => void
  onDelete: (id: string) => void
}

const PAGE_SIZE = 10

export default function BlogTable({ posts, onEdit, onDelete }: BlogTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleDelete = (post: AdminBlogPost) => {
    if (window.confirm(`Delete "${post.title}"? This action cannot be undone.`)) {
      onDelete(post.id)
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-60 border border-secondary px-3 py-2 font-serif text-sm text-secondary outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-secondary text-white">
              {['Thumbnail', 'Title', 'Category', 'Date', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="font-serif text-[13px] font-normal text-left px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="font-serif text-sm text-gray-500 px-4 py-6 text-center"
                >
                  No posts found.
                </td>
              </tr>
            ) : (
              paged.map((post, idx) => (
                <tr
                  key={post.id}
                  className={[
                    'border-b border-gray-200 hover:bg-[#f0f0f0] transition-colors',
                    idx % 2 === 1 ? 'bg-gray-50' : 'bg-white',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    {post.thumbnail ? (
                      <div className="relative w-16 h-10 shrink-0">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-serif">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3 max-w-[240px]">
                    {post.title}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3 whitespace-nowrap">
                    {post.category}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3 whitespace-nowrap">
                    {formatDate(post.publishedAt)}
                  </td>
                  <td className="px-4 py-3">
                    {post.status === 'published' ? (
                      <span className="inline-block bg-green-100 text-green-700 font-serif text-xs px-2 py-0.5 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-600 font-serif text-xs px-2 py-0.5 rounded-full">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onEdit(post)}
                      className="font-serif text-sm text-accent hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post)}
                      className="font-serif text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="font-serif text-sm text-secondary px-3 py-1 border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={[
                'font-serif text-sm px-3 py-1 border',
                p === currentPage
                  ? 'bg-secondary text-white border-secondary'
                  : 'text-secondary border-gray-300 hover:bg-gray-100',
              ].join(' ')}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="font-serif text-sm text-secondary px-3 py-1 border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
