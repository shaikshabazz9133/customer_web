import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "cleaning",
    title: "Home Deep Cleaning",
    desc: "2BHK • 3BHK • Villa",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=260&fit=crop",
  },
  {
    id: "sofa",
    title: "Sofa & Carpet",
    desc: "Shampoo • Vacuum • Stain removal",
    img: "https://images.unsplash.com/photo-1581579186983-91dfaabd6c3b?w=400&h=260&fit=crop",
  },
  {
    id: "ac",
    title: "AC Service & Repair",
    desc: "Split • Window • Cassette",
    img: "https://images.unsplash.com/photo-1600086591891-4c3c9c4c0350?w=400&h=260&fit=crop",
  },
  {
    id: "plumbing",
    title: "Plumbing & Leak Fix",
    desc: "Taps • Pipes • Blockage",
    img: "https://images.unsplash.com/photo-1581578731548-189d1e287ca1?w=400&h=260&fit=crop",
  },
  {
    id: "electrical",
    title: "Electrical Work",
    desc: "Fans • Lights • Wiring",
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=260&fit=crop",
  },
];

export default function ServicesMarquee() {
  const trackRef = useRef(null);

  // simple auto-scroll effect
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrame;
    let offset = 0;

    const step = () => {
      offset -= 0.5; // speed
      track.style.transform = `translateX(${offset}px)`;
      if (Math.abs(offset) > track.scrollWidth / 2) {
        offset = 0;
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // duplicate list for seamless loop
  const items = [...SERVICES, ...SERVICES];

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">
            Popular services near you
          </h2>
          <p className="text-xs text-slate-500">
            Auto scrolling • Hover to pause
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 will-change-transform"
            onMouseEnter={() => {
              if (trackRef.current)
                trackRef.current.style.animationPlayState = "paused";
            }}
            onMouseLeave={() => {
              if (trackRef.current)
                trackRef.current.style.animationPlayState = "running";
            }}
          >
            {items.map((service, index) => (
              <motion.div
                key={`${service.id}-${index}`}
                className="min-w-[220px] max-w-xs bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-800">
                    {service.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
