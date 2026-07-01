'use client'

import { useState } from 'react'
import type { ProductSpecs, UsageGuide } from '@/types'
import { useTranslations } from 'next-intl'

interface ProductSpecsSectionProps {
  specs: ProductSpecs
  usageGuide: UsageGuide
}

function AccordionHeader({
  title,
  open,
  onToggle,
}: {
  title: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-5 text-left"
      aria-expanded={open}
    >
      <span className="font-serif font-bold text-[18px] text-secondary">{title}</span>
      <span className="font-serif text-[18px] text-secondary" aria-hidden="true">
        {open ? '−' : '+'}
      </span>
    </button>
  )
}

function SubHeading({ label }: { label: string }) {
  return (
    <p className="font-bold font-serif text-[14px] uppercase text-accent tracking-wide mt-4 mb-2">
      {label}
    </p>
  )
}

export default function ProductSpecsSection({ specs, usageGuide }: ProductSpecsSectionProps) {
  const t = useTranslations('product')
  const [specsOpen, setSpecsOpen] = useState(false)
  const [usageOpen, setUsageOpen] = useState(false)

  const specRows: { label: string; value: string }[] = [
    { label: t('specs.volume'), value: specs.volume },
    { label: t('specs.concentration'), value: specs.concentration },
    { label: t('specs.origin'), value: specs.origin },
    { label: t('specs.longevity'), value: specs.longevity },
    { label: t('specs.sillage'), value: specs.sillage },
    { label: t('specs.gender'), value: specs.gender },
  ]

  return (
    <div className="flex flex-col">
      {/* Product Specifications accordion */}
      <div className="border-t border-b border-gray-200">
        <AccordionHeader
          title={t('specs.heading')}
          open={specsOpen}
          onToggle={() => setSpecsOpen((o) => !o)}
        />
        {specsOpen && (
          <div className="pb-8">
            <table className="w-full text-[14px]">
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-bg-subtle' : 'bg-transparent'}>
                    <td className="font-serif text-gray-500 py-2 px-3 w-[40%]">{row.label}</td>
                    <td className="font-serif text-secondary py-2 px-3">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Usage Guide accordion */}
      <div className="border-b border-gray-200">
        <AccordionHeader
          title={t('usageGuide.heading')}
          open={usageOpen}
          onToggle={() => setUsageOpen((o) => !o)}
        />
        {usageOpen && (
          <div className="pb-8">
            <SubHeading label={t('usageGuide.sprayPositions')} />
            <ol className="list-decimal list-inside font-serif text-[15px] text-secondary leading-[1.7] space-y-1 pl-1">
              {usageGuide.sprayPositions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>

            <SubHeading label={t('usageGuide.longevityTips')} />
            <ol className="list-decimal list-inside font-serif text-[15px] text-secondary leading-[1.7] space-y-1 pl-1">
              {usageGuide.longevityTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>

            <SubHeading label={t('usageGuide.storageTips')} />
            <ol className="list-decimal list-inside font-serif text-[15px] text-secondary leading-[1.7] space-y-1 pl-1">
              {usageGuide.storageTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
