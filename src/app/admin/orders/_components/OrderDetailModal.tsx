'use client'

import Modal from '@/components/ui/Modal'
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

const STATUS_OPTIONS: Order['status'][] = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

interface OrderDetailModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (id: string, status: Order['status']) => void
}

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
}: OrderDetailModalProps) {
  if (!order) return null

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(order.id, e.target.value as Order['status'])
  }

  const paymentLabel =
    order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order #${order.id}`}>
      <div className="overflow-y-auto max-h-[65vh] space-y-5 pr-1">
        {/* Meta row */}
        <div className="font-serif text-sm text-gray-500 space-y-0.5">
          <p>Date: {formatDate(order.createdAt)}</p>
          <p>Payment: {paymentLabel}</p>
          {order.couponCode && <p>Coupon: {order.couponCode}</p>}
        </div>

        {/* Status dropdown */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="od-status"
            className="font-serif text-sm text-secondary shrink-0"
          >
            Status:
          </label>
          <select
            id="od-status"
            value={order.status}
            onChange={handleStatusChange}
            className="border border-secondary px-2 py-1 font-serif text-sm text-secondary outline-none focus:ring-1 focus:ring-accent"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        {/* Items */}
        <section>
          <h3 className="font-serif text-sm font-bold text-secondary mb-2">Items</h3>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between font-serif text-sm text-secondary border-b border-gray-100 pb-2"
              >
                <div>
                  <p>{item.product.name}</p>
                  <p className="text-gray-500 text-xs">
                    {item.selectedVolume} × {item.quantity}
                  </p>
                </div>
                <p className="whitespace-nowrap ml-4">
                  {vnd(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recipient */}
        <section>
          <h3 className="font-serif text-sm font-bold text-secondary mb-2">Recipient</h3>
          <div className="font-serif text-sm space-y-0.5">
            <p className="text-secondary">{order.recipient.fullName}</p>
            <p className="text-gray-500">{order.recipient.phone}</p>
            <p className="text-gray-500">{order.recipient.email}</p>
            <p className="text-gray-500">
              {order.recipient.address}, {order.recipient.ward},{' '}
              {order.recipient.district}, {order.recipient.city}
            </p>
            {order.recipient.note && (
              <p className="text-gray-500">Note: {order.recipient.note}</p>
            )}
          </div>
        </section>

        {/* Totals */}
        <section className="border-t border-gray-200 pt-3 space-y-1">
          <div className="flex justify-between font-serif text-sm text-secondary">
            <span>Subtotal</span>
            <span>{vnd(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between font-serif text-sm text-green-600">
              <span>Discount</span>
              <span>−{vnd(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-serif text-base font-bold text-secondary border-t border-gray-200 pt-1 mt-1">
            <span>Total</span>
            <span>{vnd(order.total)}</span>
          </div>
        </section>
      </div>
    </Modal>
  )
}
