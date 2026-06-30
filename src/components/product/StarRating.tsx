interface StarRatingProps {
  rating: number
  className?: string
}

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

function starFill(rating: number, index: number): 'full' | 'half' | 'empty' {
  const diff = rating - index
  if (diff >= 1) return 'full'
  if (diff >= 0.5) return 'half'
  return 'empty'
}

export default function StarRating({ rating, className = '' }: StarRatingProps) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = starFill(rating, i)
        return (
          <span key={i} className="relative inline-block w-4 h-4">
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#e5e7eb]" fill="currentColor" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
            {fill !== 'empty' && (
              <span
                className={`absolute inset-0 overflow-hidden ${fill === 'half' ? 'w-1/2' : 'w-full'}`}
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-accent" fill="currentColor" aria-hidden="true">
                  <path d={STAR_PATH} />
                </svg>
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
