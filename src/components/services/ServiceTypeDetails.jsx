import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ServicesGridSkeleton from "../skeletons/ServicesGridSkeleton";

export default function ServiceTypeDetails() {
  const { serviceId, machineTypeId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(
        `https://dev.backend.fixonn.in/api/v1/service/type/get-servicetype-by-service-and-machineType/${serviceId}/${machineTypeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setData(res.data.data?.[0] || null))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [serviceId, machineTypeId]);

  if (loading) {
    return (
      <section className="py-8 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <ServicesGridSkeleton count={1} />
        </div>
      </section>
    );
  }

  if (!data) return null;

  const service = data.service_types[0];

  return (
    <section className="py-8 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row">
            {/* LEFT - Image */}
            <div className="lg:w-1/3 bg-gray-100">
              <img
                src={service.service_type_image?.[0] || "/placeholder.png"}
                alt={service.service_type_name}
                className="w-full h-64 lg:h-full object-cover hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* RIGHT - Content */}
            <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {service.service_type_name}
                </h1>

                <div
                  className="text-gray-600 leading-relaxed text-sm lg:text-base mb-8 line-clamp-5"
                  dangerouslySetInnerHTML={{
                    __html: service.service_type_description,
                  }}
                />
              </div>

              {/* Price + Button */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-end justify-between lg:items-center">
                  <div className="mb-4 lg:mb-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                      Service Charge
                    </p>
                    <p className="text-3xl lg:text-4xl font-black text-blue-600">
                      ₹{service.service_charge}
                    </p>
                  </div>

                  <motion.button
                    onClick={() =>
                      navigate("/schedule", {
                        state: {
                          service,
                          serviceId,
                          machineTypeId,
                        },
                      })
                    }
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-base shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap ml-4"
                  >
                    Continue →
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
