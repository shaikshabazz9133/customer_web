import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, ShieldCheck } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../api/api";


export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const isHomePage = location.pathname === "/"; // or pathname === '/'

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile number validation (digits only, max 10)
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.mobile) {
      toast.error("Please enter mobile number");
      return false;
    }
    if (form.mobile.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return false;
    }
    if (!form.password) {
      toast.error("Please enter your password");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        mobile: form.mobile,
        password: form.password,
      });

      const token = res.data.data?.access_token;

      if (token) {
        // ✅ Store token in sessionStorage
        sessionStorage.setItem("token", token);
      }

      toast.success("Login successful");

      // Optional: store token/user
      // localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid mobile number or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Toaster position="top-center" />
      {/* Main */}
      <main
        className="
    flex-1
    px-4
    py-6
    flex
    justify-center
    items-start
    sm:items-center
        max-[768px]:items-center  /* mobile & small tablet: center vertically */

  "
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border px-6 py-6"
        >
          {/* Header row */}
          <header className="flex items-center justify-between px-0 h-10 mb-4">
            {!isHomePage ? (
              <Link to="/" className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm border shadow">
                <ArrowLeft size={16} /> Back
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 invisible">
                <ArrowLeft size={16} /> Back
              </div>
            )}

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure login
            </div>
          </header>
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center mb-3">
              <Wrench className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              Sign in to Fixonn
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Login using your mobile number
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Mobile Number">
              <Input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                leftIcon={<span className="text-xs text-slate-400">+91</span>}
              />
            </Field>

            <Field label="Password">
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 text-white py-3 text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-xs text-slate-500 pt-3">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Create account
              </Link>
            </p>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ leftIcon, ...props }) {
  return (
    <div className="relative">
      {leftIcon && (
        <span className="absolute left-3 inset-y-0 flex items-center">
          {leftIcon}
        </span>
      )}
      <input
        {...props}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50 text-sm py-2.5 px-3 focus:ring-2 focus:ring-orange-500/50 outline-none ${
          leftIcon ? "pl-10" : ""
        }`}
      />
    </div>
  );
}
