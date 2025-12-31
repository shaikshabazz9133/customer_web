
import HeroSearch from "../components/home/HeroSearch";
import ServicesGrid from "../components/home/ServicesGrid";
import OffersSection from "../components/home/OffersSection";
import { useEffect, useState } from "react";
import HeroSearchSkeleton from "../components/skeletons/HeroSearchSkeleton";
import ServicesGridSkeleton from "../components/skeletons/ServicesGridSkeleton";
import OffersSkeleton from "../components/skeletons/OffersSkeleton";
import { fetchServices } from "../api/servicesApi";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices()
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-50">
      {loading ? (
        <>
          <HeroSearchSkeleton />
          <ServicesGridSkeleton count={services.length || 6} />
          <OffersSkeleton count={services.length || 6} />
        </>
      ) : (
        <>
          <HeroSearch />
          <ServicesGrid />
          <OffersSection />
        </>
      )}
    </div>
  );
}
