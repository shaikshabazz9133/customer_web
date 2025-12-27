import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderGridCard({ order, index }) {
  const navigate = useNavigate();

  const statusColors = {
    ordered: "bg-blue-100 text-blue-600",
    accepted: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <motion.div
      onClick={() => navigate(`/orders/${order.id}`)}
      whileHover={{
        y: -10, // 👈 lift up
        scale: 1.02, // 👈 subtle zoom
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer p-5 relative"
    >
      {/* ORDER NUMBER */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-gray-700">
        {index + 1}
      </div>

      {/* SERVICE */}
      <h3 className="font-semibold text-gray-900 mb-1 truncate">
        ⚙️ {order.service}
      </h3>

      <p className="text-sm text-gray-500 mb-3">👤 {order.user}</p>

      {/* DATE & TIME */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>📅 {order.date}</p>
        <p>⏰ {order.time}</p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-5">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
            statusColors[order.status]
          }`}
        >
          {order.status}
        </span>

        <span className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
          ₹{order.amount}
        </span>
      </div>
    </motion.div>
  );
}
