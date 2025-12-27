import { useNavigate } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, index }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/orders/${order.id}`)}
      className="group relative bg-white rounded-2xl border border-slate-100 p-5 mb-4 cursor-pointer transition hover:shadow-lg"
    >
      {/* LEFT STATUS STRIP */}
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-red-500" />

      <div className="flex gap-4">
        {/* ORDER NUMBER */}
        <div className="flex items-start">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-gray-700">
            {index + 1}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                ⚙️ {order.service}
              </h3>
              <p className="text-sm text-gray-500 mt-1">👤 {order.user}</p>
            </div>

            <div className="text-right text-sm text-gray-500">
              <p className="font-medium">#{order.id}</p>
              <p className="mt-1">📅 {order.date}</p>
              <p>⏰ {order.time}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <OrderStatusBadge status={order.status} />

            <span className="bg-red-100 text-red-600 font-semibold px-4 py-1.5 rounded-full">
              ₹{order.amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
