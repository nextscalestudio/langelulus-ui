interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#e5e7eb] rounded ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  )
}
