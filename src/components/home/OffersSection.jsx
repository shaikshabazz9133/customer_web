import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchServices } from "../../api/servicesApi";
import { OfferCard } from "./OfferCard";
import OffersSkeleton from "../skeletons/OffersSkeleton";

export default function OffersSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
          Best Offers
        </h2>
        {loading ? (
          <OffersSkeleton count={services.length || 6} />
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {services.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="min-w-[85%] sm:min-w-[70%] md:min-w-[520px] lg:min-w-[560px]"
              >
                <OfferCard offer={service} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
