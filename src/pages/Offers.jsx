import { motion } from "framer-motion";
import { OFFERS } from "../data/offers";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 bg-slate-50 min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Offers & Promotions
          </h1>
          <p className="text-slate-600">
            Apply available offers at checkout to save on services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {OFFERS.map((o) => (
            <motion.article
              key={o.id}
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {o.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{o.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 text-sm">Code</div>
                  <div className="font-mono font-semibold mt-1">{o.code}</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <div className="font-semibold">Valid until: {o.validUntil}</div>
                <ul className="mt-2 list-disc pl-5">
                  {o.terms.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(o.code)}
                  className="px-4 py-2 rounded-2xl bg-sky-50 text-sky-700"
                >
                  Copy code
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="px-4 py-2 rounded-2xl border"
                >
                  Browse services
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
