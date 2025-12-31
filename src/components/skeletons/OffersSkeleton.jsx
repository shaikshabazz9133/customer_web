export default function OffersSkeleton({ count  }) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="h-6 w-32 mb-6 rounded skeleton-shimmer" />

        <div className="flex gap-6 overflow-x-auto">
          {[...Array(count)].map((_, i) => (
            <div
              key={i}
              className="
                min-w-[85%] sm:min-w-[70%] md:min-w-[520px] lg:min-w-[560px]
                h-44 rounded-3xl skeleton-shimmer
              "
              style={{ animationDelay: `${i * 150}ms` }} // ✅ slow stagger
            />
          ))}
        </div>
      </div>
    </section>
  );
}
