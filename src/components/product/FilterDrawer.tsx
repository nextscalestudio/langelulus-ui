'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import type { Product } from '@/types'
import Button from '@/components/ui/Button'
import ProductFilters from './ProductFilters'

interface FilterDrawerProps {
  products: Product[]
}

const FILTER_KEYS = ['category', 'collection', 'priceMin', 'priceMax', 'family']

export default function FilterDrawer({ products }: FilterDrawerProps) {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()

  const activeCount = FILTER_KEYS.filter(k => searchParams.has(k)).length

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Filter{activeCount > 0 ? ` (${activeCount})` : ''}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary/40 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-bg z-50 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif font-bold text-xl text-secondary">Filters</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-secondary text-3xl leading-none hover:text-accent"
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>

              <ProductFilters products={products} />

              <div className="mt-8">
                <Button variant="primary" onClick={() => setOpen(false)} className="w-full">
                  View Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
