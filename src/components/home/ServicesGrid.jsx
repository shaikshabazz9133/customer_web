import { motion } from "framer-motion";

const SERVICES = [
  { name: "AC Repair", image: "/ac_repair.jpg" },
  { name: "Electrical", image: "/electrical.avif" },
  { name: "Refrigerator", image: "/fridge.avif" },
  { name: "Home Painting", image: "/home_painting.jpg" },
  { name: "Plumbing", image: "/plumbing.avif" },
  { name: "Washing Machine", image: "/washing_machine.jpg" },
];

export default function ServicesShowcase() {
  return (
    <section className="py-16 bg-white">
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

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="relative h-36 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold truncate">
                  {s.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
