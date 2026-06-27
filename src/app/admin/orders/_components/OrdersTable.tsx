'use client'

import type { Order } from '@/types'

const vnd = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

function formatDate(iso: string): string {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const STATUS_BADGE_CLASS: Record<Order['status'], string> = {
  pending: 'bg-amber-500 text-white',
  processing: 'bg-blue-500 text-white',
  shipped: 'bg-violet-500 text-white',
  delivered: 'bg-green-500 text-white',
  cancelled: 'bg-red-500 text-white',
}

interface OrdersTableProps {
  orders: Order[]
  onView: (order: Order) => void
}

export default function OrdersTable({ orders, onView }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <p className="font-serif text-sm text-gray-500 py-6 text-center">No orders found.</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-secondary text-white">
            {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map((h) => (
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
          {orders.map((order, idx) => (
            <tr
              key={order.id}
              className={[
                'border-b border-gray-200 hover:bg-[#f0f0f0] transition-colors',
                idx % 2 === 1 ? 'bg-gray-50' : 'bg-white',
              ].join(' ')}
            >
              <td className="font-mono text-xs text-secondary px-4 py-3 max-w-[120px] truncate">
                {order.id}
              </td>
              <td className="font-serif text-sm text-secondary px-4 py-3">
                {order.recipient.fullName}
              </td>
              <td className="font-serif text-sm text-secondary px-4 py-3 whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
              <td className="font-serif text-sm text-secondary px-4 py-3 text-center">
                {order.items.reduce((sum, i) => sum + i.quantity, 0)}
              </td>
              <td className="font-serif text-sm text-secondary px-4 py-3 whitespace-nowrap">
                {vnd(order.total)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full font-serif ${STATUS_BADGE_CLASS[order.status]}`}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => onView(order)}
                  className="font-serif text-sm text-accent hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
