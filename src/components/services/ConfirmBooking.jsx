import { useLocation, useNavigate } from "react-router-dom";
import { User, Phone, MapPin, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ConfirmBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);
  const [saving, setSaving] = useState(false);

  const { service, date, time, serviceId, machineTypeId } = state;

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

  /* ---------------- FETCH CUSTOMER DETAILS (ONCE) ---------------- */
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const token = sessionStorage.getItem("token");

    axios
      .get("https://dev.backend.fixonn.in/api/v1/customer/details", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const d = res.data.data[0];
        console.log("res", res.data);
        setForm((prev) => ({
          ...prev,
          name: d.username || "",
          mobile: d.mobile || "",
          address: d.address || "",
          pincode: d.pincode || "",
        }));
      })
      .catch(() => toast.error("Failed to load customer details"));
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.mobile.trim()) return toast.error("Mobile number is required");
    if (!form.address.trim()) return toast.error("Address is required");
    if (!form.pincode.trim()) return toast.error("Pin Code is required");

    try {
      setSaving(true);

      const token = sessionStorage.getItem("token");

      const payload = {
        service_id: serviceId,
        machine_id: machineTypeId,
        service_type_id: service._id,
        selected_service_type_id: service._id,
        technician_id: null, // backend can assign
        service_name: service.service_type_name,
        partner_profile_pic: service.service_type_image?.[0] || "",
        service_charge: service.service_charge,
        service_date: date,
        service_time: time,
        user_info: {
          name: form.name,
          email: customer?.email || "",
          mobile: form.mobile,
          address: form.address,
          door_no: form.doorNo,
          street_name: form.street,
          landmark: form.landmark,
          lat: customer?.lat || "",
          lng: customer?.lng || "",
          pincode: form.pincode,
        },
        order_reason: form.reason || "",
      };

      await axios.post(
        "https://dev.backend.fixonn.in/api/v1/order/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking confirmed successfully!");

      // OPTIONAL: redirect
      // navigate("/booking-success");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create booking");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-sky-600 text-white px-6 py-4">
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
          <h1 className="text-lg sm:text-xl font-semibold">Confirm Booking</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_380px] gap-10">
        {/* LEFT FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-10">
          {/* CUSTOMER */}
          <section>
            <h2 className="text-xl font-bold mb-6">Your Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Field
                icon={<User size={18} />}
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Field
                icon={<Phone size={18} />}
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* ADDRESS */}
          <section>
            <h2 className="text-xl font-bold mb-6">Service Address</h2>
            <div className="space-y-6">
              <Field
                icon={<MapPin size={18} />}
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              <div className="grid md:grid-cols-3 gap-6">
                <Field
                  label="Door No"
                  name="doorNo"
                  value={form.doorNo}
                  onChange={handleChange}
                />
                <Field
                  label="Street Name"
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
              <div className="grid md:grid-cols-2 gap-6">
                <Field
                  label="Pin Code"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
                <Field
                  label="Reason (Optional)"
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
          <h3 className="text-lg font-bold mb-6">Booking Summary</h3>

          <div className="space-y-4 text-sm">
            <Row label="Service" value={service.service_type_name} />
            <Row label="Date" value={date} />
            <Row label="Time" value={time} />
            <Row label="Duration" value="1 Hour" />
            <Row label="Staff" value="Staff Member 1" />
          </div>

          <div className="border-t my-6" />

          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">Service Charge</span>
            <span className="text-2xl font-extrabold text-sky-600">
              ₹{service.service_charge}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-sky-600 text-white py-4 rounded-xl font-bold hover:bg-sky-700 transition"
          >
            CONFIRM BOOKING
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Field({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-600 outline-none ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
