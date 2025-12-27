import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function OrderGridCardAlt({ order }) {
  const navigate = useNavigate();

  const statusStyle = {
    ordered: "bg-blue-50 text-blue-700",
    accepted: "bg-yellow-50 text-yellow-700",
    completed: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <motion.div
      onClick={() => navigate(`/orders/${order.id}`)}
      whileHover={{
        y: -10, // 👈 card lifts up
        scale: 1.02, // 👈 slight zoom
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl cursor-pointer overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
            statusStyle[order.status]
          }`}
        >
          {order.status}
        </span>
        <span className="text-xs text-gray-500 font-medium">#{order.id}</span>
      </div>

      {/* BODY */}
      <div className="px-4 py-4">
        <h3 className="font-semibold text-gray-900 truncate">
          {order.service}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{order.user}</p>

        <div className="mt-4 text-2xl font-bold text-red-600">
          ₹{order.amount}
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-3">
          <span>📅 {order.date}</span>
          <span>⏰ {order.time}</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 border-t bg-slate-50 text-sm font-medium text-blue-600">
        View Details →
      </div>
    </motion.div>
  );
}
