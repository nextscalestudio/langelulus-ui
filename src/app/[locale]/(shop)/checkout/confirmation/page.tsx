'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Button from '@/components/ui/Button'
import type { Order } from '@/types'
import { useTranslations } from 'next-intl'

const BANK_DETAILS = {
  bank: 'Vietcombank',
  accountNumber: '1234567890',
  accountName: 'PARFUM CO. LTD',
  branch: 'Ho Chi Minh City',
}

const vnd = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

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
      const stored: Order[] = JSON.parse(localStorage.getItem('parfum-orders') ?? '[]')
      const found = stored.find((o) => o.id === orderId) ?? null
      setOrder(found)
    } catch {
      setOrder(null)
    }
  }, [orderId])

  // Still loading
  if (order === undefined) return null

  // Not found fallback
  if (order === null) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-xl text-secondary mb-6">{t('notFound')}</p>
        <Link href="/" className="font-serif text-sm text-accent hover:underline">
          {t('backToHome')}
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      {/* Success header */}
      <div className="flex flex-col items-center mb-10">
        <CheckIcon />
        <h1 className="font-serif text-4xl text-secondary mt-4 mb-2">{t('orderPlaced')}</h1>
        <p className="font-mono text-sm text-gray-500">{order.id}</p>
      </div>

      {/* Items summary */}
      <section className="border border-gray-200 p-6 mb-6">
        <h2 className="font-serif text-lg text-secondary mb-4">{t('itemsOrdered')}</h2>
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li key={`${item.product.id}-${item.selectedVolume}`} className="flex justify-between font-serif text-sm text-secondary">
              <span>
                {item.product.name}{' '}
                <span className="text-gray-500">({item.selectedVolume}) × {item.quantity}</span>
              </span>
              <span>{vnd(item.product.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 mt-4 pt-4 space-y-1">
          <div className="flex justify-between font-serif text-sm text-secondary">
            <span>{t('subtotal')}</span>
            <span>{vnd(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between font-serif text-sm text-accent">
              <span>{t('discount')} {order.couponCode ? `(${order.couponCode})` : ''}</span>
              <span>−{vnd(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-serif text-base font-semibold text-secondary pt-1">
            <span>{t('total')}</span>
            <span>{vnd(order.total)}</span>
          </div>
        </div>
      </section>

      {/* Recipient info */}
      <section className="border border-gray-200 p-6 mb-6">
        <h2 className="font-serif text-lg text-secondary mb-4">{t('deliveryDetails')}</h2>
        <dl className="grid grid-cols-2 gap-y-2 font-serif text-sm text-secondary">
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
      </section>

      {/* Bank transfer instructions */}
      {order.paymentMethod === 'bank_transfer' && (
        <section className="bg-[#f9f9f9] border border-gray-200 p-6 mb-8">
          <h2 className="font-serif text-lg text-secondary mb-3">{t('paymentInstructions')}</h2>
          <p className="font-serif text-sm text-gray-600 mb-4">
            {t('transferInstructions')}
          </p>
          <dl className="space-y-1.5 font-mono text-sm text-secondary">
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
              <dd className="text-accent">{order.id}</dd>
            </div>
          </dl>
        </section>
      )}

      <Link href="/products">
        <Button variant="primary" size="lg" className="w-full">
          {t('continueShopping')}
        </Button>
      </Link>
    </main>
  )
}

function CheckIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke="#0000ff" strokeWidth="2" />
      <path
        d="M20 32l9 9 15-16"
        stroke="#0000ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
