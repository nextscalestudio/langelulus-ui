export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero skeleton */}
      <div className="w-full h-[480px] md:h-[640px] bg-secondary/10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 py-[60px] lg:py-[120px]">
        <div className="flex gap-12">
          {/* TOC skeleton (desktop) */}
          <div className="hidden lg:block w-56 shrink-0 space-y-4">
            <div className="h-3 w-20 bg-secondary/10 animate-pulse rounded" />
            <div className="border-b border-gray-100" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 w-full bg-secondary/10 animate-pulse rounded" />
            ))}
          </div>

          {/* Article skeleton */}
          <div className="flex-1 space-y-6 max-w-prose">
            <div className="h-6 w-24 bg-secondary/10 animate-pulse rounded" />
            <div className="h-12 w-full bg-secondary/10 animate-pulse rounded" />
            <div className="h-10 w-3/4 bg-secondary/10 animate-pulse rounded" />
            <div className="h-4 w-48 bg-secondary/10 animate-pulse rounded" />
            <div className="space-y-3 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-secondary/10 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
