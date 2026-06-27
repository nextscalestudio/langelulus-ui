'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/types'
import initialProducts from '@/data/products'
import Button from '@/components/ui/Button'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import ProductsTable from './_components/ProductsTable'
import ProductFormDrawer from './_components/ProductFormDrawer'

const STORAGE_KEY = 'admin-products'

function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch {
    // localStorage unavailable
  }
}

function AdminProductsContent() {
  const toast = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setProducts(JSON.parse(raw) as Product[])
      } else {
        setProducts(initialProducts)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
      }
    } catch {
      setProducts(initialProducts)
    }
  }, [])

  const handleSave = (product: Product) => {
    const isEdit = editTarget !== null
    setProducts((prev) => {
      const next = prev.find((p) => p.id === product.id)
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, product]
      saveProducts(next)
      return next
    })
    setDrawerOpen(false)
    setEditTarget(null)
    toast.success(isEdit ? 'Product updated.' : 'Product added.')
  }

  const handleDelete = (id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id)
      saveProducts(next)
      return next
    })
    toast.success('Product deleted.')
  }

  const openAdd = () => {
    setEditTarget(null)
    setDrawerOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditTarget(product)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditTarget(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-[28px] text-secondary">Products</h1>
        <Button variant="primary" onClick={openAdd}>
          Add Product
        </Button>
      </div>

      <ProductsTable products={products} onEdit={openEdit} onDelete={handleDelete} />

      {drawerOpen && (
        <ProductFormDrawer product={editTarget} onClose={closeDrawer} onSave={handleSave} />
      )}
    </div>
  )
}

export default function AdminProductsPage() {
  return (
    <ToastProvider>
      <AdminProductsContent />
    </ToastProvider>
  )
}
