import { useEffect, useState } from "react";

export function OfferCard({ offer }) {
  const images = offer.banner_image || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white">
      {/* IMAGE */}
      <div className="relative w-full h-[260px]">
        <img
          src={images[index] || "/placeholder.png"}
          alt={offer.service_name}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* SERVICE NAME */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white text-base font-semibold truncate">
            {offer.service_name}
          </p>
        </div>
      </div>
    </div>
  );
}
