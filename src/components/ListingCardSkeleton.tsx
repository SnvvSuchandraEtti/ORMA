export function ListingCardSkeleton() {
  return (
    <div className="block">
      {/* Image skeleton */}
      <div className="aspect-card rounded-xl shimmer" />
      {/* Text skeletons */}
      <div className="mt-2.5 space-y-2">
        <div className="h-4 w-3/5 rounded shimmer" />
        <div className="h-3.5 w-4/5 rounded shimmer" />
        <div className="h-3 w-2/5 rounded shimmer" />
        <div className="h-4 w-1/3 rounded shimmer" />
      </div>
    </div>
  )
}

interface SkeletonGridProps {
  count?: number
}

export function SkeletonGrid({ count = 8 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  )
}
