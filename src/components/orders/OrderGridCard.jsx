import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function OrderGridCard({ order }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      onClick={() => navigate(`/orders/${order.order_id}`)}
      className="
        group relative bg-white
        rounded-2xl border border-[#c62828]/20
        shadow-sm hover:shadow-xl
        transition-all duration-300
        cursor-pointer overflow-hidden
      "
    >
      {/* LEFT STATUS STRIP */}
      <div className="absolute inset-y-0 left-0 w-1 bg-[#c62828]" />

      <div className="p-5 pl-6">
        {/* HEADER */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2">
            {order.service_name}
          </h3>

          <span className="text-xs font-medium text-slate-400 shrink-0">
            #{order.order_id}
          </span>
        </div>

        {/* DATE & TIME */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-base">📅</span>
            <span>{order.service_date}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base">⏰</span>
            <span>{order.service_time}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-slate-100 mb-4" />

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          {/* STATUS */}
          <span
            className="
              inline-flex items-center gap-1
              px-3 py-1 text-xs font-semibold
              rounded-full bg-[#c62828]/10 text-[#c62828]
              capitalize
            "
          >
            ● {order.order_status}
          </span>

          {/* AMOUNT */}
          <div className="text-right">
            <p className="text-xs text-slate-400">Service Charge</p>
            <p className="text-lg font-bold text-[#c62828]">
              ₹{order.service_charge}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
