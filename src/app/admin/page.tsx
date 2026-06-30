'use client'

import { useEffect, useState } from 'react'
import type { Order } from '@/types'
import products from '@/data/products'

const vnd = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

interface Metrics {
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenue: number
}

interface MetricCardProps {
  label: string
  value: string
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6">
      <p className="font-serif text-sm text-gray-500 mb-2">{label}</p>
      <p className="font-serif font-bold text-[32px] text-accent leading-none">{value}</p>
    </div>
  )
}

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalOrders: 0,
    totalProducts: products.length,
    totalCustomers: 0,
    revenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    try {
      const stored: Order[] = JSON.parse(localStorage.getItem('parfum-orders') ?? '[]')
      const uniqueCustomers = new Set(stored.map((o) => o.recipient.email)).size
      const revenue = stored.reduce((sum, o) => sum + o.total, 0)
      const sorted = [...stored].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      setMetrics({
        totalOrders: stored.length,
        totalProducts: products.length,
        totalCustomers: uniqueCustomers,
        revenue,
      })
      setRecentOrders(sorted.slice(0, 5))
    } catch {
      // localStorage unavailable — metrics stay at defaults
    }
  }, [])

  return (
    <div>
      <h1 className="font-serif text-3xl text-secondary mb-8">Dashboard</h1>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <MetricCard label="Total Orders" value={String(metrics.totalOrders)} />
        <MetricCard label="Total Products" value={String(metrics.totalProducts)} />
        <MetricCard label="Total Customers" value={String(metrics.totalCustomers)} />
        <MetricCard label="Revenue" value={vnd(metrics.revenue)} />
      </div>

      {/* Recent orders */}
      <section>
        <h2 className="font-serif text-xl text-secondary mb-4">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="font-serif text-sm text-gray-500">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary text-white">
                  {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date'].map((h) => (
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
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-[#f0f0f0] transition-colors"
                  >
                    <td className="font-mono text-xs text-secondary px-4 py-3">{order.id}</td>
                    <td className="font-serif text-sm text-secondary px-4 py-3">
                      {order.recipient.fullName}
                    </td>
                    <td className="font-serif text-sm text-secondary px-4 py-3 text-center">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                    </td>
                    <td className="font-serif text-sm text-secondary px-4 py-3">
                      {vnd(order.total)}
                    </td>
                    <td className="font-serif text-sm px-4 py-3">
                      <span
                        className={[
                          'text-xs px-2 py-1',
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700',
                        ].join(' ')}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="font-serif text-sm text-gray-500 px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
