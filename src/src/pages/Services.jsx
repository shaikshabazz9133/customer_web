import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo, useContext } from "react";
import { SERVICES } from "../data/services";
import LoadingContext from "../contexts/LoadingContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const container = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Services() {
  const q = useQuery();
  const initial = q.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initial);
  const category = q.get("category") || "";

  function ServiceCard({ s }) {
    const slugDash = s.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const slugUnderscore = s.title
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    const base = s.id;
    const candidates = [
      `/${base}.avif`,
      `/${base}.webp`,
      `/${base}.jpg`,
      `/${base}.jpeg`,
      `/${base}.png`,
      `/${slugDash}.avif`,
      `/${slugDash}.webp`,
      `/${slugDash}.jpg`,
      `/${slugDash}.jpeg`,
      `/${slugDash}.png`,
      `/${slugUnderscore}.avif`,
      `/${slugUnderscore}.webp`,
      `/${slugUnderscore}.jpg`,
      `/${slugUnderscore}.jpeg`,
      `/${slugUnderscore}.png`,
      s.img || `/${base}.png`,
      "/fixonn.png",
    ];

    const [idx, setIdx] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const src = candidates[idx];

    return (
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 transition"
      >
        <Link to={`/book/${s.id}`} className="block rounded-lg overflow-hidden">
          <div className="relative h-44 rounded-lg overflow-hidden bg-slate-100">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-100 animate-pulse" />
              </div>
            )}

            <img
              src={src}
              alt={s.title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => {
                if (idx < candidates.length - 1) setIdx((i) => i + 1);
                else setLoaded(true);
              }}
              className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${loaded ? "" : "opacity-0"}`}
            />

            <div className="absolute left-3 top-3 bg-white/85 text-xs text-slate-800 px-2 py-1 rounded-md">
              {s.category}
            </div>
          </div>

          <div className="mt-3 px-1">
            <h3 className="text-base font-medium text-slate-900">{s.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{s.desc}</p>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-slate-700">
                Starting <span className="font-semibold text-slate-900">{s.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/services/${s.id}`} className="text-sm text-slate-500 hover:text-slate-700">
                  Details
                </Link>
                <Link to={`/book/${s.id}`} className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm rounded-lg shadow-sm">
                  Book
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  const filtered = useMemo(() => {
    const s = (searchTerm || "").toLowerCase().trim();
    return SERVICES.filter((svc) => {
      if (category && svc.category !== category) return false;
      if (!s) return true;
      return (
        svc.title.toLowerCase().includes(s) ||
        svc.desc.toLowerCase().includes(s) ||
        svc.category.toLowerCase().includes(s)
      );
    });
  }, [searchTerm, category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <motion.h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Our Services
          </motion.h1>

          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services, e.g. plumbing, AC..."
                className="w-full px-4 py-2 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-500">
            Showing {filtered.length} results
          </div>
          <div className="text-sm">
            {category ? (
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                {category}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useContext(LoadingContext).loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-transparent animate-pulse"
                >
                  <div className="h-44 rounded-lg bg-slate-100" />
                  <div className="mt-3 px-1">
                    <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="h-5 w-20 bg-slate-200 rounded" />
                      <div className="h-8 w-20 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : filtered.map((s) => {
                const slugDash = s.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");
                const slugUnderscore = s.title
                  .toLowerCase()
                  .replace(/\s+/g, "_")
                  .replace(/[^a-z0-9_]/g, "");
                const base = s.id;
                const candidates = [
                  `/${base}.avif`,
                  `/${base}.webp`,
                  `/${base}.jpg`,
                  `/${base}.jpeg`,
                  `/${base}.png`,
                  `/${slugDash}.avif`,
                  `/${slugDash}.webp`,
                  `/${slugDash}.jpg`,
                  `/${slugDash}.jpeg`,
                  `/${slugDash}.png`,
                  `/${slugUnderscore}.avif`,
                  `/${slugUnderscore}.webp`,
                  `/${slugUnderscore}.jpg`,
                  `/${slugUnderscore}.jpeg`,
                  `/${slugUnderscore}.png`,
                  s.img || `/${base}.png`,
                  "/fixonn.png",
                ];

                return (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 transition"
                  >
                    <Link
                      to={`/book/${s.id}`}
                      className="block rounded-lg overflow-hidden"
                    >
                      <div className="relative h-44 rounded-lg overflow-hidden bg-slate-100">
                        <img
                          src={candidates[0]}
                          data-src-list={candidates.join("|")}
                          alt={s.title}
                          loading="lazy"
                          onError={(e) => {
                            const imgEl = e.currentTarget;
                            const list = (imgEl.dataset.srcList || "").split(
                              "|"
                            );
                            let idx = parseInt(
                              imgEl.dataset.srcIndex || "0",
                              10
                            );
                            if (isNaN(idx)) idx = 0;
                            if (idx < list.length - 1) {
                              idx += 1;
                              imgEl.dataset.srcIndex = String(idx);
                              imgEl.src = list[idx];
                            }
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 bg-white/85 text-xs text-slate-800 px-2 py-1 rounded-md">
                          {s.category}
                        </div>
                      </div>

                      <div className="mt-3 px-1">
                        <h3 className="text-base font-medium text-slate-900">
                          {s.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{s.desc}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm text-slate-700">
                            Starting{" "}
                            <span className="font-semibold text-slate-900">
                              {s.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/services/${s.id}`}
                              className="text-sm text-slate-500 hover:text-slate-700"
                            >
                              Details
                            </Link>
                            <Link
                              to={`/book/${s.id}`}
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm rounded-lg shadow-sm"
                            >
                              Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </motion.div>
  );
}
