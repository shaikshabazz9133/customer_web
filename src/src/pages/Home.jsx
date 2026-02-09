import { motion } from "framer-motion";
import Testimonials from "../components/home/Testimonials";
import HeroBarrets from "../components/home/HeroBarrets";
import WhySection from "../components/home/WhySection";
import ServicesCards from "../components/home/ServicesCards";

export default function Home() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <HeroBarrets />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.06 }}
      >
        <WhySection />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        <ServicesCards />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.18 }}
      >
        <Testimonials />
      </motion.section>
    </>
  );
}
