import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function HistoryGridCard({ item, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/history/${item.id}`)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer p-5 relative"
    >
      {/* ORDER NUMBER */}
      <div className="absolute top-4 right-4 text-xs text-gray-500 font-medium">
        #{item.id}
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">⚙️ {item.service}</h3>

      <p className="text-sm text-gray-500 mb-3">🔧 {item.subService}</p>

      <div className="text-sm text-gray-600 space-y-1">
        <p>📅 {item.date}</p>
        <p>⏰ {item.time}</p>
      </div>

      <div className="flex justify-between items-center mt-5">
        <StatusBadge status={item.status} />
        <span className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
          ₹{item.amount}
        </span>
      </div>
    </motion.div>
  );
}
