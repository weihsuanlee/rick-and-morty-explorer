export function CharacterSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div aria-live="polite" aria-busy="true" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" role="status">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`skeleton-${index}`} className="rounded-xl border border-default-200 bg-content1 p-5 shadow-medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-full bg-default-200" />
              <div className="space-y-2">
                <div className="h-4 w-36 animate-pulse rounded-full bg-default-200" />
                <div className="h-3 w-24 animate-pulse rounded-full bg-default-200" />
              </div>
            </div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-default-200" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-default-200" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-default-200" />
            <div className="h-6 w-28 animate-pulse rounded-full bg-default-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
