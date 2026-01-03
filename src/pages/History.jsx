import { useEffect, useState } from "react";
import axios from "axios";
import HistoryGridCard from "../components/history/HistoryGridCard";
import HistoryGridSkeleton from "../components/history/HistoryGridSkeleton";

export default function History() {
  const [loading, setLoading] = useState(true);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    setLoading(true);
    axios
      .get("https://dev.backend.fixonn.in/api/v1/order/customer/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // ✅ EXCLUDE ordered
        const historyData = (res.data.records || []).filter(
          (o) => o.order_status !== "ordered"
        );

        setHistoryList(historyData);
      })
      .catch((err) => console.error("History list error", err))
      .finally(() => setLoading(false));
  }, []);

  const skeletonCount = historyList.length || 4;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-[#c62828]">History</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? [...Array(skeletonCount)].map((_, i) => (
              <HistoryGridSkeleton key={i} />
            ))
          : historyList.map((item, index) => (
              <HistoryGridCard key={item._id} item={item} index={index} />
            ))}
      </div>

      {!loading && historyList.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No past orders found</p>
      )}
    </section>
  );
}
