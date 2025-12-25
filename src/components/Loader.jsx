// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Loader({ loading }) {
//   return (
//     <AnimatePresence>
//       {loading && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.35 }}
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/85 backdrop-blur-sm pointer-events-auto"
//           aria-live="polite"
//           aria-busy={loading}
//         >
//           <motion.div
//             initial={{ scale: 0.96, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.96, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 280, damping: 28 }}
//             className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow-2xl px-8 py-6"
//             role="status"
//           >
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
//               className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center shadow-lg"
//             >
//               <img
//                 src="/fixonn.png"
//                 alt="fixon"
//                 className="w-12 h-12 rounded-md object-cover"
//               />
//             </motion.div>

//             <div className="text-center">
//               <div className="text-lg font-semibold text-slate-900">
//                 Loading
//               </div>
//               <div className="text-sm text-slate-600">
//                 Fetching content — please wait
//               </div>
//             </div>

//             <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
//               <motion.div
//                 className="h-2 bg-gradient-to-r from-sky-500 to-blue-600"
//                 initial={{ x: -120 }}
//                 animate={{ x: 120 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 1.2,
//                   ease: "easeInOut",
//                 }}
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/85 backdrop-blur-sm"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Wave 1 */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border border-slate-300"
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                ease: "easeOut",
              }}
            />

            {/* Wave 2 */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border border-slate-300"
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                delay: 0.8,
                ease: "easeOut",
              }}
            />

            {/* Wave 3 */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border border-slate-300"
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                delay: 1.6,
                ease: "easeOut",
              }}
            />

            {/* Center logo (watermark) */}
            <motion.img
              src="/fixonn.png"
              alt="Fixon"
              className="w-10 h-10 object-contain opacity-40"
              animate={{ opacity: [0.35, 0.5, 0.35] }}
              transition={{
                repeat: Infinity,
                duration: 2.6,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
