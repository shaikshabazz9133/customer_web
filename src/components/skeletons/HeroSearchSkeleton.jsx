export default function HeroSearchSkeleton() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-center animate-pulse">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-80 bg-gray-200 rounded" />
          <div className="h-12 w-full max-w-md bg-gray-200 rounded-full" />
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block">
          <div className="w-full h-80 bg-gray-200 rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
