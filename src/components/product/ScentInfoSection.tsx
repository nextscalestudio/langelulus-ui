'use client'

import { useState } from 'react'
import type { ScentProfile } from '@/types'
import { useTranslations } from 'next-intl'

interface ScentInfoSectionProps {
  scentProfile: ScentProfile
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block border border-accent text-accent text-[13px] font-serif px-2.5 py-0.5 rounded-full">
      {label}
    </span>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif uppercase text-[12px] text-secondary/45 tracking-wide mb-1">{label}</p>
      <p className="font-serif text-[15px] text-secondary leading-[1.7]">{value}</p>
    </div>
  )
}

export default function ScentInfoSection({ scentProfile }: ScentInfoSectionProps) {
  const t = useTranslations('product.scentInfo')
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between py-5 text-left"
          aria-expanded={open}
        >
          <span className="font-serif font-bold text-[18px] text-secondary">{t('heading')}</span>
          <span className="font-serif text-[18px] text-secondary" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </button>

        {open && (
          <div className="pb-8 flex flex-col gap-8">
            <Field label={t('fragranceFamily')} value={scentProfile.family} />

            <div>
              <p className="font-serif uppercase text-[12px] text-secondary/45 tracking-wide mb-3">
                {t('fragranceNotes')}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {(
                  [
                    { key: 'top' as const, notes: scentProfile.notes.top },
                    { key: 'middle' as const, notes: scentProfile.notes.middle },
                    { key: 'base' as const, notes: scentProfile.notes.base },
                  ]
                ).map(({ key, notes }) => (
                  <div key={key}>
                    <p className="font-serif uppercase text-[12px] text-secondary/45 tracking-wide mb-2">
                      {t(key)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {notes.map((note) => (
                        <Tag key={note} label={note} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Field label={t('style')} value={scentProfile.style} />

            <div>
              <p className="font-serif uppercase text-[12px] text-secondary/45 tracking-wide mb-2">
                {t('occasion')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {scentProfile.occasion.map((occ) => (
                  <Tag key={occ} label={occ} />
                ))}
              </div>
            </div>

            <Field label={t('emotionalDescription')} value={scentProfile.emotionalDescription} />
            <Field label={t('targetAudience')} value={scentProfile.targetAudience} />
            <Field label={t('feeling')} value={scentProfile.feeling} />
          </div>
        )}
      </div>
    </>
  )
}
