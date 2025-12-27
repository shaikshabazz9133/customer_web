import { motion } from "framer-motion";
import { MapPin, Mail, Phone, User, Camera } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfileCard({ currentUser }) {
  const key = `profile_details_${currentUser?.email}`;
  const imageKey = `profile_${currentUser?.email}`;

  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [saved, setSaved] = useState(false);

  /* LOAD SAVED DATA */
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setProfile(JSON.parse(stored));
      setSaved(true);
    }

    const img = localStorage.getItem(imageKey);
    if (img) setProfileImage(JSON.parse(img));
  }, [key, imageKey]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* SAVE / UPDATE */
  const handleSave = () => {
    localStorage.setItem(key, JSON.stringify(profile));
    setSaved(true);
  };

  /* IMAGE UPLOAD */
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
      localStorage.setItem(imageKey, JSON.stringify(reader.result));

      // 🔔 notify header
      window.dispatchEvent(new Event("profile-updated"));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProfileImage("");
    localStorage.removeItem(imageKey);
    window.dispatchEvent(new Event("profile-updated"));
  };

  return (
    <motion.div
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-3xl shadow-xl p-6 mb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Profile</h2>
          <p className="text-sm text-slate-500">
            Update your personal information
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className={`px-6 py-2 rounded-full font-semibold text-white transition ${
            saved
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {saved ? "Update Profile" : "Save Profile"}
        </motion.button>
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* LEFT – PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 p-1">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-slate-400">
                    {profile.name?.[0] || profile.email?.[0] || "U"}
                  </span>
                )}
              </div>
            </div>

            {/* CAMERA BUTTON */}
            <label className="absolute bottom-1 right-1 bg-sky-600 text-white p-2 rounded-full cursor-pointer shadow hover:scale-105 transition">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {profileImage && (
            <button
              onClick={removeImage}
              className="mt-3 text-sm text-rose-600 hover:underline"
            >
              Remove photo
            </button>
          )}
        </div>

        {/* RIGHT – FORM */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            icon={<User size={16} />}
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <Input
            icon={<Mail size={16} />}
            label="Email Address"
            name="email"
            value={profile.email}
            disabled
          />

          <Input
            icon={<Phone size={16} />}
            label="Mobile Number"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <Input
            label="Pincode"
            name="pincode"
            value={profile.pincode}
            onChange={handleChange}
          />

          <Textarea
            icon={<MapPin size={16} />}
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="md:col-span-2"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Input({ icon, label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-slate-600">{label}</label>
      <div className="relative mt-1">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-sky-500 outline-none ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function Textarea({ icon, label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-slate-600">{label}</label>
      <div className="relative mt-1">
        {icon && (
          <div className="absolute left-3 top-3 text-slate-400">{icon}</div>
        )}
        <textarea
          {...props}
          rows={3}
          className="w-full px-4 py-3 pl-10 rounded-2xl border focus:ring-2 focus:ring-sky-500 outline-none"
        />
      </div>
    </div>
  );
}
