'use client'

import { useEffect, useState } from 'react'
import { promos } from '@/data/promos'

export default function PromoStrip() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % promos.length)
        setVisible(true)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const item = promos[current]

  return (
    <div className="bg-accent h-[44px] flex items-center justify-center px-4">
      <p
        className={`font-serif text-[14px] text-white text-center transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {item.message}
        {item.code && <span className="ml-2 font-bold">{item.code}</span>}
      </p>
    </div>
  )
}
