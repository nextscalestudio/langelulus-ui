'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

interface ToastContextValue {
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let _counter = 0

const borderClasses: Record<ToastType, string> = {
  success: 'border-l-4 border-accent',
  error: 'border-l-4 border-red-500',
  info: 'border-l-4 border-secondary',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = ++_counter
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (msg) => addToast('success', msg),
      error: (msg) => addToast('error', msg),
      info: (msg) => addToast('info', msg),
    }),
    [addToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
        role="region"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`bg-white text-secondary font-serif shadow-lg px-4 py-3 min-w-[260px] max-w-sm pointer-events-auto ${borderClasses[t.type]}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
