export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Featured hero skeleton */}
      <div className="w-full h-[480px] md:h-[620px] bg-secondary/10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 py-[60px] lg:py-[120px]">
        {/* Category tabs skeleton */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-secondary/10 animate-pulse rounded-[8px] shrink-0" />
          ))}
        </div>

        <div className="flex gap-12">
          {/* Grid skeleton */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video w-full bg-secondary/10 animate-pulse rounded-[10px]" />
                <div className="h-4 w-16 bg-secondary/10 animate-pulse rounded" />
                <div className="h-5 w-full bg-secondary/10 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-secondary/10 animate-pulse rounded" />
                <div className="h-3 w-24 bg-secondary/10 animate-pulse rounded" />
              </div>
            ))}
          </div>

          {/* Sidebar skeleton */}
          <div className="w-[280px] shrink-0 hidden lg:block space-y-4">
            <div className="h-3 w-24 bg-secondary/10 animate-pulse rounded" />
            <div className="border-b border-gray-100 pb-3 mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-secondary/10 animate-pulse rounded" />
            ))}
            <div className="h-3 w-20 bg-secondary/10 animate-pulse rounded mt-8" />
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-20 bg-secondary/10 animate-pulse rounded-[8px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
