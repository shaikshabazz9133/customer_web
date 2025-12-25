// src/components/home/WhySection.jsx
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15 8H9L12 2Z" fill="currentColor" opacity="0.12" />
        <path
          d="M4 11C4 7.68629 6.68629 5 10 5H14C17.3137 5 20 7.68629 20 11V17C20 20.3137 17.3137 23 14 23H10C6.68629 23 4 20.3137 4 17V11Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Trusted Professionals",
    desc: "Background‑checked staff, trained and uniformed for a consistent experience.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M8 12l2.5 2.5L16 9"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Quality Guarantee",
    desc: "If you’re not happy, we’ll make it right — quick follow‑up visits at no extra cost.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M7 12H17"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Flexible Scheduling",
    desc: "Multiple time slots, weekend and express options to fit your routine.",
  },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1542314835-1a3ac0dc2a63?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506111583091-e7f0c2f85f8f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
];

export default function WhySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
            >
              Why customers choose us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 mb-6 max-w-xl"
            >
              Professional, reliable and fast home services — backed by a
              quality guarantee and flexible scheduling.
            </motion.p>

            <div className="grid gap-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.36 }}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="text-sky-600 mt-1">{f.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {f.title}
                    </div>
                    <div className="text-sm text-slate-600">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {IMAGES.slice(0, 4).map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ scale: 0.97, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className={`overflow-hidden rounded-2xl h-40 ${
                    i === 0 ? "col-span-2 h-56" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`feature-${i}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x600?text=Image+Unavailable";
                    }}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="absolute -bottom-6 right-4 bg-white rounded-full p-3 shadow-lg border border-slate-100"
            >
              <div className="text-sm font-semibold text-slate-900">
                Trusted by 10k+ homes
              </div>
              <div className="text-xs text-slate-500">4.8 ★ average rating</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
