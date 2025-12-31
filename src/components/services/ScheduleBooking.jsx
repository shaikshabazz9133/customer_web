import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export default function ScheduleBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const { service, serviceId, machineTypeId } = state;

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-sky-600 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT – BACK */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-medium hover:opacity-90"
          >
            <ArrowLeft size={20} />

            <span className="hidden sm:inline">Back</span>
          </button>

          {/* RIGHT – TITLE */}
          <h1 className="text-lg sm:text-xl font-semibold">Schedule</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* DATE */}
        <h2 className="text-sky-600 font-semibold mb-3">
          Select Appointment Date
        </h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-600 outline-none mb-6"
        />

        {/* TIME */}
        <h2 className="text-sky-600 font-semibold mb-3">
          Select Appointment Time
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {TIMES.map((t) => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTime(t)}
              className={`py-3 rounded-xl text-sm font-semibold border transition ${
                time === t
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {t}
            </motion.button>
          ))}
        </div>

        {/* NEXT */}
        <button
          disabled={!time}
          onClick={() =>
            navigate("/confirm-booking", {
              state: {
                service,
                serviceId,
                machineTypeId,
                date,
                time,
              },
            })
          }
          className="mt-8 w-full bg-sky-600 text-white py-4 rounded-xl font-bold text-base disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
