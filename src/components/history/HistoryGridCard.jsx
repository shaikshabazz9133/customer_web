import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function HistoryGridCard({ item }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/history/orders/${item.order_id}`)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="
        group relative bg-white
        rounded-2xl border border-slate-200
        shadow-sm hover:shadow-xl
        transition-all duration-300
        cursor-pointer overflow-hidden
      "
    >
      {/* TOP STRIP (STATUS COLOR) */}
      <div
        className={`h-1 w-full ${
          item.order_status === "completed"
            ? "bg-emerald-500"
            : item.order_status === "cancelled"
            ? "bg-rose-500"
            : "bg-amber-500"
        }`}
      />

      <div className="p-5">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-slate-900 leading-tight line-clamp-2">
            {item.service_name}
          </h3>

          <span className="text-xs text-slate-400 font-medium shrink-0">
            #{item.order_id}
          </span>
        </div>

        {/* DATE + TIME */}
        <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <span className="text-base">📅</span>
            <span>{item.service_date}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base">⏰</span>
            <span>{item.service_time}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-px bg-slate-100" />

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          <StatusBadge status={item.order_status} />

          <div className="text-right">
            <p className="text-xs text-slate-400">Amount</p>
            <p className="text-lg font-bold text-[#c62828]">
              ₹{item.service_charge}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
