import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrderDetailsStatus() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    setLoading(true);
    axios
      .get("https://dev.backend.fixonn.in/api/v1/order/customer/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const selected = (res.data.records || []).find(
          (o) => String(o.order_id) === String(id)
        );
        setOrder(selected || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return <p className="text-center mt-10">Order not found</p>;
  }

  const {
    service_name,
    service_charge,
    service_date,
    service_time,
    user_info,
    order_status,
    technicianDetails,
    order_grand_total,
    order_link,
  } = order;

  const getAddressLines = () => {
    const lines = [];

    // Always show address first
    if (user_info?.address) lines.push(user_info.address);

    // Then specific parts
    if (user_info?.door_no) lines.push(user_info.door_no);
    if (user_info?.street_name) lines.push(user_info.street_name);
    if (user_info?.landmark) lines.push(user_info.landmark);

    return lines.filter(Boolean);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* PAGE HEADER */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Order details
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Order #{order.order_id}
            </p>
          </div>

          <span
            className={`
            inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
            ${
              order_status === "completed"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                : order_status === "cancelled"
                ? "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
                : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
            }
          `}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                order_status === "completed"
                  ? "bg-emerald-500"
                  : order_status === "cancelled"
                  ? "bg-rose-500"
                  : "bg-amber-500"
              }`}
            />
            {order_status.charAt(0).toUpperCase() + order_status.slice(1)}
          </span>
        </header>

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/80 backdrop-blur">
          {/* top accent */}
          <div className="h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500" />

          <div className="p-6 md:p-8 space-y-6">
            {/* SERVICE + SIMPLIFIED BILL SUMMARY */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
              {/* Service details */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-rose-500">
                  Service
                </p>
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 text-xl">
                    ⚙️
                  </span>
                  <span>{service_name}</span>
                </h2>

                <dl className="mt-2 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <dt className="w-20 text-xs font-semibold text-slate-400">
                      Date
                    </dt>
                    <dd className="flex items-center gap-2">
                      <span className="text-base">📅</span>
                      <span>{service_date}</span>
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="w-20 text-xs font-semibold text-slate-400">
                      Time
                    </dt>
                    <dd className="flex items-center gap-2">
                      <span className="text-base">⏰</span>
                      <span>{service_time}</span>
                    </dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="w-20 text-xs font-semibold text-slate-400">
                      Address
                    </dt>
                    <dd className="flex items-start gap-2 flex-1">
                      <span className="mt-0.5 text-base shrink-0">📍</span>
                      <div className="space-y-1 text-sm text-slate-600">
                        {getAddressLines().map((line, index) => (
                          <p key={index} className="leading-tight">
                            {line}
                          </p>
                        ))}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* SIMPLIFIED Bill Summary - JUST AMOUNT */}
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 px-6 py-8 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-800/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#fbbf24_0%,transparent_50%)]" />

                <div className="relative text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 mb-6">
                    Bill summary
                  </p>

                  <p className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent tracking-tight mb-3">
                    ₹
                    {order_status === "completed"
                      ? order_grand_total
                      : service_charge}
                  </p>

                  <p className="text-sm text-slate-300 font-medium uppercase tracking-wide">
                    {order_status === "completed"
                      ? "Total paid"
                      : "Service charge"}
                  </p>
                </div>
              </div>
            </div>
            {/* VISITING CHARGES SECTION */}
            <div className="rounded-3xl bg-gradient-to-r from-rose-50/80 via-white to-slate-50/80 border border-rose-100/50 shadow-sm p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Visiting Charges
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Visiting charges applicable
                  </p>
                </div>
                <span className="text-2xl font-bold text-slate-900">₹0</span>
              </div>

              <div className="flex items-start gap-3 bg-rose-50 rounded-2xl p-4 border border-rose-200">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white text-xs font-bold">
                    ℹ️
                  </span>
                </div>
                <p className="text-sm text-rose-800 leading-relaxed">
                  Visiting charges will be paid to the technician if the service
                  is no longer required after technician arrival.
                </p>
              </div>
            </div>
            {/* // TECHNICIAN - Verified stamp, no mobile */}
            {order_status === "completed" && technicianDetails && (
              <div className="rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-slate-50/80 border border-emerald-100/50 shadow-sm p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-500 mb-4">
                  Technician Details
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      technicianDetails.partner_profile_pic ||
                      "/default-avatar.png"
                    }
                    alt={technicianDetails.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-100 shadow-lg relative"
                  />
                  <div className="flex-1 min-w-0 relative">
                    <p className="text-sm font-medium text-slate-900">
                      {technicianDetails.name}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md -rotate-3">
                        ✓
                      </span>
                      Verified Technician
                    </p>
                    {/* Stamp effect */}
                    <div className="absolute -top-2 -right-2 h-12 w-12 bg-gradient-to-br from-emerald-400/90 to-emerald-500/90 rounded-full blur-sm opacity-75 rotate-12 shadow-lg" />
                  </div>
                </div>
              </div>
            )}
            {order_status === "cancelled" ? (
              <div className="space-y-6">
                {/* TECHNICIAN DETAILS – WAITING */}
                <div className="rounded-3xl bg-gradient-to-br from-rose-50/80 via-white to-slate-50/80 border border-rose-200 shadow-sm p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-rose-500 mb-4">
                    Technician Details
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-rose-100 flex items-center justify-center">
                      <span className="text-rose-600 text-xl font-bold">
                        ℹ️
                      </span>
                    </div>

                    <p className="text-sm text-rose-700 font-medium">
                      Waiting to get technician assigned
                    </p>
                  </div>
                </div>

                {/* DISABLED INVOICE BUTTON */}
                <div className="pt-2">
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-sm font-semibold text-slate-400 cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    View invoice
                  </button>
                </div>

                {/* CANCELLED MESSAGE – LAST */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 text-center">
                  <p className="text-sm font-medium text-rose-700">
                    Order has been cancelled
                  </p>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={order_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] max-w-sm"
                  >
                    View invoice
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
