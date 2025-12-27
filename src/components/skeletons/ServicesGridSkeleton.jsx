export default function ServicesGridSkeleton({ count = 6 }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 animate-pulse">
        {/* Title */}
        <div className="mb-10 text-center">
          <div className="h-6 w-40 bg-gray-200 mx-auto rounded" />
          <div className="h-4 w-56 bg-gray-200 mx-auto mt-3 rounded" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </section>
  );
}
