import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICE_MAP } from "../data/services";
import { useState, useContext } from "react";
import LoadingContext from "../contexts/LoadingContext";

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const service = SERVICE_MAP[serviceId] || null;
  const navigate = useNavigate();
  const location = useLocation();
  const [notes, setNotes] = useState("");

  // If this route represents a category (card ids), map to real services
  const CATEGORY_MAP = {
    "home-cleaning": ["cleaning"],
    "office-cleaning": ["cleaning"],
    "move-in": ["cleaning"],
  };

  const categoryServices = CATEGORY_MAP[serviceId]
    ? CATEGORY_MAP[serviceId].map((id) => SERVICE_MAP[id]).filter(Boolean)
    : null;

  // fallback: if the route was navigated with service in state, use it
  const navService = location?.state?.service;

  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <div className="pt-6 pb-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl shadow p-6">
              <div className="h-80 sm:h-[420px] bg-slate-100 rounded mb-4 animate-pulse" />
              <div className="h-6 w-1/3 bg-slate-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-1/2 bg-slate-200 rounded mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
            <aside className="bg-white rounded-2xl p-6 shadow">
              <div className="h-6 w-28 bg-slate-200 rounded mb-3 animate-pulse" />
              <div className="h-10 w-36 bg-slate-200 rounded mb-4 animate-pulse" />
              <div className="h-40 bg-slate-100 rounded animate-pulse" />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (!service && !categoryServices && !navService)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-10 shadow-xl text-center">
          <h2 className="text-2xl font-semibold">Service not found</h2>
          <p className="mt-4 text-slate-600">
            Please return to the services page.
          </p>
        </div>
      </div>
    );

  function handleBook() {
    const id = (service || navService)?.id;
    navigate(`/book/${id}`, {
      state: { notes, service: service || navService },
    });
  }

  if (!service && categoryServices) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-6 pb-12 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Available services
            </h2>
            <p className="text-slate-600">
              Choose a service below to view details and book.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categoryServices.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow p-4"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-600">{s.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">From</div>
                    <div className="text-xl font-bold text-sky-600">
                      {s.price}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/book/${s.id}`)}
                    className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-2xl"
                  >
                    Book
                  </button>
                  <button
                    onClick={() => navigate(`/services/${s.id}`)}
                    className="px-4 py-2 border rounded-2xl"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  const svc = service || navService;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-6 pb-12 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Left: large media & details */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow overflow-hidden">
            <div className="relative">
              <img
                src={svc.img}
                onError={(e) => (e.currentTarget.src = "/fixonn.png")}
                alt={svc.title}
                className="w-full h-80 sm:h-[420px] object-cover"
              />
              <div className="absolute left-6 bottom-6 bg-white/90 px-4 py-2 rounded-xl shadow">
                <div className="text-sm text-slate-600">Category</div>
                <div className="text-lg font-semibold text-slate-900">
                  {svc.category}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={svc.img}
                  onError={(e) => (e.currentTarget.src = "/fixonn.png")}
                  alt={svc.title}
                  className="w-14 h-14 rounded-lg object-cover shadow-sm"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {svc.title}
                </h1>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  ★★★★★
                </div>
                <div className="text-sm text-slate-500">4.8 · 120 reviews</div>
              </div>
              <p className="text-slate-600 mb-6">{svc.desc}</p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    What we include
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {svc.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-3">
                        <div className="w-7 h-7 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center text-xs">
                          ✓
                        </div>
                        <div>{inc}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Important notes
                  </h3>
                  <ul className="text-sm text-slate-600 list-disc pl-4 space-y-2">
                    {svc.terms.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Describe your issue (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add details so our team understands your request"
                  className="w-full p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>
          </div>

          {/* Right: sticky booking panel */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow sticky top-24 h-fit"
          >
            <div className="text-sm text-slate-500">Starting price</div>
            <div className="text-3xl font-bold text-sky-600 mt-1">
              {svc.price}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="w-16 h-12 rounded-md overflow-hidden bg-slate-100">
                <img
                  src={svc.img}
                  onError={(e) => (e.currentTarget.src = "/fixonn.png")}
                  alt={svc.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-slate-700 truncate">{svc.title}</div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-slate-600">Select date & time</div>
              <input
                type="date"
                className="w-full mt-2 p-2 border rounded-lg"
              />
              <select className="w-full mt-2 p-2 border rounded-lg">
                <option>Morning (9am - 12pm)</option>
                <option>Afternoon (12pm - 4pm)</option>
                <option>Evening (4pm - 8pm)</option>
              </select>
            </div>

            <div className="mt-4">
              <button
                onClick={handleBook}
                className="w-full px-4 py-3 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-2xl font-semibold shadow"
              >
                Book Now
              </button>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Need help?{" "}
              <button
                onClick={() => alert("Contact support at +91 98765 43210")}
                className="text-sky-600 underline"
              >
                Contact us
              </button>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </motion.div>
  );
}
