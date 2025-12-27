import { useParams } from "react-router-dom";
import StatusBadge from "../components/history/StatusBadge";

export default function HistoryDetails() {
  const { id } = useParams();

  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>

      {/* SERVICE DETAILS */}
      <div className="bg-white rounded-2xl border p-4 mb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">⚙️ AC Full Service</h3>
            <p className="text-sm text-gray-500 mt-1">🔧 AC service</p>
          </div>

          <span className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
            ₹2076
          </span>
        </div>

        <div className="mt-3">
          <StatusBadge status="completed" />
        </div>

        <div className="text-sm text-gray-600 mt-4 space-y-1">
          <p>📅 10/12/2025</p>
          <p>⏰ 09:00 AM</p>
          <p>📍 I-99 Stockton St, San Francisco, Union Square</p>
          <p>Door No: 111111</p>
          <p>Street: 22222</p>
          <p>Landmark: 333333</p>
        </div>
      </div>

      {/* VISITING CHARGES */}
      <div className="bg-white rounded-2xl border p-4 mb-4">
        <div className="flex justify-between">
          <p className="font-medium">Visiting Charges</p>
          <span className="bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
            ₹300
          </span>
        </div>

        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mt-3">
          ℹ️ Visiting charges were paid to the technician.
        </div>
      </div>

      {/* TECHNICIAN DETAILS */}
      <div className="bg-white rounded-2xl border p-4 mb-6">
        <p className="font-medium mb-3">Technician Details</p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold">
            T
          </div>

          <div>
            <p className="font-medium">TestUser</p>
            <p className="text-sm text-green-600">✔ Verified Technician</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-red-600 text-white py-3 rounded-full font-medium hover:bg-red-700 transition">
        View Invoice
      </button>
    </section>
  );
}
