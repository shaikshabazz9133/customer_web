// src/components/home/ServicesCards.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    id: "home-cleaning",
    title: "Home Deep Cleaning",
    desc: "Full home cleaning for 1–4 BHK",
    icon: (
      <svg
        className="w-6 h-6 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M3 12l2-2 4 4 8-8 4 4v6H3z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "office-cleaning",
    title: "Office & Commercial",
    desc: "Weekly or monthly cleaning plans",
    icon: (
      <svg
        className="w-6 h-6 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.5" />
        <path
          d="M8 21v-4h8v4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "move-in",
    title: "Move‑in / Move‑out",
    desc: "Complete clean before or after shifting",
    icon: (
      <svg
        className="w-6 h-6 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M3 7h18M6 7v13h12V7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ServicesCards() {
  return (
    <section className="bg-sky-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Services we provide
            </h2>
            <p className="text-sm text-slate-600">
              Choose a service and pick a suitable date and time.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="bg-gradient-to-br from-white to-sky-50 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transform will-change-transform transition"
              >
                <div className="p-6 flex items-center gap-4">
                  <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-inner">
                    <div className="w-10 h-10 flex items-center justify-center text-sky-600">
                      {service.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {service.desc}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        Starting from{" "}
                        <span className="font-semibold text-slate-800">
                          ₹499
                        </span>
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-sky-50 text-sky-700 font-medium">
                          Book Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
