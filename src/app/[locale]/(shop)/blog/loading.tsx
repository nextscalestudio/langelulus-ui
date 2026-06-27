export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Featured banner skeleton */}
      <div className="w-full h-64 bg-secondary/10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category tabs skeleton */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-secondary/10 animate-pulse shrink-0" />
          ))}
        </div>

        <div className="flex gap-10">
          {/* Grid skeleton */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-video w-full bg-secondary/10 animate-pulse" />
                <div className="h-4 w-16 bg-secondary/10 animate-pulse" />
                <div className="h-5 w-full bg-secondary/10 animate-pulse" />
                <div className="h-4 w-3/4 bg-secondary/10 animate-pulse" />
                <div className="h-3 w-24 bg-secondary/10 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Sidebar skeleton */}
          <div className="w-[280px] shrink-0 hidden lg:block space-y-6">
            <div className="h-5 w-24 bg-secondary/10 animate-pulse" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-secondary/10 animate-pulse" />
            ))}
            <div className="h-5 w-24 bg-secondary/10 animate-pulse mt-4" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-7 w-20 bg-secondary/10 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
