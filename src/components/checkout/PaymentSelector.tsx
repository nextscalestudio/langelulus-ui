'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from '@/i18n/navigation'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { useCartStore } from '@/lib/store/cart-store'
import type { Order, RecipientInfo } from '@/types'
import { useTranslations } from 'next-intl'

interface PaymentSelectorProps {
  recipientInfo: RecipientInfo
  onBack: () => void
}

type PaymentMethod = 'cod' | 'bank_transfer'

const BANK_DETAILS = {
  bank: 'Vietcombank',
  accountNumber: '1234567890',
  accountName: "L'ANGELULUS CO. LTD",
  branch: 'Ho Chi Minh City',
}

export default function PaymentSelector({ recipientInfo, onBack }: PaymentSelectorProps) {
  const t = useTranslations('checkout')
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
      toast.success(t('copied'))
    } catch {
      toast.error(t('copyFailed'))
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
      const existing = JSON.parse(localStorage.getItem('langelulus-orders') ?? '[]')
      localStorage.setItem('langelulus-orders', JSON.stringify([...existing, order]))

      clearCart()
      router.push(`/checkout/confirmation?orderId=${orderId}`)
    } catch {
      toast.error(t('orderFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <h2 className="font-serif text-2xl tracking-wide text-secondary mb-10">{t('paymentMethod')}</h2>

      <div className="space-y-4 mb-10">
        <PaymentCard
          id="cod"
          label={t('cod')}
          selected={method === 'cod'}
          onSelect={() => setMethod('cod')}
          icon={<TruckIcon />}
        />

        <PaymentCard
          id="bank_transfer"
          label={t('bankTransfer')}
          selected={method === 'bank_transfer'}
          onSelect={() => setMethod('bank_transfer')}
          icon={<BankIcon />}
        />
      </div>

      {method === 'bank_transfer' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50/80 border border-gray-100 rounded-[10px] p-6 mb-10"
        >
          <p className="font-serif text-sm text-secondary mb-5 font-semibold tracking-wide">{t('bankDetails')}</p>
          <dl className="space-y-2 font-mono text-sm text-secondary">
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">{t('bank')}</dt>
              <dd>{BANK_DETAILS.bank}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">{t('accountNumber')}</dt>
              <dd>{BANK_DETAILS.accountNumber}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">{t('accountName')}</dt>
              <dd>{BANK_DETAILS.accountName}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">{t('branch')}</dt>
              <dd>{BANK_DETAILS.branch}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={handleCopyAccount}
            className="mt-4 font-serif text-xs text-accent hover:underline underline-offset-4 transition-all duration-200"
          >
            {t('copyAccountNumber')}
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
          onClick={handlePlaceOrder}
        >
          {t('placeOrder')}
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={onBack}
          disabled={loading}
        >
          {t('backToInfo')}
        </Button>
      </div>
    </motion.div>
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
      className={`w-full flex items-center gap-4 p-5 border rounded-[10px] transition-all duration-200 text-left ${
        selected
          ? 'border-secondary bg-gray-50/60 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Radio indicator */}
      <span
        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${
          selected ? 'border-secondary' : 'border-gray-300'
        }`}
      >
        {selected && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
      </span>

      <span className={`shrink-0 transition-colors duration-200 ${selected ? 'text-secondary' : 'text-gray-400'}`}>
        {icon}
      </span>

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
