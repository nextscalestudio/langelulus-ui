'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { promos } from '@/data/promos'
import { slideDown } from '@/lib/animations'

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
    <motion.div
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className="relative z-[1] bg-bg-subtle border-b border-border h-9 flex items-center justify-center px-6"
    >
      <p
        className={`font-sans text-xs text-muted text-center tracking-wide transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {item.message}
        {item.code && <span className="ml-2 text-secondary font-medium">{item.code}</span>}
      </p>
    </motion.div>
  )
}
