import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SERVICE_MAP } from "../data/services";
import { OFFERS } from "../data/offers";

const SERVICES = {
  cleaning: { title: "Deep Cleaning", price: "₹999" },
  "ac-repair": { title: "AC Repair", price: "₹599" },
  plumbing: { title: "Plumbing", price: "₹499" },
  electrical: { title: "Electrical", price: "₹699" },
  pest: { title: "Pest Control", price: "₹799" },
  painting: { title: "Home Painting", price: "₹1999" },
};

function validatePhone(phone) {
  return /^\+?[0-9]{7,15}$/.test(phone.replace(/\s+/g, ""));
}

export default function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = SERVICES[serviceId] || { title: "Service", price: "₹999" };
  const serviceData = SERVICE_MAP[serviceId] || {
    ...service,
    inclusions: [],
    terms: [],
    img: "https://images.unsplash.com/photo-1581579186983-91dfaabd6c3b?w=900&h=675&fit=crop",
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    slot: "",
    address: "",
    notes: "",
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [offerCode, setOfferCode] = useState("");
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(serviceData.price);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // apply prefilled notes if navigated from details page
  const location = useLocation();
  useEffect(() => {
    if (location?.state?.notes)
      setForm((s) => ({ ...s, notes: location.state.notes }));
  }, [location]);

  // require authentication
  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser) {
      navigate("/", { state: { from: `/book/${serviceId}` } });
    }
  }, []);

  useEffect(() => {
    // compute display price when appliedOffer changes
    if (!appliedOffer) {
      setDisplayPrice(serviceData.price);
      return;
    }
    const base = Number(String(serviceData.price).replace(/[^0-9]/g, "")) || 0;
    let final = base;
    if (appliedOffer.discountPercent) {
      final = Math.round(base * (1 - appliedOffer.discountPercent / 100));
    } else if (appliedOffer.discountAmount) {
      final = Math.max(0, base - appliedOffer.discountAmount);
    }
    setDisplayPrice("₹" + final);
  }, [appliedOffer, serviceData.price]);

  function tryApplyOffer(code) {
    const o = OFFERS.find(
      (x) => x.code.toLowerCase() === String(code).toLowerCase()
    );
    if (!o) return { ok: false, msg: "Offer not found" };
    const applies =
      (o.appliesTo || []).includes(serviceId) ||
      (o.appliesTo || []).includes(serviceData.category);
    if (!applies)
      return { ok: false, msg: "Offer not applicable to this service" };
    // check validity date
    if (o.validUntil && new Date(o.validUntil) < new Date())
      return { ok: false, msg: "Offer expired" };
    setAppliedOffer(o);
    return { ok: true };
  }

  function validate() {
    const e = {};
    if (!form.name || form.name.length < 2) e.name = "Enter a valid name";
    if (!form.phone || !validatePhone(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.date) e.date = "Choose a preferred date";
    if (!form.slot) e.slot = "Select a time slot";
    if (!form.address || form.address.length < 10)
      e.address = "Enter a full address";
    if (!termsAgreed) e.terms = "You must agree to our terms to proceed";
    return e;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);

    const booking = {
      id: `bk_${Date.now()}`,
      serviceId,
      serviceTitle: service.title,
      price: service.price,
      appliedOffer: appliedOffer?.code || null,
      ...form,
      createdAt: new Date().toISOString(),
    };

    // simulate save to backend via localStorage
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    setTimeout(() => {
      setSubmitting(false);
      navigate(`/booking-confirmation/${booking.id}`);
    }, 700);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 bg-slate-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
        >
          Book a Service
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Service summary */}
          <motion.aside
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <img
                src={serviceData.img}
                alt={serviceData.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {serviceData.title}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {serviceData.desc || service.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500 text-sm">Starting at</div>
                    <div className="text-2xl font-extrabold text-sky-600">
                      {serviceData.price}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    What we include
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    {serviceData.inclusions &&
                    serviceData.inclusions.length > 0 ? (
                      serviceData.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                            ✓
                          </span>
                          {inc}
                        </li>
                      ))
                    ) : (
                      <li>No details available.</li>
                    )}
                  </ul>
                </div>

                <div className="mt-4 text-sm text-slate-500">
                  <details>
                    <summary className="cursor-pointer font-medium">
                      Terms & important notes
                    </summary>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {serviceData.terms && serviceData.terms.length > 0 ? (
                        serviceData.terms.map((t, i) => <li key={i}>{t}</li>)
                      ) : (
                        <li>Standard terms apply.</li>
                      )}
                    </ul>
                  </details>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm text-sm text-slate-600">
              <div className="font-medium text-slate-900 mb-2">Need help?</div>
              <div>Call +91 98765 43210 or email support@homeserve.example</div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-slate-900">
                Booking — {serviceData.title}
              </h3>
              <div className="text-sm text-slate-500">
                Please fill in your details to confirm the booking
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                    className="w-full mt-1 p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                  {errors.name && (
                    <div className="text-rose-600 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full mt-1 p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                  {errors.phone && (
                    <div className="text-rose-600 text-sm mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Preferred Date
                  </label>
                  <input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    type="date"
                    className="w-full mt-1 p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                  {errors.date && (
                    <div className="text-rose-600 text-sm mt-1">
                      {errors.date}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Time Slot
                  </label>
                  <select
                    name="slot"
                    value={form.slot}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  >
                    <option value="">Choose a slot</option>
                    <option>9 AM - 12 PM</option>
                    <option>1 PM - 5 PM</option>
                    <option>6 PM - 9 PM</option>
                  </select>
                  {errors.slot && (
                    <div className="text-rose-600 text-sm mt-1">
                      {errors.slot}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="House No, Street, Area, City"
                  className="w-full mt-1 p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                />
                {errors.address && (
                  <div className="text-rose-600 text-sm mt-1">
                    {errors.address}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Additional details (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the issue or add clarifications"
                  className="w-full mt-1 p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                />
              </div>

              <div className="mt-2">
                <label className="text-sm font-medium text-slate-700">
                  Apply Offer
                </label>
                <div className="flex gap-2 mt-2">
                  <input
                    value={offerCode}
                    onChange={(e) => setOfferCode(e.target.value)}
                    placeholder="Offer code (e.g. SPRING10)"
                    className="flex-1 p-3 border border-slate-200 rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const r = tryApplyOffer(offerCode);
                      if (!r.ok) alert(r.msg);
                    }}
                    className="px-4 py-2 bg-sky-600 text-white rounded-2xl"
                  >
                    Apply
                  </button>
                </div>
                {appliedOffer && (
                  <div className="mt-2 text-sm text-slate-600">
                    Applied:{" "}
                    <span className="font-semibold">{appliedOffer.title}</span>{" "}
                    — New price:{" "}
                    <span className="text-sky-600 font-bold">
                      {displayPrice}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="agree"
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="agree" className="text-sm text-slate-700">
                  I agree to the{" "}
                  <span className="font-semibold">terms & conditions</span>
                </label>
              </div>
              {errors.terms && (
                <div className="text-rose-600 text-sm">{errors.terms}</div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-2xl text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all disabled:opacity-60"
                >
                  {submitting ? "Booking..." : "Book Now & Pay Later"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
