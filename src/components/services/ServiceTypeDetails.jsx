import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ServicesGridSkeleton from "../skeletons/ServicesGridSkeleton";

export default function ServiceTypeDetails() {
  const { serviceId, machineTypeId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(
        `https://dev.backend.fixonn.in/api/v1/service/type/get-servicetype-by-service-and-machineType/${serviceId}/${machineTypeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setData(res.data.data?.[0] || null))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [serviceId, machineTypeId]);

  if (loading) {
    return (
      <section className="py-8 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <ServicesGridSkeleton count={1} />
        </div>
      </section>
    );
  }

  if (!data) return null;

  const service = data.service_types[0];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#c62828]">
            Select Service
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {/* Service Card - Main with PERFECT Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-[#c62828]/15 hover:border-[#c62828]/40 hover:shadow-[#c62828]/30 hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-300 md:duration-500 overflow-hidden cursor-pointer"
          >
            {/* 🔥 PERFECT Top-to-Bottom Shimmer Effect */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 skew-y-[-2deg]"
                style={{
                  transform: "translateY(-100%)",
                  transition: "transform 1.2s ease-out, opacity 0.5s ease-out",
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 delay-200 skew-y-[-2deg]"
                style={{
                  transform: "translateY(-100%)",
                  transition: "transform 1.5s ease-out, opacity 0.6s ease-out",
                }}
              />
            </div>

            <div className="relative p-5 md:p-7 flex flex-col h-full">
              {/* Image */}
              <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-5 bg-[#c62828]/5 rounded-2xl p-2.5 md:p-3 shadow-md md:shadow-xl group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500 border-4 border-white">
                <img
                  src={service.service_type_image?.[0] || "/placeholder.png"}
                  alt={service.service_type_name}
                  className="w-full h-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                {["Repair", "ASA", "UIA"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#c62828]/8 text-[#c62828] text-[10px] md:text-xs font-semibold rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 text-center mb-3 group-hover:text-[#c62828] transition-colors">
                {service.service_type_name}
              </h3>

              {/* Price Badge */}
              <div className="relative bg-[#c62828] text-white px-6 py-3 rounded-2xl shadow-xl mb-5 mx-auto w-fit border border-white/30 hover:shadow-[#c62828]/40 transition-all duration-300 group-hover:scale-[1.02]">
                <div className="flex items-baseline">
                  <span className="text-xl md:text-2xl font-black tracking-tight">
                    ₹
                  </span>
                  <span className="text-2xl md:text-3xl font-black ml-1 tracking-tight">
                    {service.service_charge}
                  </span>
                </div>
                <p className="text-xs md:text-sm uppercase tracking-wider font-semibold mt-1 opacity-90 text-center">
                  Service Charge
                </p>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() =>
                  navigate("/booking-flow", {
                    state: { service, serviceId, machineTypeId },
                  })
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="
                  mt-auto
                  w-full
                  bg-[#c62828]
                  text-white
                  font-semibold md:font-bold
                  py-2.5 md:py-3.5
                  px-4 md:px-6
                  rounded-xl md:rounded-2xl
                  shadow-md md:shadow-lg
                  hover:bg-[#b71c1c]
                  hover:shadow-xl
                  transition-all duration-300
                  text-sm md:text-base
                  tracking-wide
                "
              >
                Continue →
              </motion.button>
            </div>
          </motion.div>

          {/* Placeholder Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="
              group relative bg-white/80 backdrop-blur-xl
              rounded-2xl md:rounded-3xl
              shadow-md md:shadow-xl
              border border-slate-200/70
              hover:-translate-y-2 md:hover:-translate-y-3
              hover:shadow-2xl
              hover:bg-white
              transition-all duration-300 md:duration-500
              overflow-hidden cursor-default
              opacity-70 hover:opacity-100
            "
          >
            <div className="p-6 md:p-8 h-full flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-2xl mb-5" />
              <h4 className="text-lg md:text-xl font-bold text-slate-500 mb-2">
                More Services
              </h4>
              <p className="text-xs md:text-sm text-slate-400">
                Coming soon with more options.
              </p>
            </div>
          </motion.div>

          {/* Placeholder Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="
              group relative bg-white/80 backdrop-blur-xl
              rounded-2xl md:rounded-3xl
              shadow-md md:shadow-xl
              border border-slate-200/70
              hover:-translate-y-2 md:hover:-translate-y-3
              hover:shadow-2xl
              hover:bg-white
              transition-all duration-300 md:duration-500
              overflow-hidden cursor-default
              opacity-70 hover:opacity-100
            "
          >
            <div className="p-6 md:p-8 h-full flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-2xl mb-5" />
              <h4 className="text-lg md:text-xl font-bold text-slate-500 mb-2">
                More Services
              </h4>
              <p className="text-xs md:text-sm text-slate-400">
                Stay tuned for upcoming services.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
