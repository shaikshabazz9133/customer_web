import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICE_MAP } from "../data/services";

export default function MyBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  if (!bookings || bookings.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-10 shadow-xl text-center">
          <h2 className="text-2xl font-semibold">No bookings yet</h2>
          <p className="mt-4 text-slate-600">
            You haven't booked any service yet.
          </p>
          <div className="mt-6">
            <Link
              to="/services"
              className="px-4 py-2 rounded-2xl bg-sky-50 text-sky-600"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 bg-slate-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
            <p className="text-sm text-slate-600 mt-1">
              Your recent and upcoming bookings
            </p>
          </div>
          <div className="text-sm text-slate-500">Total: {bookings.length}</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {bookings
            .slice()
            .reverse()
            .map((b) => {
              const svc = SERVICE_MAP[b.serviceId] || {};
              const status = b.status || "Confirmed";
              return (
                <motion.div
                  key={b.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-4 shadow-md border"
                >
                  <div className="flex gap-4">
                    <div className="w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={svc.img || b.img}
                        alt={b.serviceTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm text-slate-500">
                            {b.serviceTitle}
                          </div>
                          <div className="font-semibold text-slate-900 truncate">
                            {b.name} • {b.phone}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sky-600 font-semibold">
                            {b.price}
                          </div>
                          <div className="text-xs mt-1 text-slate-500">
                            {b.date} · {b.slot}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              status === "Cancelled"
                                ? "bg-rose-50 text-rose-600"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {status}
                          </span>
                          {b.appliedOffer && (
                            <span className="text-xs px-2 py-1 rounded-full bg-sky-50 text-sky-600">
                              {b.appliedOffer.code}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/booking-confirmation/${b.id}`}
                            className="px-3 py-1 rounded-lg bg-sky-50 text-sky-600 text-sm"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(b.id);
                            }}
                            className="px-3 py-1 rounded-lg border text-sm"
                          >
                            Copy ID
                          </button>
                        </div>
                      </div>

                      {b.notes && (
                        <div className="mt-3 text-sm text-slate-600">
                          Notes: {b.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
}
