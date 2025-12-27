import { useEffect, useState } from "react";
import OrderGridSkeleton from "../components/orders/OrderCardSkeleton";
import OrderGridCard from "../components/orders/OrderGridCard";
import OrderGridCardAlt from "../components/orders/OrderGridCardAlt";

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  // 👇 expected skeleton count
  const skeletonCount = orders.length || 2;

  useEffect(() => {
    setLoading(true);

    // simulate API
    const timer = setTimeout(() => {
      const data = [
        {
          id: "654610",
          service: "AC Full Service",
          user: "Tester",
          date: "2/12/2025",
          time: "09:00 AM",
          amount: 1000,
          status: "ordered",
        },
        {
          id: "654611",
          service: "Washing Machine Repair",
          user: "Tester",
          date: "3/12/2025",
          time: "11:30 AM",
          amount: 800,
          status: "accepted",
        },
      ];

      setOrders(data);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? [...Array(skeletonCount)].map((_, i) => <OrderGridSkeleton key={i} />)
          : orders.map((order, index) => (
              <OrderGridCard key={order.id} order={order} index={index} />
            ))}
      </div>
    </section>
  );
}
