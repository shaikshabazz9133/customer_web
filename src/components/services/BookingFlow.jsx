import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  ChevronDown,
  Clock,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import AddressAutocomplete from "./AddressAutocomplete";

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

export default function BookingFlow() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const { service, serviceId, machineTypeId } = state;

  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);
  const addressRef = useRef(null);
  const autocompleteRef = useRef(null);
  const latRef = useRef("");
  const lngRef = useRef("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    doorNo: "",
    street: "",
    landmark: "",
    pincode: "",
    reason: "",
  });

  // 🚀 Time validation logic
  const getCurrentTimeIndex = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour < 9) return -1;
    if (currentHour === 9 && currentMinute < 30) return 0;

    const timeIndex = TIMES.findIndex((t) => {
      const [hour, period] = t.match(/(\d+):00 (AM|PM)/).slice(1);
      const h = parseInt(hour) + (period === "PM" && hour !== "12" ? 12 : 0);
      return h === currentHour;
    });
    return timeIndex;
  };

  const isTimeDisabled = (timeSlot, currentTimeIndex) => {
    const slotIndex = TIMES.indexOf(timeSlot);
    return slotIndex <= currentTimeIndex;
  };

  const currentTimeIndex = getCurrentTimeIndex();
  const BOOKING_DRAFT_KEY = "booking_draft";
  const emailRef = useRef("");

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(BOOKING_DRAFT_KEY);
    if (!savedDraft) return;

    const parsed = JSON.parse(savedDraft);

    setActiveStep(parsed.activeStep ?? 0);
    setDate(parsed.date ?? date);
    setTime(parsed.time ?? "");
    setForm(parsed.form ?? form);

    // clear draft after restoring
    sessionStorage.removeItem(BOOKING_DRAFT_KEY);
  }, []);

  useEffect(() => {
    const getScrollParent = (el) => {
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        if (
          /(auto|scroll)/.test(style.overflowY) ||
          /(auto|scroll)/.test(style.overflow)
        ) {
          return el;
        }
        el = el.parentElement;
      }
      return window;
    };

    let scrollParent = null;

    const reposition = () => {
      const input = addressRef.current;
      const pac = document.querySelector(".pac-container");

      if (!input || !pac) return;

      const rect = input.getBoundingClientRect();

      pac.style.position = "fixed"; // 🔥 KEY CHANGE
      pac.style.top = `${rect.bottom}px`;
      pac.style.left = `${rect.left}px`;
      pac.style.width = `${rect.width}px`;
      pac.style.zIndex = "2147483647";
    };

    const attach = () => {
      if (!addressRef.current) return;
      scrollParent = getScrollParent(addressRef.current);

      reposition();

      if (scrollParent !== window) {
        scrollParent.addEventListener("scroll", reposition, true);
      }
      window.addEventListener("resize", reposition);
    };

    attach();

    document.addEventListener("focusin", reposition);
    document.addEventListener("input", reposition);

    return () => {
      if (scrollParent && scrollParent !== window) {
        scrollParent.removeEventListener("scroll", reposition, true);
      }
      window.removeEventListener("resize", reposition);
      document.removeEventListener("focusin", reposition);
      document.removeEventListener("input", reposition);
    };
  }, []);

  useEffect(() => {
    if (hasFetchedRef.current || activeStep !== 1) return;
    hasFetchedRef.current = true;

    const token = sessionStorage.getItem("token");
    axios
      .get("https://dev.backend.fixonn.in/api/v1/customer/details", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const d = res.data.data[0];
        emailRef.current = d.email || ""; // 👈 store silently

        setForm((prev) => ({
          ...prev,
          name: d.username || "",
          mobile: d.mobile || "",
          // address: d.address || "",
          pincode: d.pincode || "",
        }));
      })
      .catch(() => toast.error("Failed to load customer details"));
  }, [activeStep]);

  const toggleStep = (step) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const handleNextStep = () => {
    if (!date || !time) return toast.error("Please select date and time");
    setActiveStep(1);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");

    // 🔐 If user not logged in
    if (!token) {
      const draft = {
        activeStep,
        date,
        time,
        form,
        state, // includes service, serviceId, machineTypeId
      };

      sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));

      navigate("/signin", {
        state: {
          redirectTo: "/booking-flow",
          bookingState: state,
        },
      });
      return;
    }

    if (!date || !time) return toast.error("Please select date and time first");
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.mobile.trim()) return toast.error("Mobile number is required");
    if (!form.address.trim()) return toast.error("Address is required");
    if (!form.pincode.trim()) return toast.error("Pin Code is required");

    try {
      setSaving(true);

      const payload = {
        service_id: serviceId,
        machine_id: machineTypeId,
        service_type_id: service._id,
        selected_service_type_id: service._id,
        technician_id: null,
        service_name: service.service_type_name,
        partner_profile_pic: service.service_type_image?.[0] || "",
        service_charge: service.service_charge,
        service_date: date,
        service_time: time,
        user_info: {
          name: form.name,
          email: emailRef.current || "", // 👈 invisible but sent
          mobile: form.mobile,
          address: form.address,
          door_no: form.doorNo,
          street_name: form.street,
          landmark: form.landmark,
          lat: latRef.current || "", // ✅ sent
          lng: lngRef.current || "", // ✅ sent
          pincode: form.pincode,
        },
        order_reason: form.reason || "",
      };

      await axios.post(
        "https://dev.backend.fixonn.in/api/v1/order/create",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking confirmed successfully!");
      navigate("/orders");
    } catch {
      toast.error("Failed to create booking");
    } finally {
      setSaving(false);
    }
  };

  const isConfirmDisabled = !date || !time || saving;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/50 to-orange-50/30">
      {/* HEADER - Compact & Title Right */}
      <div
        className="bg-gradient-to-r from-[#C62828] to-[#D32F2F] text-white px-5 lg:px-8 py-4 shadow-xl"
        style={{ boxShadow: "0 15px 35px -12px rgba(198, 40, 40, 0.25)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex-1 text-center">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight">
              Booking
            </h1>
          </div>
          <div className="w-10 lg:w-16" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8 lg:space-y-10">
        {/* Schedule Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 overflow-visible hover:shadow-2xl transition-all duration-500"
        >
          <motion.div
            className="bg-gradient-to-r from-slate-100/90 to-slate-200/90 text-slate-800 px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between cursor-pointer select-none hover:from-slate-200 hover:to-slate-300 transition-all"
            onClick={() => toggleStep(0)}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                  activeStep === 0 ? "bg-[#C62828]" : "bg-slate-400"
                }`}
              />
              <span className="font-semibold text-base lg:text-lg">
                📅 Schedule Appointment
              </span>
            </div>
            <motion.div
              animate={{ rotate: activeStep === 0 ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              height: activeStep === 0 ? "auto" : 0,
              opacity: activeStep === 0 ? 1 : 0,
            }}
            className="overflow-visible"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-6 lg:p-9 bg-gradient-to-b from-slate-50/80 to-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-slate-800 mb-3">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl lg:rounded-2xl border-2 border-slate-200 focus:ring-3 focus:ring-[#C62828]/20 focus:border-[#C62828] bg-white shadow-lg text-lg font-medium h-14 lg:h-16 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base lg:text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    Select Time <Clock size={16} className="text-slate-500" />
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-3">
                    {TIMES.map((t) => {
                      const disabled = isTimeDisabled(t, currentTimeIndex);
                      return (
                        <motion.button
                          key={t}
                          whileHover={{ scale: disabled ? 1 : 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => !disabled && setTime(t)}
                          disabled={disabled}
                          className={`py-3 px-3 lg:px-4 rounded-lg lg:rounded-xl font-medium border-2 shadow-md transition-all text-sm lg:text-base h-12 lg:h-14 flex items-center justify-center backdrop-blur-sm ${
                            disabled
                              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                              : time === t
                              ? "bg-[#C62828] text-white border-[#C62828] shadow-[#C62828]/25"
                              : "bg-white/90 text-slate-700 border-slate-200 hover:border-[#C62828]/40 hover:bg-white hover:shadow-lg"
                          }`}
                        >
                          {t}
                        </motion.button>
                      );
                    })}
                  </div>
                  {currentTimeIndex >= 0 && (
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      ⏰ Past slots unavailable (Current:{" "}
                      {TIMES[currentTimeIndex] || "Closed"})
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                onClick={handleNextStep}
                whileHover={{ scale: 1.02 }}
                disabled={!date || !time}
                className="w-full mt-8 lg:mt-10 bg-gradient-to-r from-[#C62828] to-[#D32F2F] hover:from-[#B71C1C] text-white py-4 lg:py-5 rounded-xl lg:rounded-2xl font-semibold text-lg lg:text-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:shadow-md transition-all flex items-center justify-center gap-2 h-14 lg:h-16"
              >
                Continue to Details
                <ChevronDown size={20} className="-rotate-90" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Customer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
          style={{ transform: "none" }}
        >
          <motion.div
            className="bg-gradient-to-r from-slate-100/90 to-slate-200/90 text-slate-800 px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between cursor-pointer select-none hover:from-slate-200 hover:to-slate-300 transition-all"
            onClick={() => toggleStep(1)}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                  activeStep === 1 ? "bg-[#C62828]" : "bg-slate-400"
                }`}
              />
              <span className="font-semibold text-base lg:text-lg">
                👤 Customer Details
              </span>
            </div>
            <motion.div
              animate={{ rotate: activeStep === 1 ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              height: activeStep === 1 ? "auto" : 0,
              opacity: activeStep === 1 ? 1 : 0,
            }}
            className="overflow-visible" // 🔥 CHANGED from overflow-hidden
            style={{ zIndex: 10 }} // 🔥 Force above everything
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-6 lg:p-9 bg-gradient-to-b from-slate-50/80 to-white">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
                {/* LEFT: Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 lg:space-y-7"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                    <Field
                      icon={<User size={18} />}
                      label="Full Name *"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <Field
                      icon={<Phone size={18} />}
                      label="Mobile *"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Address field - PORTAL Z-INDEX */}
                  <div
                    style={{
                      //
                      zIndex: 999999999,
                      // pointerEvents: "none",
                    }}
                  >
                    <label className="block text-sm lg:text-base font-semibold text-slate-800 mb-2.5">
                      Full Address *
                    </label>

                    <AddressAutocomplete
                      value={form.address}
                      onChange={(v) =>
                        setForm((prev) => ({ ...prev, address: v }))
                      }
                      onSelect={(place) => {
                        let pincode = "";

                        place.address_components?.forEach((c) => {
                          if (c.types.includes("postal_code")) {
                            pincode = c.long_name;
                          }
                        });

                        latRef.current = place.geometry.location
                          .lat()
                          .toString();
                        lngRef.current = place.geometry.location
                          .lng()
                          .toString();

                        setForm((prev) => ({
                          ...prev,
                          address: place.formatted_address,
                          pincode,
                        }));
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    <Field
                      label="Door No"
                      name="doorNo"
                      value={form.doorNo}
                      onChange={handleChange}
                    />
                    <Field
                      label="Street"
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                    />
                    <Field
                      label="Landmark"
                      name="landmark"
                      value={form.landmark}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Field
                      label="Pin Code *"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                    />
                    <Field
                      label="Issue (Optional)"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>

                {/* RIGHT: Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:sticky lg:top-24 bg-gradient-to-br from-white/95 to-slate-50/70 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-slate-100/60 shadow-xl backdrop-blur-xl"
                  style={{ zIndex: 1 }}
                >
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-200/50">
                    <div className="w-2.5 h-2.5 bg-[#C62828]/80 rounded-full shadow-md" />
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-900">
                      Booking Summary
                    </h3>
                  </div>

                  <div className="space-y-3 text-slate-700">
                    <div className="flex justify-between py-1.5">
                      <span className="font-medium text-sm">Service</span>
                      <span className="font-semibold text-slate-900 text-base lg:text-lg">
                        {service.service_type_name}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="font-medium text-sm">Date</span>
                      <span className="font-semibold text-slate-900 text-base lg:text-lg">
                        {date}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="font-medium text-sm">Time</span>
                      <span className="font-semibold text-slate-900 text-base lg:text-lg">
                        {time || "--:--"}
                      </span>
                    </div>
                    <div className="pt-5 mt-4 border-t border-slate-200/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">
                          Service Charge
                        </span>
                        <span className="text-xl lg:text-2xl font-extrabold text-[#C62828] leading-none">
                          ₹{service.service_charge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isConfirmDisabled}
                    className="w-full mt-7 bg-gradient-to-r from-[#C62828] to-[#D32F2F] hover:from-[#B71C1C] text-white py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-semibold text-sm lg:text-base shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:shadow-md disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 h-13 lg:h-14"
                  >
                    {saving ? "Confirming..." : "✅ Confirm Booking"}
                    <ChevronDown size={18} className="-rotate-90" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon, label, inputRef, ...props }) {
  return (
    <div>
      <label className="block text-sm lg:text-base font-semibold text-slate-800 mb-2.5">
        {label}
      </label>
      <div className="relative" style={{ zIndex: 1000 }}>
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          {...props}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ zIndex: 1001 }} // 🔥 Ensure input > icon
        />
      </div>
    </div>
  );
}
