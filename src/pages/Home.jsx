import { motion } from "framer-motion";
import Testimonials from "../components/home/Testimonials";
import HeroBarrets from "../components/home/HeroBarrets";
import WhySection from "../components/home/WhySection";
import ServicesCards from "../components/home/ServicesCards";
import HeroSearch from "../components/home/HeroSearch";
import ServicesGrid from "../components/home/ServicesGrid";
import OffersSection from "../components/home/OffersSection";
import { useEffect, useState } from "react";
import HeroSearchSkeleton from "../components/skeletons/HeroSearchSkeleton";
import ServicesGridSkeleton from "../components/skeletons/ServicesGridSkeleton";
import OffersSkeleton from "../components/skeletons/OffersSkeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  // return (
  //   <>
  //     <motion.section
  //       initial={{ opacity: 0, y: 8 }}
  //       whileInView={{ opacity: 1, y: 0 }}
  //       viewport={{ once: true }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       <HeroBarrets />
  //     </motion.section>

  //     <motion.section
  //       initial={{ opacity: 0, y: 12 }}
  //       whileInView={{ opacity: 1, y: 0 }}
  //       viewport={{ once: true }}
  //       transition={{ duration: 0.5, delay: 0.06 }}
  //     >
  //       <WhySection />
  //     </motion.section>

  //     <motion.section
  //       initial={{ opacity: 0, y: 14 }}
  //       whileInView={{ opacity: 1, y: 0 }}
  //       viewport={{ once: true }}
  //       transition={{ duration: 0.5, delay: 0.12 }}
  //     >
  //       <ServicesCards />
  //     </motion.section>

  //     <motion.section
  //       initial={{ opacity: 0, y: 16 }}
  //       whileInView={{ opacity: 1, y: 0 }}
  //       viewport={{ once: true }}
  //       transition={{ duration: 0.5, delay: 0.18 }}
  //     >
  //       <Testimonials />
  //     </motion.section>
  //   </>
  // );

  return (
    <div className="bg-slate-50">
      {loading ? (
        <>
          <HeroSearchSkeleton />
          <ServicesGridSkeleton count={6} />
          <OffersSkeleton count={2} />
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
