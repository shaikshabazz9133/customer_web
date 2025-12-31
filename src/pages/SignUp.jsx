import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Home, ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../api/api";

export default function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState("form"); // "form" | "otp"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!form.phone) {
      toast.error("Please enter mobile number");
      return false;
    }
    if (form.phone.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return false;
    }
    if (!form.password) {
      toast.error("Please enter password");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${API_BASE_URL}/auth/create-customer`, {
        username: form.name,
        mobile: form.phone,
        email: form.email,
        password: form.password,
      });

      if (res.data?.verification_required) {
        toast("Mobile number not verified. Sending OTP…");
        const otpRes = await axios.post(`${API_BASE_URL}/auth/sendotp`, {
          mobile: form.phone,
        });
        setVerificationId(otpRes.data.verification_id);
        setStep("otp");
        toast.success("OTP sent to your mobile number");
      } else {
        toast.success("Account created successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(`${API_BASE_URL}/auth/verifyotp`, {
        code: otp,
        verification_id: verificationId,
      });
      toast.success("Mobile number verified successfully");
      navigate("/");
    } catch (err) {
      toast.error("Invalid OTP. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50 overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "12px",
            background: "white",
            color: "#111827",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
            fontWeight: 500,
          },
        }}
      />

      {/* Top bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 h-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:shadow-md hover:bg-slate-50 transition"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secure & verified bookings</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* Left hero (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex flex-col justify-between rounded-2xl bg-gradient-to-br from-orange-100 via-amber-50 to-sky-100 border border-orange-100 shadow-md p-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-orange-700 shadow-sm border border-orange-100">
                <Home className="w-4 h-4" />
                Home services you can trust
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900 leading-tight">
                Fix problems at home in a few taps.
              </h2>

              <p className="mt-2 text-sm text-slate-600 max-w-md">
                Book plumbers, electricians, appliance repair and more with
                verified professionals arriving on time.
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/80 p-4 shadow-sm border border-slate-100">
                  <p className="text-xs text-slate-500">Avg. response time</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    under 30 mins
                  </p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 shadow-sm border border-slate-100">
                  <p className="text-xs text-slate-500">Trusted bookings</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    10K+ customers
                  </p>
                </div>
              </dl>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-orange-400/80 border-2 border-orange-100" />
                <div className="w-7 h-7 rounded-full bg-emerald-400/80 border-2 border-emerald-100" />
                <div className="w-7 h-7 rounded-full bg-sky-400/80 border-2 border-sky-100" />
              </div>
              <p className="text-xs text-slate-600">
                “Super quick service, app is easy to use.”
              </p>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            className="
    bg-white rounded-2xl shadow-xl border border-slate-100
    px-5 py-5 sm:px-6 sm:py-5
    flex flex-col
    max-h-[calc(100dvh-3.5rem)]
  "
          >
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
                Create your Fixonn account
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Manage all your home service bookings in one place.
              </p>
            </div>

            <div className="flex-1 overflow-hidden">
              {step === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field label="Full Name">
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </Field>

                  <Field label="Email Address">
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </Field>

                  <Field label="Mobile Number">
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10 digit number"
                      leftIcon={
                        <span className="text-slate-400 text-xs font-medium">
                          +91
                        </span>
                      }
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Password">
                      <Input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
                      />
                    </Field>
                    <Field label="Confirm Password">
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat password"
                      />
                    </Field>
                  </div>

                  {error && <ErrorBanner text={error} />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-3 shadow-md hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 pt-3">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              )}

              {step === "otp" && (
                <div className="space-y-5">
                  <div className="text-center space-y-1">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Verify your mobile
                    </h2>
                    <p className="text-xs text-slate-500">
                      Enter the 6‑digit code sent to{" "}
                      <span className="font-semibold text-orange-600">
                        +91 {form.phone}
                      </span>
                    </p>
                  </div>

                  <OtpInput value={otp} onChange={setOtp} />

                  {error && <ErrorBanner text={error} />}

                  <button
                    onClick={verifyOtp}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 shadow-md hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full text-xs text-slate-500 hover:text-slate-700 font-medium pt-1"
                  >
                    Edit details
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ---------- UI sub components (JSX only) ---------- */

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs sm:text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input(props) {
  const { leftIcon, ...rest } = props;
  return (
    <div className="relative">
      {leftIcon && (
        <span className="absolute inset-y-0 left-3 flex items-center text-xs">
          {leftIcon}
        </span>
      )}
      <input
        {...rest}
        className={
          "w-full rounded-2xl border border-slate-200 bg-slate-50/70 text-sm text-slate-900 placeholder-slate-400 py-2.5 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition " +
          (leftIcon ? "pl-10" : "pl-3")
        }
      />
    </div>
  );
}

function ErrorBanner({ text }) {
  return (
    <div className="mt-2 rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
      {text}
    </div>
  );
}

function OtpInput({ value, onChange }) {
  return (
    <div className="flex gap-2 justify-between bg-slate-50 rounded-2xl p-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => {
            const val = value.split("");
            val[i] = e.target.value.replace(/\D/, "");
            onChange(val.join(""));
          }}
          className="w-10 h-12 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none"
        />
      ))}
    </div>
  );
}
