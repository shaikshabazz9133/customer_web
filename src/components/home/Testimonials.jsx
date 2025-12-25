// src/components/home/Testimonials.jsx
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    city: "Gurugram",
    text: "Very professional cleaning team. They arrived on time and finished faster than expected.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Priya Singh",
    city: "New Delhi",
    text: "Booked deep cleaning for my 2 BHK. House looks like new. Highly recommended.",
    img: "https://images.unsplash.com/photo-1545996124-1a5f2b68c9b9?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Amit Verma",
    city: "Noida",
    text: "Easy booking and transparent pricing. Will definitely book again.",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop",
    rating: 4,
  },
  {
    name: "Neha Kapoor",
    city: "Faridabad",
    text: "The repair crew handled my AC quickly and explained everything. Great follow-up.",
    img: "https://images.unsplash.com/photo-1541534401786-79bf1f5b23b1?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Sanjay Kumar",
    city: "Panipat",
    text: "Transparent pricing and punctual professionals. The house looks spotless.",
    img: "https://images.unsplash.com/photo-1545996124-7d1f7b6c8b9f?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Ritu Mehra",
    city: "Karnal",
    text: "Smooth booking flow and courteous staff. Will use again for deep cleaning.",
    img: "https://images.unsplash.com/photo-1544005313-5a8f3f82f9f4?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Vikram Joshi",
    city: "Hisar",
    text: "Excellent technician for plumbing work — fixed the issue quickly.",
    img: "https://images.unsplash.com/photo-1545996124-3a0f6f5b6f5a?w=400&h=400&fit=crop",
    rating: 4,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <section className="relative bg-white py-12 md:py-16 border-t border-slate-100 overflow-hidden">
      {/* floating decorative blobs */}
      <div className="absolute -top-12 -left-8 w-60 h-60 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full filter blur-3xl animate-[floaty_6s_ease-in-out_infinite]" />
      <div className="absolute -bottom-16 -right-8 w-72 h-72 bg-gradient-to-br from-sky-100/30 to-indigo-200/20 rounded-full filter blur-3xl animate-[floaty_8s_ease-in-out_infinite]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Hear from our customers
          </h2>
          <p className="text-sm text-slate-600">
            Real feedback from people who booked our services.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10"
        >
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 6).map((item, idx) => (
              <motion.article
                key={item.name + idx}
                variants={card}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl border border-slate-100 px-6 py-6 text-sm text-slate-700 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-sky-100 shadow-inner">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-3 text-slate-700 leading-relaxed">
                      “{item.text}”
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.city}
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating ? "fill-current" : "opacity-20"
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* small screens: horizontal scroll with snap */}
          <div className="md:hidden mt-4 -mx-4 px-4 overflow-x-auto scroll-pl-6 snap-x snap-mandatory grid grid-flow-col auto-cols-[80%] gap-4">
            {TESTIMONIALS.map((item, idx) => (
              <motion.article
                key={item.name + idx}
                variants={card}
                whileTap={{ scale: 0.995 }}
                className="snap-start bg-white rounded-2xl border border-slate-100 px-5 py-5 text-sm text-slate-700 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-sky-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="mb-2 leading-relaxed">“{item.text}”</p>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        • {item.city}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes floaty { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }`}</style>
    </section>
  );
}
