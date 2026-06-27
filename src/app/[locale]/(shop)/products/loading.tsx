import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <main className="bg-bg py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-40 mb-6" />
        <div className="flex justify-end mb-8">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
