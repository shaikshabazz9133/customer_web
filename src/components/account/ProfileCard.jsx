import { motion } from "framer-motion";
import { MapPin, Mail, Phone, User, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { updateCustomer, updateImage } from "../../store/customerSlice";

export default function ProfileCard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const hasFetchedRef = useRef(false);

  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.customer.data);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true); // 🔄 start loader

      await dispatch(
        updateCustomer({
          username: profile.name,
          email: profile.email,
          mobile: profile.phone,
          address: profile.address,
          pincode: profile.pincode,
          profile_pic: profileImage,
        })
      ).unwrap();

      setSaved(true);
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setSaving(false); // ✅ stop loader
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    setProfile({
      name: currentUser.username || "",
      email: currentUser.email || "",
      phone: currentUser.mobile || "",
      address: currentUser.address || "",
      pincode: currentUser.pincode || "",
    });

    setProfileImage(currentUser.profile_pic || "");
  }, [currentUser]);

  /* IMAGE UPLOAD */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch(`${API_BASE_URL}/auth/upload/file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ ONLY this
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const json = await res.json();
      const imageUrl = json?.data?.[0]?.filepath;

      if (imageUrl) {
        setProfileImage(imageUrl);
        dispatch(updateImage(imageUrl));
      }
    } catch (err) {
      console.error("Image upload error", err);
    }
  };

  const removeImage = () => {
    setProfileImage("");
  };

  const isValidImageUrl =
    typeof profileImage === "string" &&
    (profileImage.startsWith("http://") || profileImage.startsWith("https://"));

  const displayProfileImage = isValidImageUrl ? profileImage : "/person.png";

  return (
    <>
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
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* LEFT – PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 p-1">
                <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                  <img
                    src={displayProfileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
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
              onChange={handleChange} // ✅ ADD THIS

              // disabled
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
        {/* BUTTON - Bottom Right with space */}
        <div className="flex justify-end mt-2">
          <motion.button
            whileHover={!saving ? { y: -2 } : {}}
            whileTap={!saving ? { scale: 0.97 } : {}}
            onClick={handleSave}
            disabled={saving}
            className={`px-8 py-3 rounded-full font-semibold text-white transition flex items-center gap-2 ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : saved
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : saved ? (
              "Update Profile"
            ) : (
              "Save Profile"
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
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
