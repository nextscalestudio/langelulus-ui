import Skeleton from '@/components/ui/Skeleton'

export default function CartLoading() {
  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-8 py-[120px] lg:py-[160px]">
      <Skeleton className="h-16 w-64 mb-16" />

      <div className="lg:grid lg:grid-cols-5 lg:gap-16">
        {/* Item skeletons */}
        <div className="lg:col-span-3 divide-y divide-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6 py-8">
              <Skeleton className="w-[110px] h-[110px] shrink-0 rounded-[8px]" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-28 mt-2" />
              </div>
              <Skeleton className="h-5 w-20 shrink-0" />
            </div>
          ))}
          <Skeleton className="h-12 w-full mt-10 rounded-[8px]" />
        </div>

        {/* Summary skeleton */}
        <div className="lg:col-span-2 mt-16 lg:mt-0">
          <Skeleton className="h-72 w-full rounded-[10px]" />
        </div>
      </div>
    </main>
  )
}
