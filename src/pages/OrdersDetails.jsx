import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const navigate = useNavigate();

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

  const handleCancelOrder = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return toast.error("Please login again");

    try {
      setCancelling(true);

      const res = await axios.patch(
        `https://dev.backend.fixonn.in/api/v1/order/update/status/${order.order_id}`,
        { order_status: "canceled" },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success(res?.message || "Order cancelled successfully");

      setShowCancelModal(false);
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

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
            ₹0
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

          <button
            onClick={() => setShowCancelModal(true)}
            className="flex-1 bg-[#c62828] text-white py-3 rounded-full font-medium hover:bg-[#b71c1c] transition"
          >
            Cancel Order
          </button>
        </div>
      )}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Cancel Order?
            </h3>

            <p className="text-slate-600 text-sm mb-6">
              Are you sure you want to cancel this order
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                No
              </button>

              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="flex-1 py-2.5 rounded-xl bg-[#c62828] text-white font-medium hover:bg-[#b71c1c] transition disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
