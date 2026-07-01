'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface AboutPageShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function AboutPageShell({ title, subtitle, children }: AboutPageShellProps) {
  return (
    <>
      {/* Hero — full-bleed with gradient fade to white */}
      <div className="relative h-[60vh] min-h-[480px] flex items-center justify-center">
        <Image
          src="/images/about/hero.jpg"
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/55" />

        {/* Gradient fade at bottom into page */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-[56px] md:text-[72px] lg:text-[80px] leading-[1.1] text-white"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-xl text-white/75 mt-4"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-4xl mx-auto px-6 py-[80px] md:py-[130px]"
      >
        {children}
      </motion.div>
    </>
  )
}
