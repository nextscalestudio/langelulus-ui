'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '@/types'

const vnd = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

const PAGE_SIZE = 10

interface ProductsTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleDelete = (product: Product) => {
    if (window.confirm(`Delete "${product.name}"? This action cannot be undone.`)) {
      onDelete(product.id)
    }
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by name..."
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
              {['Thumbnail', 'Name', 'Brand', 'Price', 'Category', 'Stock', 'Actions'].map((h) => (
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
                  colSpan={7}
                  className="font-serif text-sm text-gray-500 px-4 py-6 text-center"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              paged.map((product, idx) => (
                <tr
                  key={product.id}
                  className={[
                    'border-b border-gray-200 hover:bg-[#f0f0f0] transition-colors',
                    idx % 2 === 1 ? 'bg-gray-50' : 'bg-white',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    {product.images[0] ? (
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-serif">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3 max-w-[200px]">
                    {product.name}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3">
                    {product.brand}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3 whitespace-nowrap">
                    {vnd(product.price)}
                  </td>
                  <td className="font-serif text-sm text-secondary px-4 py-3">
                    {product.category}
                  </td>
                  <td className="font-serif text-sm px-4 py-3">
                    <span className={product.inStock ? 'text-green-600' : 'text-red-500'}>
                      {product.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="font-serif text-sm text-accent hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
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
