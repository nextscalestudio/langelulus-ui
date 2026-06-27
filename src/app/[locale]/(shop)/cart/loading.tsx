import Skeleton from '@/components/ui/Skeleton'

export default function CartLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Skeleton className="h-10 w-48 mb-10" />

      <div className="lg:grid lg:grid-cols-5 lg:gap-12">
        {/* Item skeletons */}
        <div className="lg:col-span-3 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 border-b border-gray-200 pb-6">
              <Skeleton className="w-[100px] h-[100px] shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-28" />
              </div>
              <Skeleton className="h-5 w-20 shrink-0" />
            </div>
          ))}
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Summary skeleton */}
        <div className="lg:col-span-2 mt-10 lg:mt-0">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </main>
  )
}
