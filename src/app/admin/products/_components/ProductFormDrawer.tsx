'use client'

import { useEffect, useRef, useState } from 'react'
import type { Product } from '@/types'
import Button from '@/components/ui/Button'

interface ProductFormDrawerProps {
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

interface FormState {
  name: string
  brand: string
  price: string
  category: string
  collection: string
  availableVolumes: string
  inStock: boolean
  description: string
  images: string[]
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function ProductFormDrawer({ product, onClose, onSave }: ProductFormDrawerProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    brand: '',
    price: '',
    category: '',
    collection: '',
    availableVolumes: '',
    inStock: true,
    description: '',
    images: [''],
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        brand: product.brand,
        price: String(product.price),
        category: product.category,
        collection: product.collection ?? '',
        availableVolumes: product.availableVolumes.join(', '),
        inStock: product.inStock,
        description: product.description,
        images: product.images.length > 0 ? product.images : [''],
      })
    } else {
      setForm({
        name: '',
        brand: '',
        price: '',
        category: '',
        collection: '',
        availableVolumes: '',
        inStock: true,
        description: '',
        images: [''],
      })
    }
    setErrors({})
  }, [product])

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.brand.trim()) next.brand = 'Brand is required'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      next.price = 'Valid price is required'
    if (!form.category.trim()) next.category = 'Category is required'
    if (!form.description.trim()) next.description = 'Description is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const volumes = form.availableVolumes
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
    const images = form.images.filter(Boolean)

    const saved: Product = product
      ? {
          ...product,
          name: form.name.trim(),
          brand: form.brand.trim(),
          price: Number(form.price),
          category: form.category.trim(),
          collection: form.collection.trim() || undefined,
          availableVolumes: volumes,
          inStock: form.inStock,
          description: form.description.trim(),
          images,
        }
      : {
          id: `p${Date.now()}`,
          slug: slugify(form.name),
          name: form.name.trim(),
          brand: form.brand.trim(),
          shortDescription: '',
          description: form.description.trim(),
          price: Number(form.price),
          images,
          availableVolumes: volumes,
          inStock: form.inStock,
          category: form.category.trim(),
          collection: form.collection.trim() || undefined,
          tags: [],
          specs: {
            volume: volumes[0] ?? '',
            concentration: 'EDP',
            origin: '',
            longevity: '',
            sillage: '',
            gender: 'Unisex',
          },
          scentProfile: {
            family: '',
            notes: { top: [], middle: [], base: [] },
            style: '',
            occasion: [],
            emotionalDescription: '',
            targetAudience: '',
            feeling: '',
          },
          usageGuide: { sprayPositions: [], longevityTips: [], storageTips: [] },
          rating: 0,
          reviewCount: 0,
          isFeatured: false,
          relatedProductIds: [],
        }

    onSave(saved)
  }

  const addImageField = () => setForm((f) => ({ ...f, images: [...f.images, ''] }))
  const removeImageField = (idx: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  const setImage = (idx: number, val: string) =>
    setForm((f) => {
      const images = [...f.images]
      images[idx] = val
      return { ...f, images }
    })

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
        aria-label={product ? 'Edit Product' : 'Add Product'}
        className="fixed right-0 top-0 bottom-0 z-50 w-[480px] bg-white flex flex-col shadow-2xl"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
          <h2 className="font-serif text-xl text-secondary">
            {product ? 'Edit Product' : 'Add Product'}
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
          {/* Name */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-name">
              Name *
            </label>
            <input
              id="pf-name"
              ref={firstInputRef}
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={fieldClass}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Brand */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-brand">
              Brand *
            </label>
            <input
              id="pf-brand"
              type="text"
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              className={fieldClass}
            />
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-price">
              Price (VND) *
            </label>
            <input
              id="pf-price"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className={fieldClass}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-category">
              Category *
            </label>
            <input
              id="pf-category"
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={fieldClass}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Collection */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-collection">
              Collection
            </label>
            <input
              id="pf-collection"
              type="text"
              value={form.collection}
              onChange={(e) => setForm((f) => ({ ...f, collection: e.target.value }))}
              className={fieldClass}
            />
          </div>

          {/* Volume options */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-volumes">
              Volume Options (comma-separated)
            </label>
            <input
              id="pf-volumes"
              type="text"
              placeholder="30ml, 50ml, 100ml"
              value={form.availableVolumes}
              onChange={(e) => setForm((f) => ({ ...f, availableVolumes: e.target.value }))}
              className={fieldClass}
            />
          </div>

          {/* inStock toggle */}
          <div className="flex items-center gap-3">
            <input
              id="pf-instock"
              type="checkbox"
              checked={form.inStock}
              onChange={(e) => setForm((f) => ({ ...f, inStock: e.target.checked }))}
              className="w-4 h-4 accent-accent"
            />
            <label className="font-serif text-sm text-secondary" htmlFor="pf-instock">
              In Stock
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block font-serif text-sm text-secondary mb-1" htmlFor="pf-desc">
              Description *
            </label>
            <textarea
              id="pf-desc"
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={`${fieldClass} resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <p className="font-serif text-sm text-secondary mb-2">Images (URL)</p>
            <div className="space-y-2">
              {form.images.map((img, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => setImage(idx, e.target.value)}
                    placeholder="https://..."
                    className="flex-1 border border-secondary px-3 py-2 font-serif text-sm text-secondary outline-none focus:ring-1 focus:ring-accent"
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="text-red-500 hover:text-red-700 px-2 text-lg leading-none"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 font-serif text-sm text-accent hover:underline"
            >
              + Add image
            </button>
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" variant="primary">
              {product ? 'Save Changes' : 'Add Product'}
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
