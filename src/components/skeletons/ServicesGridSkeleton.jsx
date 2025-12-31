export default function ServicesGridSkeleton({ count }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="mb-10 text-center">
          <div className="h-6 w-40 mx-auto rounded skeleton-shimmer" />
          <div className="h-4 w-56 mx-auto mt-3 rounded skeleton-shimmer" />
        </div>

        {/* Skeleton Cards */}
        <div
          className="
            flex gap-5 overflow-x-auto pb-4
            lg:grid lg:grid-cols-4 xl:grid-cols-6 lg:overflow-visible
          "
        >
          {[...Array(count)].map((_, i) => (
            <div
              key={i}
              className="
                h-36 rounded-2xl skeleton-shimmer
                min-w-[160px] sm:min-w-[180px] lg:min-w-0
              "
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
