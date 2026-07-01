'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Button from '@/components/ui/Button'
import type { Order } from '@/types'
import { useTranslations } from 'next-intl'

const BANK_DETAILS = {
  bank: 'Vietcombank',
  accountNumber: '1234567890',
  accountName: "L'ANGELULUS CO. LTD",
  branch: 'Ho Chi Minh City',
}

const vnd = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

export default function ConfirmationPage() {
  const t = useTranslations('confirmation')
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null | undefined>(undefined)

  useEffect(() => {
    if (!orderId) {
      setOrder(null)
      return
    }
    try {
      const stored: Order[] = JSON.parse(localStorage.getItem('langelulus-orders') ?? '[]')
      const found = stored.find((o) => o.id === orderId) ?? null
      setOrder(found)
    } catch {
      setOrder(null)
    }
  }, [orderId])

  if (order === undefined) return null

  if (order === null) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-[120px] text-center">
        <p className="font-serif text-xl text-secondary mb-6">{t('notFound')}</p>
        <Link href="/" className="font-serif text-sm text-accent hover:underline underline-offset-4">
          {t('backToHome')}
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-[120px] lg:py-[140px]">
      {/* Success header */}
      <motion.div {...fadeUp(0)} className="flex flex-col items-center mb-14">
        <CheckIcon />
        <h1 className="font-serif text-6xl lg:text-7xl text-secondary mt-8 mb-3">{t('orderPlaced')}</h1>
        <p className="font-mono text-sm text-gray-400 tracking-wide">{order.id}</p>
      </motion.div>

      {/* Items summary */}
      <motion.section {...fadeUp(0.1)} className="border border-gray-100 rounded-[10px] p-8 shadow-sm bg-gradient-to-b from-white to-gray-50/60 mb-6">
        <h2 className="font-serif text-xl text-secondary mb-5">{t('itemsOrdered')}</h2>
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li key={`${item.product.id}-${item.selectedVolume}`} className="flex justify-between font-serif text-sm text-secondary">
              <span>
                {item.product.name}{' '}
                <span className="text-gray-400">({item.selectedVolume}) × {item.quantity}</span>
              </span>
              <span>{vnd(item.product.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 mt-5 pt-5 space-y-2">
          <div className="flex justify-between font-serif text-sm text-secondary">
            <span>{t('subtotal')}</span>
            <span>{vnd(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between font-serif text-sm text-gray-500">
              <span>{t('discount')} {order.couponCode ? `(${order.couponCode})` : ''}</span>
              <span>−{vnd(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-serif text-base font-semibold text-secondary pt-1">
            <span>{t('total')}</span>
            <span>{vnd(order.total)}</span>
          </div>
        </div>
      </motion.section>

      {/* Recipient info */}
      <motion.section {...fadeUp(0.15)} className="border border-gray-100 rounded-[10px] p-8 shadow-sm bg-gradient-to-b from-white to-gray-50/60 mb-6">
        <h2 className="font-serif text-xl text-secondary mb-5">{t('deliveryDetails')}</h2>
        <dl className="grid grid-cols-2 gap-y-2.5 font-serif text-sm text-secondary">
          <dt className="text-gray-500">{t('name')}</dt>
          <dd>{order.recipient.fullName}</dd>
          <dt className="text-gray-500">{t('phone')}</dt>
          <dd>{order.recipient.phone}</dd>
          <dt className="text-gray-500">{t('email')}</dt>
          <dd>{order.recipient.email}</dd>
          <dt className="text-gray-500">{t('address')}</dt>
          <dd>{[order.recipient.address, order.recipient.ward, order.recipient.district, order.recipient.city].filter(Boolean).join(', ')}</dd>
          {order.recipient.note && (
            <>
              <dt className="text-gray-500">{t('note')}</dt>
              <dd>{order.recipient.note}</dd>
            </>
          )}
          <dt className="text-gray-500">{t('payment')}</dt>
          <dd>{order.paymentMethod === 'cod' ? t('cod') : t('bankTransfer')}</dd>
        </dl>
      </motion.section>

      {/* Bank transfer instructions */}
      {order.paymentMethod === 'bank_transfer' && (
        <motion.section {...fadeUp(0.2)} className="bg-gray-50/80 border border-gray-100 rounded-[10px] p-8 mb-8">
          <h2 className="font-serif text-xl text-secondary mb-4">{t('paymentInstructions')}</h2>
          <p className="font-serif text-sm text-gray-500 mb-5 leading-relaxed">
            {t('transferInstructions')}
          </p>
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
            <div className="flex gap-4">
              <dt className="w-36 text-gray-500">{t('transferNote')}</dt>
              <dd className="text-accent font-semibold">{order.id}</dd>
            </div>
          </dl>
        </motion.section>
      )}

      <motion.div {...fadeUp(0.25)}>
        <Link href="/products">
          <Button variant="primary" size="lg" className="w-full">
            {t('continueShopping')}
          </Button>
        </Link>
      </motion.div>
    </main>
  )
}

function CheckIcon() {
  return (
    <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center">
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
        <path
          d="M2 10l7.5 7.5L24 2"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
