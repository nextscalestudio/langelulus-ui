'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import Button from '@/components/ui/Button'
import type { RecipientInfo } from '@/types'
import { useTranslations } from 'next-intl'

const ADDRESS_DATA: Record<string, Record<string, string[]>> = {
  'Hà Nội': {
    'Ba Đình': ['Phúc Xá', 'Trúc Bạch', 'Vĩnh Phúc'],
    'Hoàn Kiếm': ['Hàng Bạc', 'Hàng Bài', 'Hàng Bông'],
    'Cầu Giấy': ['Dịch Vọng', 'Quan Hoa', 'Trung Hòa'],
  },
  'TP. Hồ Chí Minh': {
    'Quận 1': ['Bến Nghé', 'Bến Thành', 'Cầu Kho'],
    'Quận 3': ['Phường 1', 'Phường 2', 'Phường 3'],
    'Bình Thạnh': ['Phường 1', 'Phường 13', 'Phường 25'],
  },
  'Đà Nẵng': {
    'Hải Châu': ['Bình Hiên', 'Bình Thuận', 'Hải Châu I'],
    'Thanh Khê': ['An Khê', 'Chính Gián', 'Hòa Khê'],
  },
  'Hải Phòng': {
    'Hồng Bàng': ['Hoàng Văn Thụ', 'Minh Khai', 'Phan Bội Châu'],
    'Lê Chân': ['An Biên', 'An Dương', 'Cát Dài'],
  },
  'Cần Thơ': {
    'Ninh Kiều': ['An Bình', 'An Cư', 'An Hòa'],
    'Bình Thủy': ['Bình Thủy', 'Long Hòa', 'Long Tuyền'],
  },
}

type FormErrors = Partial<Record<keyof RecipientInfo, string>>

const PHONE_RE = /^0\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function makeValidate(errMsgs: Record<string, string>) {
  return function validate(data: RecipientInfo): FormErrors {
    const errors: FormErrors = {}
    if (!data.fullName.trim() || data.fullName.trim().length < 2) errors.fullName = errMsgs.fullName
    if (!PHONE_RE.test(data.phone))                                 errors.phone    = errMsgs.phone
    if (!EMAIL_RE.test(data.email))                                 errors.email    = errMsgs.email
    if (!data.address.trim())                                       errors.address  = errMsgs.address
    if (!data.city)                                                 errors.city     = errMsgs.city
    if (!data.district)                                             errors.district = errMsgs.district
    if (!data.ward)                                                 errors.ward     = errMsgs.ward
    return errors
  }
}

interface Props {
  onSubmit: (data: RecipientInfo) => void
}

const EMPTY: RecipientInfo = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  district: '',
  ward: '',
  note: '',
}

export default function RecipientForm({ onSubmit }: Props) {
  const t = useTranslations('checkout')
  const validate = makeValidate({
    fullName: t('errors.fullName'),
    phone:    t('errors.phone'),
    email:    t('errors.email'),
    address:  t('errors.address'),
    city:     t('errors.city'),
    district: t('errors.district'),
    ward:     t('errors.ward'),
  })
  const [form, setForm] = useState<RecipientInfo>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})

  const cities = Object.keys(ADDRESS_DATA)
  const districts = form.city ? Object.keys(ADDRESS_DATA[form.city] ?? {}) : []
  const wards = form.city && form.district ? (ADDRESS_DATA[form.city]?.[form.district] ?? []) : []

  const set = (field: keyof RecipientInfo, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'city') { next.district = ''; next.ward = '' }
      if (field === 'district') { next.ward = '' }
      return next
    })
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(form)
  }

  const fieldClass =
    'w-full h-10 border border-secondary px-3 font-serif text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent'

  const labelClass = 'block font-serif font-bold text-sm text-secondary mb-1'

  const Required = () => <span className="text-red-500 ml-0.5">*</span>

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="font-serif text-2xl text-secondary mb-6">{t('recipientInfo')}</h2>

      <div className="space-y-4">
        {/* Full name */}
        <div>
          <label htmlFor="fullName" className={labelClass}>
            {t('fullName')} <Required />
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            className={fieldClass}
            placeholder="Nguyễn Văn A"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t('phone')} <Required />
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            className={fieldClass}
            placeholder="0912345678"
            maxLength={10}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            {t('email')} <Required />
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className={fieldClass}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className={labelClass}>
            {t('streetAddress')} <Required />
          </label>
          <input
            id="address"
            type="text"
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            className={fieldClass}
            placeholder="12 Nguyễn Huệ"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className={labelClass}>
            {t('city')} <Required />
          </label>
          <select
            id="city"
            value={form.city}
            onChange={(e) => set('city', e.target.value)}
            className={`${fieldClass} bg-white`}
          >
            <option value="">{t('selectCity')}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label htmlFor="district" className={labelClass}>
            {t('district')} <Required />
          </label>
          <select
            id="district"
            value={form.district}
            onChange={(e) => set('district', e.target.value)}
            disabled={!form.city}
            className={`${fieldClass} bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="">{t('selectDistrict')}</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.district && (
            <p className="mt-1 text-xs text-red-500">{errors.district}</p>
          )}
        </div>

        {/* Ward */}
        <div>
          <label htmlFor="ward" className={labelClass}>
            {t('ward')} <Required />
          </label>
          <select
            id="ward"
            value={form.ward}
            onChange={(e) => set('ward', e.target.value)}
            disabled={!form.district}
            className={`${fieldClass} bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="">{t('selectWard')}</option>
            {wards.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
          {errors.ward && (
            <p className="mt-1 text-xs text-red-500">{errors.ward}</p>
          )}
        </div>

        {/* Note */}
        <div>
          <label htmlFor="note" className={labelClass}>
            {t('orderNote')}
          </label>
          <textarea
            id="note"
            value={form.note ?? ''}
            onChange={(e) => set('note', e.target.value)}
            rows={3}
            className="w-full border border-secondary px-3 py-2 font-serif text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder={t('notePlaceholder')}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <Link
          href="/cart"
          className="font-serif text-sm text-secondary hover:text-accent transition-colors"
        >
          {t('backToCart')}
        </Link>
        <Button type="submit" variant="primary">
          {t('continueToPayment')}
        </Button>
      </div>
    </form>
  )
}
