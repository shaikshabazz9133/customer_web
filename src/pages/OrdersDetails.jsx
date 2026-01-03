import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams(); // order_id
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    setLoading(true);
    axios
      .get("https://dev.backend.fixonn.in/api/v1/order/customer/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const records = res.data.records || [];

        // ✅ find selected order
        const selected = records.find((o) => String(o.order_id) === String(id));

        setOrder(selected || null);
      })
      .catch((err) => console.error("Order details error", err))
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------------- LOADING SKELETON ---------------- */
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return <p className="text-center text-slate-500 mt-10">Order not found</p>;
  }

  const {
    service_name,
    service_charge,
    service_date,
    service_time,
    user_info,
  } = order;

  const address = `${user_info?.door_no || ""}, ${
    user_info?.street_name || ""
  }, ${user_info?.landmark || ""}, ${user_info?.address || ""}`;

  /* ---------------- UI ---------------- */
  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 text-[#c62828]">Order Details</h1>

      {/* SERVICE DETAILS */}
      <div className="bg-white rounded-2xl border p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">⚙️ {service_name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Order ID: #{order.order_id}
            </p>
          </div>

          <span className="bg-[#c62828]/10 text-[#c62828] font-semibold px-3 py-1 rounded-full">
            ₹{service_charge}
          </span>
        </div>

        <div className="text-sm text-gray-600 mt-3 space-y-1">
          <p>📅 {service_date}</p>
          <p>⏰ {service_time}</p>
          <p>📍 {address}</p>
        </div>
      </div>

      {/* VISITING CHARGES (STATIC UI) */}
      <div className="bg-white rounded-2xl border p-4 mb-4">
        <div className="flex justify-between">
          <p className="font-medium">Visiting Charges</p>
          <span className="bg-[#c62828]/10 text-[#c62828] font-semibold px-3 py-1 rounded-full">
            ₹300
          </span>
        </div>

        <div className="bg-[#c62828]/5 text-[#c62828] text-sm p-3 rounded-xl mt-3">
          ℹ️ Visiting charges will be paid to the technician if the service is
          cancelled after arrival.
        </div>
      </div>

      {/* TECHNICIAN DETAILS (STATIC UI) */}
      <div className="bg-white rounded-2xl border p-4 mb-6">
        <p className="font-medium mb-2">Technician Details</p>
        <div className="bg-[#c62828]/5 text-[#c62828] text-sm p-3 rounded-xl">
          ℹ️ Waiting to get technician assigned
        </div>
      </div>

      {/* ACTIONS */}
      {order.order_status === "cancelled" ? (
        <div className="bg-[#c62828]/5 text-[#c62828] text-sm p-4 rounded-xl text-center">
          ❌ This order has been cancelled
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            disabled
            className="flex-1 bg-gray-300 text-gray-600 py-3 rounded-full font-medium"
          >
            View Invoice
          </button>

          <button className="flex-1 bg-[#c62828] text-white py-3 rounded-full font-medium hover:bg-[#b71c1c] transition">
            Cancel Order
          </button>
        </div>
      )}
    </section>
  );
}
