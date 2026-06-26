'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { useCartStore } from '@/lib/store/cart-store'
import type { Order, RecipientInfo } from '@/types'

interface PaymentSelectorProps {
  recipientInfo: RecipientInfo
  onBack: () => void
}

type PaymentMethod = 'cod' | 'bank_transfer'

const BANK_DETAILS = {
  bank: 'Vietcombank',
  accountNumber: '1234567890',
  accountName: 'PARFUM CO. LTD',
  branch: 'Ho Chi Minh City',
}

export default function PaymentSelector({ recipientInfo, onBack }: PaymentSelectorProps) {
  const [method, setMethod] = useState<PaymentMethod>('cod')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const { items, coupon, clearCart } = useCartStore()

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount =
    coupon
      ? coupon.discountType === 'percentage'
        ? Math.round((subtotal * coupon.discountValue) / 100)
        : coupon.discountValue
      : 0
  const total = subtotal - discount

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK_DETAILS.accountNumber)
      toast.success('Copied!')
    } catch {
      toast.error('Could not copy to clipboard.')
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const orderId = `ORD-${Date.now()}`
      const order: Order = {
        id: orderId,
        items,
        recipient: recipientInfo,
        paymentMethod: method,
        status: 'pending',
        subtotal,
        discount,
        total,
        couponCode: coupon?.code,
        createdAt: new Date().toISOString(),
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })

      if (!res.ok) throw new Error('Order failed')

      // Mock persistence — store in localStorage for confirmation page
      const existing = JSON.parse(localStorage.getItem('parfum-orders') ?? '[]')
      localStorage.setItem('parfum-orders', JSON.stringify([...existing, order]))

      clearCart()
      router.push(`/checkout/confirmation?orderId=${orderId}`)
    } catch {
      toast.error('Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-secondary mb-6">Payment Method</h2>

      <div className="space-y-3 mb-8">
        <PaymentCard
          id="cod"
          label="Cash on Delivery"
          selected={method === 'cod'}
          onSelect={() => setMethod('cod')}
          icon={<TruckIcon />}
        />

        <PaymentCard
          id="bank_transfer"
          label="Bank Transfer"
          selected={method === 'bank_transfer'}
          onSelect={() => setMethod('bank_transfer')}
          icon={<BankIcon />}
        />
      </div>

      {method === 'bank_transfer' && (
        <div className="bg-[#f9f9f9] border border-gray-200 p-5 mb-8">
          <p className="font-serif text-sm text-secondary mb-3 font-semibold">Bank Account Details</p>
          <dl className="space-y-1.5 font-mono text-sm text-secondary">
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">Bank</dt>
              <dd>{BANK_DETAILS.bank}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">Account Number</dt>
              <dd>{BANK_DETAILS.accountNumber}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">Account Name</dt>
              <dd>{BANK_DETAILS.accountName}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">Branch</dt>
              <dd>{BANK_DETAILS.branch}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={handleCopyAccount}
            className="mt-3 font-serif text-xs text-accent hover:underline"
          >
            Copy account number
          </button>
        </div>
      )}

      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={onBack}
          disabled={loading}
        >
          ← Back to Info
        </Button>
      </div>
    </div>
  )
}

interface PaymentCardProps {
  id: PaymentMethod
  label: string
  selected: boolean
  onSelect: () => void
  icon: React.ReactNode
}

function PaymentCard({ label, selected, onSelect, icon }: PaymentCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-4 p-4 border transition-colors text-left ${
        selected
          ? 'border-accent bg-[rgba(0,0,255,0.03)]'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Radio indicator */}
      <span
        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
          selected ? 'border-accent' : 'border-gray-400'
        }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-accent" />}
      </span>

      <span className="text-accent shrink-0">{icon}</span>

      <span className="font-serif text-sm text-secondary">{label}</span>
    </button>
  )
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 3h13v13H1z" />
      <path d="M14 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="1" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  )
}
