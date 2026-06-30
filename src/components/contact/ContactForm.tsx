'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { useTranslations } from 'next-intl'

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  message: string
}

interface FieldErrors {
  fullName?: string
  email?: string
  phone?: string
  message?: string
}

const initialForm: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
}

function makeValidate(errMsgs: Record<string, string>) {
  return function validate(data: ContactFormData): FieldErrors {
    const errors: FieldErrors = {}
    if (!data.fullName.trim()) errors.fullName = errMsgs.fullNameRequired
    if (!data.email.trim()) {
      errors.email = errMsgs.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = errMsgs.emailInvalid
    }
    if (!data.phone.trim()) {
      errors.phone = errMsgs.phoneRequired
    } else if (!/^\d{10}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.phone = errMsgs.phoneInvalid
    }
    if (!data.message.trim()) errors.message = errMsgs.messageRequired
    return errors
  }
}

const inputClass =
  'w-full border border-secondary h-10 px-3 font-serif text-sm text-secondary bg-bg focus:outline-none focus:ring-2 focus:ring-accent'
const textareaClass =
  'w-full border border-secondary h-32 px-3 py-2 font-serif text-sm text-secondary bg-bg focus:outline-none focus:ring-2 focus:ring-accent resize-y'
const labelClass = 'block font-serif text-sm font-bold text-secondary mb-1'

export default function ContactForm() {
  const t = useTranslations('contact')
  const validate = makeValidate({
    fullNameRequired: t('errors.fullNameRequired'),
    emailRequired:   t('errors.emailRequired'),
    emailInvalid:    t('errors.emailInvalid'),
    phoneRequired:   t('errors.phoneRequired'),
    phoneInvalid:    t('errors.phoneInvalid'),
    messageRequired: t('errors.messageRequired'),
  })
  const toast = useToast()
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to send')

      toast.success(t('success'))
      setForm(initialForm)
      setErrors({})
    } catch {
      toast.error(t('error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section>
          <h1 className="font-serif text-[28px] text-secondary mb-8">{t('heading')}</h1>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                {t('fullName')}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass}
                autoComplete="name"
              />
              {errors.fullName && (
                <p className="font-serif text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                {t('email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                autoComplete="email"
              />
              {errors.email && (
                <p className="font-serif text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                {t('phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="font-serif text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={textareaClass}
              />
              {errors.message && (
                <p className="font-serif text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            <Button type="submit" loading={loading}>
              {t('send')}
            </Button>
          </form>
        </section>

        {/* Info + Map */}
        <section className="space-y-6">
          <div className="bg-secondary p-8 space-y-4">
            <h2 className="font-serif text-xl font-bold text-white">{t('infoHeading')}</h2>
            <ul className="font-serif text-sm text-white/90 space-y-3 list-none">
              <li>123 Tran Hung Dao, Hoan Kiem, Hanoi</li>
              <li>+84 900 000 000</li>
              <li>contact@parfum.vn</li>
              <li>Mon–Sat 9am–6pm</li>
            </ul>
          </div>

          <div className="h-64 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1!2d105.8417!3d21.0278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjE!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              loading="lazy"
              title="Store location"
              className="border-0 w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </main>
  )
}
