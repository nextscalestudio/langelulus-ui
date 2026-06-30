interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full bg-accent text-white font-serif text-[12px] leading-tight ${className}`}
    >
      {children}
    </span>
  )
}
