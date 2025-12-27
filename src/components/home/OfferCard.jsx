export function OfferCard({ offer }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center p-6 sm:p-8">
        {/* LEFT */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            {offer.title}{" "}
            <span className="text-red-600">{offer.highlight}</span>
          </h3>

          <p className="text-gray-600 text-sm mt-2">{offer.subtitle}</p>

          {/* <button className="mt-5 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition">
            Book Now
          </button> */}
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center mt-6 sm:mt-0">
          <div className="absolute bottom-1 w-36 h-8 bg-orange-400 rounded-full blur-md opacity-70" />
          <img
            src={offer.image}
            alt={offer.title}
            className="relative z-10 h-40 object-contain"
          />
        </div>
      </div>

      <div className="px-6 pb-4 text-sm font-medium text-gray-800">
        {offer.category}
      </div>
    </div>
  );
}
