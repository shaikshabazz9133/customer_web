import { useEffect, useState } from "react";
import axios from "axios";
import OrderGridSkeleton from "../components/orders/OrderCardSkeleton";
import OrderGridCard from "../components/orders/OrderGridCard";

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    setLoading(true);
    axios
      .get("https://dev.backend.fixonn.in/api/v1/order/customer/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // ✅ show ONLY ordered status
        const orderedOnly = (res.data.records || [])
          .filter((o) => o.order_status === "ordered")
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.created_date) -
              new Date(a.createdAt || a.created_date),
          );

        setOrders(orderedOnly);
      })
      .catch((err) => console.error("Order list error", err))
      .finally(() => setLoading(false));
  }, []);

  const skeletonCount = orders.length || 4;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-[#c62828]">
        My Orders
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading
          ? [...Array(skeletonCount)].map((_, i) => (
              <OrderGridSkeleton key={i} />
            ))
          : orders.map((order, index) => (
              <OrderGridCard key={order._id} order={order} index={index} />
            ))}
      </div>

      {!loading && orders.length === 0 && (
        <p className="text-center text-slate-500 mt-10">
          No active orders found
        </p>
      )}
    </section>
  );
}
