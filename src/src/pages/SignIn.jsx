import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const DEMO = {
    name: "Demo User",
    email: "demo@homeserve.test",
    password: "Demo1234",
  };

  useEffect(() => {
    // ensure demo user exists for quick testing
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const has = users.find((u) => u.email === DEMO.email);
      if (!has) {
        users.push(DEMO);
        localStorage.setItem("users", JSON.stringify(users));
      }
    } catch (e) {
      localStorage.setItem("users", JSON.stringify([DEMO]));
    }
    // prefill email to demo for convenience
    setForm((s) => ({ ...s, email: DEMO.email }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const u = users.find(
      (x) => x.email === form.email && x.password === form.password
    );
    if (!u) return setError("Invalid email or password");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: u.email, name: u.name })
    );
    const dest = location.state?.from || "/";
    navigate(dest);
  }
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 8, repeat: Infinity, yoyo: true }}
          className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 filter blur-3xl opacity-30"
        />
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.01 }}
          transition={{ duration: 10, repeat: Infinity, yoyo: true }}
          className="absolute -right-24 top-32 w-72 h-72 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 filter blur-3xl opacity-24"
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
            <div className="p-10 bg-gradient-to-b from-white to-sky-50">
              <h1 className="text-3xl font-extrabold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-3 text-slate-600">
                Sign in to manage bookings, apply offers and save addresses for
                faster checkout.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 rounded-xl bg-sky-50 border border-sky-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-700">Demo account</div>
                    <div className="font-mono text-xs">
                      {DEMO.email} / {DEMO.password}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => setForm(DEMO)}
                      className="px-3 py-1 bg-sky-600 text-white rounded-2xl text-sm"
                    >
                      Use demo
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="mt-6 text-sm text-slate-500">
                Not a member?{" "}
                <Link to="/signup" className="text-sky-600 font-semibold">
                  Create account
                </Link>
              </div>
            </div>

            <div className="p-10">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div>
                  <label className="sr-only">Email address</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="sr-only">Password</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {error && (
                  <div className="text-rose-600 text-center">{error}</div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-2xl text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all"
                >
                  Sign in
                </button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
