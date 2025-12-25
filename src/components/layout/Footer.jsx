import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2500);
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative wave */}
      <div className="pointer-events-none -mt-1">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,120 1080,-40 1440,40 L1440,120 L0,120 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/fixonn.png"
                  alt="fixon"
                  className="w-12 h-12 rounded-lg shadow-md object-cover"
                />
                <div>
                  <div className="text-xl font-bold leading-tight">fixon</div>
                  <div className="text-sm text-slate-300">
                    Home services, simplified
                  </div>
                </div>
              </Link>

              <p className="text-slate-400 text-sm leading-relaxed">
                Reliable, vetted professionals delivered to your door —
                cleaning, repair, and more. Fast booking, secure payments.
              </p>

              <div className="flex items-center gap-4 mt-2">
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"
                  href="#"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"
                  href="#"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"
                  href="#"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li>
                  <Link to="/services" className="hover:text-white transition">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="hover:text-white transition">
                    Offers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-bookings"
                    className="hover:text-white transition"
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="hover:text-white transition">
                    Account
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="text-sm text-slate-300 space-y-3">
                <li>
                  <a className="hover:text-white transition">About Us</a>
                </li>
                <li>
                  <a className="hover:text-white transition">Contact</a>
                </li>
                <li>
                  <a className="hover:text-white transition">Privacy</a>
                </li>
                <li>
                  <a className="hover:text-white transition">Terms</a>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-white font-semibold mb-4">
                Stay in the loop
              </h4>
              <p className="text-sm text-slate-300 mb-4">
                Get exclusive offers and booking reminders.
              </p>

              <form onSubmit={submit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-white/6 placeholder:text-slate-300 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 px-4 rounded-lg text-white font-semibold"
                >
                  {subscribed ? "Thanks" : "Subscribe"}
                </motion.button>
              </form>

              <div className="mt-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-sky-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.94 6.94a8 8 0 1111.314 11.314A8 8 0 012.94 6.94zM8 9a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <span>
                    Support:{" "}
                    <strong className="text-white">+91 98765 43210</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} fixon. All rights reserved.
            </div>
            <div className="text-sm text-slate-400">
              Nārnaund, Haryana, India
            </div>
          </div>
        </div>
      </div>

      <style>{`\n        /* subtle moving blobs */\n        @keyframes floaty {\n          0% { transform: translateY(0) translateX(0); }\n          50% { transform: translateY(-8px) translateX(6px); }\n          100% { transform: translateY(0) translateX(0); }\n        }\n      `}</style>
    </footer>
  );
}
