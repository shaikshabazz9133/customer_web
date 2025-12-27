import { motion } from "framer-motion";
import { OfferCard } from "./OfferCard";

const OFFERS = [
  {
    title: "All AC’s & Outdoor",
    highlight: "Repair & Service",
    subtitle: "Book Your Service Now!",
    image: "/ac_repair.jpg",
    category: "AC Service",
  },
  {
    title: "Washing Machine",
    highlight: "Repair Services",
    subtitle: "Flat ₹300 OFF",
    image: "/washing_machine.jpg",
    category: "Washing Machine",
  },
  {
    title: "Refrigerator",
    highlight: "Repair & Service",
    subtitle: "Free Inspection",
    image: "/fridge.avif",
    category: "Refrigerator",
  },
];

export default function OffersSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
          Best Offers
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35 }}
              className="min-w-[85%] sm:min-w-[70%] md:min-w-[520px] lg:min-w-[560px]"
            >
              <OfferCard offer={offer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
