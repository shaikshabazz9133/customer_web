export default function OffersSkeleton({ count = 2 }) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 animate-pulse">
        {/* Title */}
        <div className="h-6 w-32 bg-gray-200 mb-6 rounded" />

        <div className="flex gap-6 overflow-x-auto">
          {[...Array(count)].map((_, i) => (
            <div
              key={i}
              className="min-w-[85%] sm:min-w-[70%] md:min-w-[520px] lg:min-w-[560px] 
                         h-44 bg-gray-200 rounded-3xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
