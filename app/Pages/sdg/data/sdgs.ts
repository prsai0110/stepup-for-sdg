export type SDG = {
  id: number;
  title: string;
  color: `#${string}`;
  summary: string;
  focusAreas: string[];
};

export const sdgs: ReadonlyArray<SDG> = [
  {
    id: 1,
    title: "No Poverty",
    color: "#E5243B",
    summary: "End poverty in all its forms by expanding opportunity, resilience, and basic security.",
    focusAreas: ["Income security", "Social protection", "Inclusive access to services"],
  },
  {
    id: 2,
    title: "Zero Hunger",
    color: "#DDA63A",
    summary: "Build food systems that nourish every community while protecting land, water, and livelihoods.",
    focusAreas: ["Food access", "Sustainable agriculture", "Nutrition outcomes"],
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    color: "#4C9F38",
    summary: "Support healthy lives at every age through care, prevention, and community well-being.",
    focusAreas: ["Primary care", "Disease prevention", "Mental wellness"],
  },
  {
    id: 4,
    title: "Quality Education",
    color: "#C5192D",
    summary: "Ensure inclusive, equitable learning that prepares people to participate, lead, and thrive.",
    focusAreas: ["Inclusive classrooms", "Digital learning", "Lifelong education"],
  },
  {
    id: 5,
    title: "Gender Equality",
    color: "#FF3A21",
    summary: "Advance equal rights, representation, safety, and opportunity for all genders.",
    focusAreas: ["Equal participation", "Safety and dignity", "Leadership access"],
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    color: "#26BDE2",
    summary: "Protect safe water, sanitation, and hygiene as foundations for public health and dignity.",
    focusAreas: ["Safe drinking water", "Sanitation systems", "Watershed protection"],
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    color: "#FCC30B",
    summary: "Expand access to reliable energy while accelerating the shift to cleaner power systems.",
    focusAreas: ["Energy access", "Renewable generation", "Efficiency upgrades"],
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    color: "#A21942",
    summary: "Grow economies that create dignified work, fair wages, and long-term opportunity.",
    focusAreas: ["Job creation", "Fair labor", "Local enterprise"],
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    summary: "Strengthen resilient infrastructure and innovation that unlock inclusive development.",
    focusAreas: ["Public infrastructure", "Research and innovation", "Digital connectivity"],
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    color: "#DD1367",
    summary: "Reduce social, economic, and political inequalities within and across communities.",
    focusAreas: ["Social mobility", "Inclusive policy", "Accessible opportunity"],
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    color: "#FD9D24",
    summary: "Design cities that are safe, inclusive, resilient, and connected to people’s daily needs.",
    focusAreas: ["Transit and mobility", "Safe housing", "Urban resilience"],
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    color: "#BF8B2E",
    summary: "Use materials, energy, and natural resources more responsibly across every lifecycle.",
    focusAreas: ["Circular design", "Waste reduction", "Responsible sourcing"],
  },
  {
    id: 13,
    title: "Climate Action",
    color: "#3F7E44",
    summary: "Take urgent action on climate mitigation, adaptation, and shared environmental stewardship.",
    focusAreas: ["Emissions reduction", "Climate adaptation", "Community resilience"],
  },
  {
    id: 14,
    title: "Life Below Water",
    color: "#0A97D9",
    summary: "Conserve oceans, coasts, and marine ecosystems that sustain life and livelihoods.",
    focusAreas: ["Ocean conservation", "Marine biodiversity", "Pollution reduction"],
  },
  {
    id: 15,
    title: "Life on Land",
    color: "#56C02B",
    summary: "Protect forests, soils, biodiversity, and ecosystems that keep the planet in balance.",
    focusAreas: ["Habitat restoration", "Biodiversity protection", "Land stewardship"],
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    summary: "Promote peaceful societies, accountable institutions, and access to justice for everyone.",
    focusAreas: ["Civic trust", "Justice access", "Transparent institutions"],
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    color: "#19486A",
    summary: "Strengthen collaboration across sectors so global goals can move from ambition to action.",
    focusAreas: ["Cross-sector collaboration", "Shared knowledge", "Sustainable financing"],
  },
] as const;

const sdgMap = new Map(sdgs.map((sdg) => [sdg.id, sdg]));

export function getSdgById(id: number) {
  return sdgMap.get(id);
}

export function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((part) => `${part}${part}`).join("") : value;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
