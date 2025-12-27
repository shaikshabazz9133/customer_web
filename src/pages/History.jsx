import { useEffect, useState } from "react";
import HistoryGridCard from "../components/history/HistoryGridCard";
import HistoryGridSkeleton from "../components/history/HistoryGridSkeleton";

export default function History() {
  const [loading, setLoading] = useState(true);
  const [historyList, setHistoryList] = useState([]);

  // ✅ skeleton count based on expected data
  const skeletonCount = historyList.length || 3;

  useEffect(() => {
    setLoading(true);

    // simulate API call
    const timer = setTimeout(() => {
      setHistoryList([
        {
          id: "736325",
          service: "AC Full Service",
          subService: "AC service",
          date: "10/12/2025",
          time: "09:00 AM",
          amount: 2076,
          status: "completed",
        },
        {
          id: "271800",
          service: "AC Full Service",
          subService: "Outdoor service",
          date: "1/12/2025",
          time: "06:00 PM",
          amount: 1767,
          status: "completed",
        },
        {
          id: "247758",
          service: "AC Full Service",
          subService: "AC service",
          date: "1/12/2025",
          time: "05:00 PM",
          amount: 2808,
          status: "completed",
        },
      ]);

      setLoading(false);
    }, 800); // 👈 skeleton visible for UX

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">History</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? [...Array(skeletonCount)].map((_, i) => <HistoryGridSkeleton key={i} />)
          : historyList.map((item, index) => (
              <HistoryGridCard key={item.id} item={item} index={index} />
            ))}
      </div>
    </section>
  );
}
