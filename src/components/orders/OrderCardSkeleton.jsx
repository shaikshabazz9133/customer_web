export default function OrderGridSkeleton() {
  return (
    <div className="relative bg-white rounded-2xl border p-5 overflow-hidden">
      {/* SHIMMER OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-l
          from-transparent via-white/70 to-transparent
          animate-[shimmer-rtl_1.4s_infinite]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="h-4 w-36 bg-gray-200 rounded mb-3" />
        <div className="h-3 w-24 bg-gray-200 rounded mb-4" />

        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        <div className="flex justify-between mt-5">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
