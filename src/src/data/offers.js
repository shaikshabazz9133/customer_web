export const OFFERS = [
  {
    id: "SPRING10",
    code: "SPRING10",
    title: "Spring Sale — 10% off",
    desc: "10% off on cleaning and painting services.",
    discountPercent: 10,
    appliesTo: ["cleaning", "painting"],
    validUntil: "2026-03-31",
    terms: [
      "Not combinable with other offers",
      "Applies to selected services only",
    ],
  },
  {
    id: "FIX50",
    code: "FIX50",
    title: "Quick Fix ₹50 off",
    desc: "Flat ₹50 off on plumbing and electrical services.",
    discountAmount: 50,
    appliesTo: ["plumbing", "electrical"],
    validUntil: "2026-12-31",
    terms: ["Minimum order value ₹299", "Single use per booking"],
  },
];
