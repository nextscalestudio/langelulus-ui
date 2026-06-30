'use client'

import { useEffect, useState } from 'react'
import type { Order } from '@/types'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import OrdersTable from './_components/OrdersTable'
import OrderDetailModal from './_components/OrderDetailModal'

const STORAGE_KEY = 'parfum-orders'

type TabValue = 'all' | Order['status']

const TABS: { label: string; value: TabValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // localStorage unavailable
  }
}

function AdminOrdersContent() {
  const toast = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  useEffect(() => {
    setOrders(loadOrders())
  }, [])

  const handleStatusChange = (id: string, status: Order['status']) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, status } : o))
      saveOrders(next)
      return next
    })
    toast.success('Status updated.')
  }

  const filtered = orders.filter((o) => {
    const matchesTab = activeTab === 'all' || o.status === activeTab
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.recipient.fullName.toLowerCase().includes(q)
    return matchesTab && matchesSearch
  })

  const selectedOrder = selectedOrderId
    ? (orders.find((o) => o.id === selectedOrderId) ?? null)
    : null

  return (
    <div>
      <h1 className="font-serif text-[28px] text-secondary mb-6">Orders</h1>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={[
              'font-serif text-sm px-4 py-2 border-b-2 transition-colors',
              activeTab === tab.value
                ? 'border-accent text-accent font-bold'
                : 'border-transparent text-gray-500 hover:text-secondary',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by order ID or customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 border border-secondary px-3 py-2 font-serif text-sm text-secondary outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <OrdersTable orders={filtered} onView={(o) => setSelectedOrderId(o.id)} />

      <OrderDetailModal
        order={selectedOrder}
        isOpen={selectedOrderId !== null}
        onClose={() => setSelectedOrderId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

export default function AdminOrdersPage() {
  return (
    <ToastProvider>
      <AdminOrdersContent />
    </ToastProvider>
  )
}
