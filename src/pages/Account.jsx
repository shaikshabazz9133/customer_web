import { motion } from "framer-motion";
import ProfileCard from "../components/account/ProfileCard";

export default function Account() {
  const current = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 bg-slate-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PROFILE SECTION */}
        <ProfileCard currentUser={current} />

        {/* KEEP YOUR EXISTING ADDRESS & CARD SECTIONS BELOW */}
        {/* addresses */}
        {/* cards */}
      </div>
    </motion.div>
  );
}
