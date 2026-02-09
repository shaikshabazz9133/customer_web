import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function HeroClean() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold tracking-wide uppercase text-sky-600 mb-3">
              Trusted home services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Book home cleaning, repair
              <span className="block">and maintenance in minutes</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl">
              One place to book cleaning, AC repair, plumbing, electrical work
              and more. Fixed pricing, verified professionals, on-time service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-sky-600 text-white text-sm font-semibold shadow-sm hover:bg-sky-700 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Book a service
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                View all services
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 text-xs text-slate-500">
              <span>• Same‑day slots</span>
              <span>• Background-verified experts</span>
              <span>• 4.9/5 customer rating</span>
            </div>
          </motion.div>

          {/* Right simple image grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                title: "Home cleaning",
                img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=350&fit=crop",
              },
              {
                title: "AC repair",
                img: "https://images.unsplash.com/photo-1600086591891-4c3c9c4c0350?w=500&h=350&fit=crop",
              },
              {
                title: "Plumbing",
                img: "https://images.unsplash.com/photo-1603360946369-d3ab8ab5c9dc?w=500&h=350&fit=crop",
              },
              {
                title: "Electrical",
                img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=500&h=350&fit=crop",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3 text-xs font-medium text-slate-700">
                  {card.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
