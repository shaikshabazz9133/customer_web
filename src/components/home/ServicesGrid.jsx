import { motion } from "framer-motion";
import { fetchServices } from "../../api/servicesApi";
import { useEffect, useState } from "react";
import ServicesGridSkeleton from "../skeletons/ServicesGridSkeleton";
import { useNavigate } from "react-router-dom";

export default function ServicesShowcase() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-white">
      {/* ✅ Show skeleton while loading */}
      {loading ? (
        <ServicesGridSkeleton count={services.length || 6} />
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
            
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Select Service
            </h2>
            <p className="text-gray-500 mt-2">Choose the service you need</p>
          </motion.div>

          {/* Grid / Slider */}
          <div
            className="
              flex gap-5 overflow-x-auto pb-4
              snap-x snap-mandatory
              scrollbar-hide
              lg:grid lg:grid-cols-4 xl:grid-cols-6 lg:overflow-visible
            "
          >
            {services.map((s, i) => (
              <motion.div
                key={s.service_name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="
                  group cursor-pointer
                  min-w-[160px] sm:min-w-[180px] lg:min-w-0
                  snap-start
                "
                onClick={() => navigate(`/services/${s._id}/machine-types`)}
              >
                <div className="relative h-36 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                  <img
                    src={s.service_image?.[0] || "/placeholder.png"}
                    alt={s.service_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                  <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold truncate">
                    {s.service_name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
