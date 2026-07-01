'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RecipientForm from '@/components/checkout/RecipientForm'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import PaymentSelector from '@/components/checkout/PaymentSelector'
import type { RecipientInfo } from '@/types'
import { useTranslations } from 'next-intl'

type CheckoutStep = 'form' | 'payment'

export default function CheckoutPage() {
  const t = useTranslations('checkout')
  const [step, setStep] = useState<CheckoutStep>('form')
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo | null>(null)

  const handleFormSubmit = (data: RecipientInfo) => {
    setRecipientInfo(data)
    setStep('payment')
  }

  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-8 py-[120px] lg:py-[160px]">
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="font-serif text-6xl lg:text-7xl text-secondary mb-16"
      >
        {t('heading')}
      </motion.h1>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-3 mb-14"
      >
        <StepDot active={step === 'form'} done={step === 'payment'} label={t('step1')} />
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-gray-100" />
        <StepDot active={step === 'payment'} done={false} label={t('step2')} />
      </motion.div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <RecipientForm onSubmit={handleFormSubmit} />
              </motion.div>
            )}
            {step === 'payment' && recipientInfo && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <PaymentSelector
                  recipientInfo={recipientInfo}
                  onBack={() => setStep('form')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 mt-16 lg:mt-0"
        >
          <CheckoutSummary />
        </motion.div>
      </div>
    </main>
  )
}

interface StepDotProps {
  active: boolean
  done: boolean
  label: string
}

function StepDot({ active, done, label }: StepDotProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
          done
            ? 'border-secondary bg-secondary'
            : active
            ? 'border-secondary bg-white'
            : 'border-gray-200 bg-white'
        }`}
      >
        {done && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
            <path d="M1 3.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {active && <span className="w-2 h-2 rounded-full bg-secondary" />}
      </span>
      <span
        className={`font-serif text-sm tracking-wide transition-colors ${
          active || done ? 'text-secondary font-bold' : 'text-gray-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
