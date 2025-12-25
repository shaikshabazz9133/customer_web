// src/components/home/HeroBarrets.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroBarrets() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 px-6 md:px-12 py-10 md:py-14 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: headline, CTAs, short features */}
            <div className="space-y-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-sky-500">
                Professional Services, On Demand
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Fast local pros for every home need
              </h1>

              <p className="text-sm text-slate-600 max-w-lg">
                Book vetted technicians for cleaning, plumbing, electrical, AC
                repair and more. Quick booking, transparent pricing and reliable
                service.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-sky-600 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition"
                >
                  Book a Service
                </Link>
                <Link
                  to="/booking-confirmation"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition"
                >
                  Get a Quote
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      Verified professionals
                    </div>
                    <div className="text-xs text-slate-500">
                      Background checked & trained
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 font-bold">
                    ⏱
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      Fast booking
                    </div>
                    <div className="text-xs text-slate-500">
                      Find pros in minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: single beautiful image with subtle float */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.98, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <motion.img
                  src="/banner_image.webp"
                  alt="fixon service banner"
                  className="w-full h-64 object-cover"
                  animate={{ translateY: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes floaty { 0% { transform: translateY(0); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0); } }`}</style>
    </section>
  );
}
