export default function HistoryGridSkeleton() {
  return (
    <div className="bg-white rounded-2xl border p-5 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
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
  );
}
