export default function HeroSearch() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What service do you need?
          </h1>

          <p className="text-gray-600 mb-6">
            Book trusted professionals for your home services
          </p>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search for services"
              className="w-full rounded-full border px-5 py-3 shadow-sm focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block">
          <img
            src="/banner_image.webp"
            alt="Home services"
            className="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
