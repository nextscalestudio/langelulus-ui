interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full bg-secondary/[0.06] text-secondary font-sans text-xs font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}
