export const SERVICES = [
  {
    id: "cleaning",
    title: "Deep Cleaning",
    desc: "Professional home & office cleaning",
    category: "cleaning",
    price: "₹999",
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca3350?w=1200&h=800&fit=crop",
    inclusions: [
      "Full dusting & mopping",
      "Kitchen deep clean",
      "Bathroom sanitization",
      "Window cleaning (interior)",
    ],
    terms: [
      "Customers must provide access to water and electricity.",
      "Additional charges may apply for heavy stains.",
      "Cancellations within 24h may be charged.",
    ],
  },
  {
    id: "ac-repair",
    title: "AC Repair",
    desc: "Fast, reliable AC maintenance & repairs",
    category: "ac-repair",
    price: "₹599",
    img: "https://images.unsplash.com/photo-1582719478250-8fca7a9d0f6a?w=1200&h=800&fit=crop",
    inclusions: [
      "Basic diagnostics",
      "Filter cleaning or replacement guidance",
      "Minor part replacements (if available)",
    ],
    terms: [
      "Parts are charged separately.",
      "Technician availability subject to location.",
      "Warranty on repair work for 7 days.",
    ],
  },
  {
    id: "plumbing",
    title: "Plumbing",
    desc: "Leak fixes, installs, and emergency repairs",
    category: "plumbing",
    price: "₹499",
    img: "https://images.unsplash.com/photo-1605902711622-cfb43c44367e?w=1200&h=800&fit=crop",
    inclusions: [
      "Leak diagnosis & repair",
      "Fixture tightening & minor replacements",
      "Pipe unclogging",
    ],
    terms: [
      "Major replacements extra.",
      "Access to water required.",
      "Emergency callout charges may apply.",
    ],
  },
  {
    id: "electrical",
    title: "Electrical",
    desc: "Safe electrical repairs and wiring",
    category: "electrical",
    price: "₹699",
    img: "https://images.unsplash.com/photo-1581093588401-1f1b9e6b0b3b?w=1200&h=800&fit=crop",
    inclusions: [
      "Fault finding",
      "Minor rewiring",
      "Socket & switch replacements",
    ],
    terms: [
      "High-voltage work may require additional safety checks.",
      "Parts charged separately.",
      "Technicians carry ID and safety kits.",
    ],
  },
  {
    id: "pest",
    title: "Pest Control",
    desc: "Safe pest treatments for homes and offices",
    category: "pest",
    price: "₹799",
    img: "https://images.unsplash.com/photo-1582719478250-8fca7a9d0f6a?w=1200&h=800&fit=crop",
    inclusions: ["Inspection", "Targeted treatment", "Follow-up guidance"],
    terms: [
      "Pets should be kept away during treatment.",
      "Multiple visits may be required.",
      "Certain pests may need specialised plans.",
    ],
  },
  {
    id: "painting",
    title: "Home Painting",
    desc: "Interior & exterior painting services",
    category: "painting",
    price: "₹1999",
    img: "https://images.unsplash.com/photo-1543900694-133f37abaaa5?w=1200&h=800&fit=crop",
    inclusions: [
      "Surface prep",
      "Two coats of premium paint",
      "Minor surface repairs",
    ],
    terms: [
      "Large areas quoted separately.",
      "Lead time depends on paint availability.",
      "Color changes after work may incur charges.",
    ],
  },
];

export const SERVICE_MAP = SERVICES.reduce((m, s) => {
  m[s.id] = s;
  return m;
}, {});
