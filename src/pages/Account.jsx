import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function useLocal(key, initial) {
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default function Account() {
  const current = JSON.parse(localStorage.getItem("currentUser") || "null");
  const userKey = current?.email || "guest";
  const [addresses, setAddresses] = useLocal(`addresses_${userKey}`, []);
  const [cards, setCards] = useLocal(`cards_${userKey}`, []);

  const [addr, setAddr] = useState("");
  const [card, setCard] = useState({ name: "", number: "", expiry: "" });
  const [profilePic, setProfilePic] = useLocal(`profile_${userKey}`, "");

  function addAddress() {
    if (!addr) return;
    setAddresses((s) => [...s, { id: Date.now(), text: addr }]);
    setAddr("");
  }

  function addCard() {
    if (!card.number) return;
    setCards((s) => [...s, { id: Date.now(), ...card }]);
    setCard({ name: "", number: "", expiry: "" });
  }

  function removeAddress(id) {
    setAddresses((s) => s.filter((x) => x.id !== id));
  }

  function removeCard(id) {
    setCards((s) => s.filter((x) => x.id !== id));
  }

  function handleProfileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);

      // 🔥 Notify header (MainLayout) immediately
      window.dispatchEvent(new Event("profile-updated"));
    };

    reader.readAsDataURL(file);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 bg-slate-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Account</h1>
            <div className="text-sm text-slate-600">
              Manage addresses, payment methods and preferences.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-700">Signed in as</div>
            <div className="px-3 py-2 bg-white rounded-full shadow text-sm font-semibold">
              {current?.name || current?.email}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 bg-white rounded-3xl shadow p-6 flex items-center gap-6"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-slate-500">
                    {current?.name?.[0] || current?.email?.[0] || "U"}
                  </span>
                )}
              </div>
            </div>

            {/* Upload button */}
            <label className="absolute bottom-1 right-1 bg-sky-600 text-white p-2 rounded-full cursor-pointer shadow hover:scale-105 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
              />
              📷
            </label>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900">
              {current?.name || "User"}
            </h2>
            <p className="text-sm text-slate-600">{current?.email}</p>

            <div className="flex gap-3 mt-4">
              <label className="px-4 py-2 text-sm bg-sky-600 text-white rounded-xl cursor-pointer hover:bg-sky-700 transition">
                Change photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileUpload}
                  className="hidden"
                />
              </label>

              {profilePic && (
                <button
                  onClick={() => {
                    setProfilePic("");
                    window.dispatchEvent(new Event("profile-updated"));
                  }}
                  className="px-4 py-2 text-sm border border-rose-300 text-rose-600 rounded-xl hover:bg-rose-50 transition"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 6, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="col-span-2 bg-white rounded-3xl p-6 shadow"
          >
            <h3 className="font-semibold mb-4">Saved Addresses</h3>
            <div className="grid gap-3">
              {addresses.length === 0 && (
                <div className="text-sm text-slate-500">
                  No saved addresses yet.
                </div>
              )}
              {addresses.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-slate-50"
                >
                  <div className="text-sm">{a.text}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigator.clipboard?.writeText(a.text)}
                      className="text-sm text-slate-700 px-3 py-1 rounded-md border"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => removeAddress(a.id)}
                      className="text-sm text-rose-600 px-3 py-1 rounded-md border"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <label className="text-sm font-medium text-slate-700">
                  Add new address
                </label>
                <textarea
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  rows={3}
                  placeholder="House, street, area, city"
                  className="w-full mt-2 p-3 border rounded-2xl"
                />
                <div className="mt-3">
                  <button
                    onClick={addAddress}
                    className="px-4 py-2 bg-sky-600 text-white rounded-2xl"
                  >
                    Add address
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 6, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow"
          >
            <h3 className="font-semibold mb-4">Saved Cards</h3>
            <div className="space-y-3">
              {cards.length === 0 && (
                <div className="text-sm text-slate-500">
                  No saved cards. Add one for faster checkout.
                </div>
              )}
              {cards.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                >
                  <div>
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-xs text-slate-600">
                      •••• {String(c.number).slice(-4)} · {c.expiry}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeCard(c.id)}
                      className="text-sm text-rose-600 px-3 py-1 rounded-md border"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <label className="text-sm font-medium text-slate-700">
                  Add card
                </label>
                <input
                  value={card.name}
                  onChange={(e) =>
                    setCard((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="Name on card"
                  className="w-full mt-2 p-3 border rounded-2xl"
                />
                <input
                  value={card.number}
                  onChange={(e) =>
                    setCard((s) => ({ ...s, number: e.target.value }))
                  }
                  placeholder="Card number"
                  className="w-full mt-2 p-3 border rounded-2xl"
                />
                <input
                  value={card.expiry}
                  onChange={(e) =>
                    setCard((s) => ({ ...s, expiry: e.target.value }))
                  }
                  placeholder="Expiry (MM/YY)"
                  className="w-full mt-2 p-3 border rounded-2xl"
                />
                <div className="mt-3">
                  <button
                    onClick={addCard}
                    className="px-4 py-2 bg-sky-600 text-white rounded-2xl"
                  >
                    Save card
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
