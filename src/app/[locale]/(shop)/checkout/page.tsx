'use client'

import { useState } from 'react'
import RecipientForm from '@/components/checkout/RecipientForm'
import CheckoutSummary from '@/components/checkout/CheckoutSummary'
import PaymentSelector from '@/components/checkout/PaymentSelector'
import type { RecipientInfo } from '@/types'

type CheckoutStep = 'form' | 'payment'

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('form')
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo | null>(null)

  const handleFormSubmit = (data: RecipientInfo) => {
    setRecipientInfo(data)
    setStep('payment')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-secondary mb-10">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        <StepDot active={step === 'form'} done={step === 'payment'} label="1. Recipient Info" />
        <div className="flex-1 h-px bg-gray-200" />
        <StepDot active={step === 'payment'} done={false} label="2. Payment" />
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          {step === 'form' && <RecipientForm onSubmit={handleFormSubmit} />}
          {step === 'payment' && recipientInfo && (
            <PaymentSelector
              recipientInfo={recipientInfo}
              onBack={() => setStep('form')}
            />
          )}
        </div>

        <div className="lg:col-span-2 mt-10 lg:mt-0">
          <CheckoutSummary />
        </div>
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
    <span
      className={`font-serif text-sm transition-colors ${
        active
          ? 'text-accent font-bold'
          : done
          ? 'text-secondary'
          : 'text-gray-400'
      }`}
    >
      {label}
    </span>
  )
}
