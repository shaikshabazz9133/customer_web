import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ServicesGridSkeleton from "../skeletons/ServicesGridSkeleton";

export default function MachineTypes() {
  const { serviceId } = useParams();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceLoading, setServiceLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // 👈 adjust key if needed

    setLoading(true);
    axios
      .get(
        `https://dev.backend.fixonn.in/api/v1/machine/type/get-machinetype-by-service/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setMachines(res.data.data || []))
      .catch((err) => {
        console.error("Machine type fetch failed", err);
      })
      .finally(() => setLoading(false));
  }, [serviceId]);

  return (
    <section className="bg-gray-50 pt-6 pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#c62828]">
            Select Appliance Type
          </h1>
        </motion.div>

        {/* Loading Skeleton */}
        {loading ? (
          <ServicesGridSkeleton count={machines.length || 6} />
        ) : (
          <div
            className="
          flex gap-4 overflow-x-auto pb-4
          snap-x snap-mandatory
          scrollbar-hide
          md:grid md:grid-cols-3
          lg:grid-cols-4
          md:overflow-visible
        "
          >
            {machines.map((m, i) => (
              <motion.div
                key={m._id}
                onClick={() =>
                  navigate(
                    `/service-type/${serviceId}/${m._id}` // ✅ navigate to new page
                  )
                }
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="
              group cursor-pointer
              min-w-[240px] md:min-w-0
              snap-start
            "
              >
                <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-200">
                    <img
                      src={m.machine_type_image?.[0] || "/placeholder.png"}
                      alt={m.machine_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white text-base font-semibold truncate">
                      {m.machine_name}
                    </h3>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {m.machine_type_description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
