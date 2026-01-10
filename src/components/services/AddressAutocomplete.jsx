import { useEffect, useRef, useState } from "react";

export default function AddressAutocomplete({ value, onChange, onSelect }) {
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState([]);
  const serviceRef = useRef(null);

  // ✅ Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.places) {
      setReady(true);
      return;
    }

    const existing = document.getElementById("google-maps-script");
    if (existing) {
      existing.onload = () => setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBhXIILVsHoo0FDym93WcZkryavuEOXJv0&libraries=places";
    script.async = true;
    script.defer = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  // ✅ Init AutocompleteService ONLY after script loads
  useEffect(() => {
    if (!ready) return;
    serviceRef.current = new window.google.maps.places.AutocompleteService();
  }, [ready]);

  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input);

    if (!input || !serviceRef.current) {
      setResults([]);
      return;
    }

    serviceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "in" },
      },
      (predictions) => {
        setResults(predictions || []);
      }
    );
  };

  const handleSelect = (prediction) => {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["formatted_address", "geometry", "address_components"],
      },
      (place) => {
        if (!place) return;
        onSelect(place);
        setResults([]);
      }
    );
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={handleChange}
        placeholder="Enter address"
        disabled={!ready}
        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-xl mt-2 z-[9999] max-h-64 overflow-auto">
          {results.map((p) => (
            <div
              key={p.place_id}
              onClick={() => handleSelect(p)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {p.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
