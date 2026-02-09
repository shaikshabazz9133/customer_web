import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const b = all.find((it) => it.id === bookingId) || all.slice(-1)[0] || null;
    setBooking(b);
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-10 shadow-xl text-center">
          <h2 className="text-2xl font-semibold">No booking found</h2>
          <p className="mt-4 text-slate-600">You can create a booking from the services page.</p>
          <div className="mt-6">
            <Link to="/services" className="text-sky-600 font-semibold">Browse Services</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12" initial={{ y: 20 }} animate={{ y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</div>
            <div>
              <h1 className="text-2xl font-bold">Booking Confirmed</h1>
              <p className="text-slate-600">We've received your booking request. Our team will contact you soon.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-xl">
              <h3 className="text-sm text-slate-500">Service</h3>
              <div className="font-medium text-slate-900">{booking.serviceTitle} • {booking.price}</div>
            </div>
            <div className="p-4 border rounded-xl">
              <h3 className="text-sm text-slate-500">Booking ID</h3>
              <div className="font-medium text-slate-900">{booking.id}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-xl">
              <h3 className="text-sm text-slate-500">Date & Slot</h3>
              <div className="font-medium text-slate-900">{booking.date} • {booking.slot}</div>
            </div>
            <div className="p-4 border rounded-xl">
              <h3 className="text-sm text-slate-500">Contact</h3>
              <div className="font-medium text-slate-900">{booking.name} • {booking.phone}</div>
            </div>
          </div>

          <div className="mt-4 p-4 border rounded-xl">
            <h3 className="text-sm text-slate-500">Address</h3>
            <div className="font-medium text-slate-900">{booking.address}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link to="/services" className="px-4 py-2 rounded-2xl bg-sky-50 text-sky-600 font-medium border border-sky-100">Browse More Services</Link>
            <Link to="/" className="px-4 py-2 rounded-2xl bg-slate-900 text-white font-medium">Go to Home</Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
