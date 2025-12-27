import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, CalendarDays } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LoadingContext from "../../contexts/LoadingContext";
import Loader from "../Loader";
import Footer from "./Footer";

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "History", href: "/history" },
  ];

  const [bookingCount, setBookingCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    function readCount() {
      try {
        const b = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookingCount(Array.isArray(b) ? b.length : 0);
      } catch {
        setBookingCount(0);
      }
    }

    readCount();

    function onStorage(e) {
      if (!e || !e.key) {
        readCount();
        try {
          setCurrentUser(
            JSON.parse(localStorage.getItem("currentUser") || "null")
          );
        } catch {}
        return;
      }
      if (e.key === "bookings") readCount();
      if (e.key === "currentUser") {
        try {
          setCurrentUser(
            JSON.parse(localStorage.getItem("currentUser") || "null")
          );
        } catch {
          setCurrentUser(null);
        }
      }
      if (e.key === "currentUser") {
        try {
          const user = JSON.parse(
            localStorage.getItem("currentUser") || "null"
          );
          setCurrentUser(user);
          readProfileImage(user);
        } catch {
          setCurrentUser(null);
          setProfileImage(null);
        }
      }

      if (e.key?.startsWith("profile_")) {
        readProfileImage(currentUser);
      }
    }

    window.addEventListener("storage", onStorage);

    // custom event listener (other parts may dispatch 'bookings-updated')
    const onCustom = () => readCount();
    window.addEventListener("bookings-updated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("bookings-updated", onCustom);
    };
  }, []);

  // close user menu when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function signOut() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserMenuOpen(false);
    navigate("/");
  }

  // show a brief loader on every navigation to indicate page change
  const [loading, setLoading] = useState(false);
  const locKey = location.pathname + location.search;
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [locKey]);

  useEffect(() => {
    if (!currentUser?.email) {
      setProfileImage(null);
      return;
    }

    const img = localStorage.getItem(`profile_${currentUser.email}`);
    setProfileImage(img ? JSON.parse(img) : null);
  }, [currentUser]);

  useEffect(() => {
    function onProfileUpdate() {
      if (!currentUser?.email) return;

      const img = localStorage.getItem(`profile_${currentUser.email}`);
      setProfileImage(img ? JSON.parse(img) : null);
    }

    window.addEventListener("profile-updated", onProfileUpdate);

    return () => {
      window.removeEventListener("profile-updated", onProfileUpdate);
    };
  }, [currentUser]);

  useEffect(() => {
    setLoading(true);

    const MIN_LOADING_TIME = 700; // 👈 adjust (ms)

    const timer = setTimeout(() => {
      setLoading(false);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/fixonn.png"
                  alt="fixon"
                  className="w-10 h-10 rounded-lg object-cover shadow"
                />
                <div className="hidden sm:block">
                  <div className="text-lg font-bold text-slate-900">Fixon</div>
                  <div className="text-xs text-slate-500">
                    Home services, simplified
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <nav className="flex items-center gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium px-3 py-2 rounded-md transition ${
                      location.pathname === item.href
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" ref={userMenuRef}>
                {currentUser ? (
                  <button
                    onClick={() => setUserMenuOpen((s) => !s)}
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-slate-100 transition"
                  >
                    {/* <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold">
                      {(currentUser.name ||
                        currentUser.email ||
                        "U")[0]?.toUpperCase()}
                    </div> */}
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-sky-600 flex items-center justify-center">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold">
                          {(currentUser?.name ||
                            currentUser?.email ||
                            "U")[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="hidden md:block text-sm text-slate-700">
                      {currentUser.name || currentUser.email}
                    </div>
                  </button>
                ) : (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to="/"
                      className="text-sm text-slate-700 hover:text-sky-600"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="text-sm font-semibold text-sky-600"
                    >
                      Sign up
                    </Link>
                  </div>
                )}

                {userMenuOpen && currentUser && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border p-2 z-50">
                    <Link
                      to="/account"
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-sky-50"
                    >
                      <User className="w-4 h-4" />
                      Account
                    </Link>
                    <button
                      onClick={signOut}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              <button
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setMobileOpen((s) => !s)}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden pb-4 pt-2 border-t border-slate-200">
              <nav className="flex flex-col space-y-3 p-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-semibold text-slate-900 hover:text-sky-600 py-2 px-3 rounded-xl hover:bg-sky-50 transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {currentUser ? (
                  <>
                    <Link
                      to="/account"
                      className="text-lg font-semibold text-slate-900 hover:text-sky-600 py-2 px-3 rounded-xl"
                      onClick={() => setMobileOpen(false)}
                    >
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="text-left text-lg font-semibold text-rose-600 py-2 px-3 rounded-xl"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to="/"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-semibold text-slate-900"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-semibold text-sky-600"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <LoadingContext.Provider value={{ loading }}>
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
      </LoadingContext.Provider>

      {/* <Loader loading={loading} /> */}

      <Footer />
    </div>
  );
}
