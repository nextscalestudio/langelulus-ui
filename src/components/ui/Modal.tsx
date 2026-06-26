'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 bg-white shadow-xl max-w-lg w-full mx-4 p-6">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-secondary hover:text-accent text-xl leading-none"
        >
          ✕
        </button>
        {title && (
          <h2 id="modal-title" className="font-serif text-xl font-bold text-secondary mb-4 pr-8">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body
  )
}
