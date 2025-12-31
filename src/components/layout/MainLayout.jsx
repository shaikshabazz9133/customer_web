import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, CalendarDays } from "lucide-react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import LoadingContext from "../../contexts/LoadingContext";
import Loader from "../Loader";
import Footer from "./Footer";
import { API_BASE_URL } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer, clearCustomer } from "../../store/customerSlice";

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { name: "Home", href: "/home" },
    { name: "Orders", href: "/orders" },
    { name: "History", href: "/history" },
  ];

  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.customer.data);
  const profileImage = currentUser?.profile_pic;
  const isValidImage =
    typeof profileImage === "string" &&
    profileImage.trim() !== "" &&
    (profileImage.startsWith("http://") || profileImage.startsWith("https://"));

  const displayProfileImage = isValidImage ? profileImage : "/person.png";

  useEffect(() => {
    if (token) dispatch(fetchCustomer());
  }, [token]);

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
    sessionStorage.clear();
    dispatch(clearCustomer());
    navigate("/");
  }

  // show a brief loader on every navigation to indicate page change
  const [loading, setLoading] = useState(false);
  // const locKey = location.pathname + location.search;
  // useEffect(() => {
  //   setLoading(true);
  //   const t = setTimeout(() => setLoading(false), 600);
  //   return () => clearTimeout(t);
  // }, [locKey]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  useLayoutEffect(() => {
    // wait for layout + loader to finish
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [location.pathname]);

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
                {NAV_ITEMS.filter((item) =>
                  isLoggedIn ? true : item.name === "Home"
                ).map((item) => (
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
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  {currentUser && (
                    <button
                      onClick={() => setUserMenuOpen((s) => !s)}
                      className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-slate-100 transition"
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-600 overflow-hidden flex items-center justify-center">
                        {profileImage ? (
                          <img
                            src={displayProfileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-semibold">
                            {(currentUser.username || "U")[0].toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span className="hidden md:block text-sm font-medium text-slate-800">
                        {currentUser.username}
                      </span>
                    </button>
                  )}

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                      {/* Profile */}
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate("/account");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-left"
                      >
                        <div className="w-9 h-9 rounded-full bg-sky-600 overflow-hidden flex items-center justify-center">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-semibold">
                              {(currentUser.username || "U")[0].toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">
                            {currentUser.username}
                          </span>
                          <span className="text-xs text-slate-500">
                            View profile
                          </span>
                        </div>
                      </button>

                      <div className="h-px bg-slate-200" />

                      {/* Sign out */}
                      <button
                        onClick={signOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-sky-600 border border-sky-600 hover:bg-sky-50 transition"
                >
                  Sign in
                </button>
              )}

              {/* Mobile Menu Button */}
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
                {NAV_ITEMS.filter((item) =>
                  isLoggedIn ? true : item.name === "Home"
                ).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-semibold py-2 px-3 rounded-xl hover:bg-sky-50"
                  >
                    {item.name}
                  </Link>
                ))}

                {isLoggedIn ? (
                  <>
                    <div className="h-px bg-slate-200 my-3" />

                    <button
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-4 w-full px-4 py-3 rounded-xl
                   text-base font-semibold text-rose-600
                   bg-rose-50 hover:bg-rose-100"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/signin");
                      setMobileOpen(false);
                    }}
                    className="mt-4 w-full px-4 py-3 rounded-xl
                 text-base font-semibold text-sky-600
                 border border-sky-600 hover:bg-sky-50"
                  >
                    Sign in
                  </button>
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
