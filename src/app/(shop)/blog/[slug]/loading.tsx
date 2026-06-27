export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero skeleton */}
      <div className="w-full aspect-video max-h-80 bg-secondary/10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* TOC skeleton (desktop) */}
          <div className="hidden lg:block w-56 shrink-0 space-y-3">
            <div className="h-4 w-20 bg-secondary/10 animate-pulse" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 w-full bg-secondary/10 animate-pulse" />
            ))}
          </div>

          {/* Article skeleton */}
          <div className="flex-1 space-y-4 max-w-prose">
            <div className="h-5 w-24 bg-secondary/10 animate-pulse" />
            <div className="h-10 w-full bg-secondary/10 animate-pulse" />
            <div className="h-4 w-48 bg-secondary/10 animate-pulse" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-secondary/10 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
