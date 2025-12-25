import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const DEMO = { email: "demo@homeserve.test", password: "Demo1234" };

  useEffect(() => {
    // show demo values as placeholder/example
    if (!form.email) setForm((s) => ({ ...s, email: DEMO.email }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password)
      return setError("Please fill all required fields");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === form.email))
      return setError("An account with this email already exists");
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: form.email, name: form.name })
    );
    const dest = location.state?.from || "/";
    navigate(dest);
  }
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-50 via-white to-sky-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 9, repeat: Infinity, yoyo: true }}
          className="absolute left-10 -top-24 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-300 to-sky-400 filter blur-3xl opacity-20"
        />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10">
              <h1 className="text-3xl font-extrabold text-slate-900">
                Create account
              </h1>
              <p className="mt-3 text-slate-600">
                Get access to faster booking, saved addresses, and exclusive
                offers.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 rounded-xl bg-sky-50 border border-sky-100"
              >
                <div className="text-sm text-slate-700">
                  Tip: demo account:{" "}
                  <span className="font-mono">{DEMO.email}</span>
                </div>
              </motion.div>
            </div>

            <div className="p-10">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />

                {error && (
                  <div className="text-rose-600 text-center">{error}</div>
                )}

                <button className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-2xl text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all">
                  Create Account
                </button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
