'use client'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-button-primary text-white shadow-button hover:shadow-button-hover hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-secondary text-white shadow-soft hover:shadow-soft-lg hover:bg-secondary/90 active:scale-[0.98]',
  outline:
    'border border-secondary/20 text-secondary bg-transparent hover:border-secondary/40 hover:bg-secondary/[0.03] active:scale-[0.98]',
  ghost:
    'text-accent hover:opacity-70 bg-transparent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wide',
  md: 'px-6 py-2.5 text-sm tracking-wide',
  lg: 'px-8 py-3.5 text-sm tracking-wide',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  onClick,
  className = '',
  type = 'button',
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 font-sans font-medium rounded-full transition-all duration-300 ease-luxury ${variantClasses[variant]} ${sizeClasses[size]} disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
