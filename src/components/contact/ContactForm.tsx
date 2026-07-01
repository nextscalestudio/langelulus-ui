'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeInView } from '@/components/FadeInView'
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
  'w-full border-b border-secondary/20 h-12 px-0 font-serif text-base text-secondary bg-transparent focus:outline-none focus:border-secondary transition-colors duration-300'
const textareaClass =
  'w-full border-b border-secondary/20 px-0 py-3 font-serif text-base text-secondary bg-transparent focus:outline-none focus:border-secondary transition-colors duration-300 resize-none h-36'
const labelClass =
  'block font-serif text-xs tracking-[0.2em] uppercase text-secondary/45 mb-2'

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
    <>
      {/* Hero */}
      <div className="pt-[120px] md:pt-[160px] pb-[60px] md:pb-[80px] px-6 text-center border-b border-secondary/10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-xs tracking-[0.3em] uppercase text-secondary/35 block mb-6"
        >
          Contact
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[56px] md:text-[72px] lg:text-[80px] leading-[1.05] text-secondary"
        >
          {t('heading')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[18px] md:text-[22px] text-secondary/50 mt-6 max-w-xl mx-auto leading-relaxed"
        >
          {t('subheading')}
        </motion.p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-[60px] md:py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-16 lg:gap-24">

          {/* Form */}
          <FadeInView delay={0}>
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              <FadeInView delay={0.05}>
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
                    <p className="font-serif text-sm text-red-400 mt-2">{errors.fullName}</p>
                  )}
                </div>
              </FadeInView>

              <FadeInView delay={0.1}>
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
                    <p className="font-serif text-sm text-red-400 mt-2">{errors.email}</p>
                  )}
                </div>
              </FadeInView>

              <FadeInView delay={0.15}>
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
                    <p className="font-serif text-sm text-red-400 mt-2">{errors.phone}</p>
                  )}
                </div>
              </FadeInView>

              <FadeInView delay={0.2}>
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
                    <p className="font-serif text-sm text-red-400 mt-2">{errors.message}</p>
                  )}
                </div>
              </FadeInView>

              <FadeInView delay={0.25}>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  loading={loading}
                  className="w-full font-serif tracking-[0.2em] uppercase rounded-[10px]"
                >
                  {t('send')}
                </Button>
              </FadeInView>
            </form>
          </FadeInView>

          {/* Info + Map */}
          <FadeInView delay={0.25}>
            <div className="space-y-12">
              {/* Info — editorial left-border treatment */}
              <div className="border-l-2 border-secondary/20 pl-8 space-y-6">
                <h2 className="font-serif text-[24px] md:text-[28px] text-secondary leading-tight">
                  {t('infoHeading')}
                </h2>
                <ul className="font-serif text-base text-secondary/60 space-y-4 list-none">
                  <li>123 Tran Hung Dao, Hoan Kiem, Hanoi</li>
                  <li>+84 900 000 000</li>
                  <li>hello@langelulus.com</li>
                  <li>Mon–Sat 9am–6pm</li>
                </ul>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1!2d105.8417!3d21.0278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjE!5e0!3m2!1sen!2s!4v1"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Store location"
                  className="border-0 w-full h-full grayscale"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
    </>
  )
}
