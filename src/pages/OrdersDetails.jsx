import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setOrder({
        service: "AC Full Service",
        user: "Tester",
        date: "2/12/2025",
        time: "09:00 AM",
        amount: 1000,
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>

      {/* SERVICE DETAILS */}
      <div className="bg-white rounded-2xl border p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">⚙️ AC Full Service</h3>
            <p className="text-sm text-gray-500 mt-1">👤 Tester</p>
          </div>
          <span className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
            ₹1000
          </span>
        </div>

        <div className="text-sm text-gray-600 mt-3 space-y-1">
          <p>📅 2/12/2025</p>
          <p>⏰ 09:00 AM</p>
          <p>📍 10, Bharathi Cross Road, Bengaluru, Narayanapura</p>
          <p>Door No: 11111</p>
          <p>Street: 222222</p>
          <p>Landmark: 333333</p>
        </div>
      </div>

      {/* VISITING CHARGES */}
      <div className="bg-white rounded-2xl border p-4 mb-4">
        <div className="flex justify-between">
          <p className="font-medium">Visiting Charges</p>
          <span className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
            ₹300
          </span>
        </div>

        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mt-3">
          ℹ️ Visiting charges will be paid to the technician if the service is
          cancelled after arrival.
        </div>
      </div>

      {/* TECHNICIAN DETAILS */}
      <div className="bg-white rounded-2xl border p-4 mb-6">
        <p className="font-medium mb-2">Technician Details</p>
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
          ℹ️ Waiting to get technician assigned
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          disabled
          className="flex-1 bg-gray-300 text-gray-600 py-3 rounded-full font-medium"
        >
          View Invoice
        </button>

        <button className="flex-1 bg-red-600 text-white py-3 rounded-full font-medium hover:bg-red-700 transition">
          Cancel Order
        </button>
      </div>
    </section>
  );
}
