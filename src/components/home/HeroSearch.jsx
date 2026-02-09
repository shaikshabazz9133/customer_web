export default function HeroSearch({ searchQuery = "", onSearchChange }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT - Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What service do you need?
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
            Book trusted professionals for your home services
          </p>
          <div className="relative max-w-md mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Search for services"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full rounded-full border px-5 py-3 shadow-sm focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* RIGHT - Image */}
        <div className="order-1 lg:order-2">
          <img
            src="/banner_image.webp"
            alt="Home services"
            className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-3xl shadow-lg mx-auto lg:mx-0"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300"; // Fallback placeholder
            }}
          />
        </div>
      </div>
    </section>
  );
}
