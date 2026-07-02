// Seed data for the Partners page experience.
// Content mirrors the approved design screenshots. Swap with a CMS/API later.

export type PartnerType = "School" | "NGO" | "Company" | "University";
export type Tier = "Gold" | "Silver" | null;

export interface PartnerOrg {
  id: string;
  name: string;
  location: string;
  type: PartnerType;
  verified: boolean;
  tier: Tier;
  since: number;
  sdgs: number[];
  funding: string | null; // e.g. "Rs50L"
  activity: string; // recent activity line
  image: string; // header image
  description: string;
}

export const DIRECTORY: PartnerOrg[] = [
  {
    id: "delhi-public-school",
    name: "Delhi Public School",
    location: "New Delhi",
    type: "School",
    verified: true,
    tier: null,
    since: 2023,
    sdgs: [4, 13],
    funding: null,
    activity: "Hosted an SDG workshop · 2 weeks ago",
    image: "/assets/stories/classroom-transformation-after.jpeg",
    description:
      "A flagship partner school running student-led SDG clubs and climate-action drives across grades.",
  },
  {
    id: "greenearth-initiative",
    name: "GreenEarth Initiative",
    location: "Hyderabad",
    type: "NGO",
    verified: true,
    tier: null,
    since: 2024,
    sdgs: [13, 15],
    funding: null,
    activity: "Published impact report · 5 days ago",
    image: "/assets/stories/school-infrastructure-after.jpeg",
    description:
      "Grassroots environmental NGO restoring green cover and embedding sustainability into classrooms.",
  },
  {
    id: "techcorp-india",
    name: "TechCorp India",
    location: "Bangalore",
    type: "Company",
    verified: true,
    tier: "Gold",
    since: 2023,
    sdgs: [4, 9],
    funding: "Rs50L",
    activity: "Funded the AI Bootcamp cohort · 3 days ago",
    image: "/assets/stories/student-learning-after.jpeg",
    description:
      "CSR leader channelling funding and mentorship into digital-skills programs for underserved students.",
  },
  {
    id: "iit-hyderabad",
    name: "IIT Hyderabad",
    location: "Hyderabad",
    type: "University",
    verified: true,
    tier: null,
    since: 2023,
    sdgs: [4, 9, 17],
    funding: null,
    activity: "Volunteer cohort onboarded · 1 week ago",
    image: "/assets/stories/teacher-training-after.jpeg",
    description:
      "Research partner contributing innovation labs, student volunteers and program evaluation expertise.",
  },
  {
    id: "bright-futures-academy",
    name: "Bright Futures Academy",
    location: "Mumbai",
    type: "School",
    verified: true,
    tier: null,
    since: 2024,
    sdgs: [4, 10],
    funding: null,
    activity: "Completed term · 1 workshops · 4 days ago",
    image: "/assets/stories/library-revival-after.jpeg",
    description:
      "Inclusive school widening access to quality learning for first-generation learners.",
  },
  {
    id: "ecovolt-energy",
    name: "EcoVolt Energy",
    location: "Chennai",
    type: "Company",
    verified: true,
    tier: "Silver",
    since: 2024,
    sdgs: [7, 13],
    funding: "Rs20L",
    activity: "New funding round confirmed · 6 days ago",
    image: "/assets/stories/midday-meal-after.jpeg",
    description:
      "Clean-energy company funding green campuses and renewable-energy literacy programs.",
  },
  {
    id: "hope-ngo",
    name: "Hope NGO",
    location: "Delhi",
    type: "NGO",
    verified: true,
    tier: null,
    since: 2024,
    sdgs: [1, 10],
    funding: null,
    activity: "Beneficiary survey completed · 2 weeks ago",
    image: "/assets/stories/classroom-transformation-before.jpeg",
    description:
      "Community NGO delivering on-the-ground execution and family outreach in low-income neighbourhoods.",
  },
  {
    id: "woxsen-university",
    name: "Woxsen University",
    location: "Hyderabad",
    type: "University",
    verified: true,
    tier: null,
    since: 2025,
    sdgs: [4, 17],
    funding: null,
    activity: "Joined the ecosystem · 3 weeks ago",
    image: "/assets/stories/student-learning-before.jpeg",
    description:
      "Newly onboarded university bringing design thinking and entrepreneurship into SDG projects.",
  },
  {
    id: "infrabuild-corp",
    name: "InfraBuild Corp",
    location: "Mumbai",
    type: "Company",
    verified: true,
    tier: "Silver",
    since: 2024,
    sdgs: [9, 11],
    funding: "Rs30L",
    activity: "Workshop showcase held · 1 week ago",
    image: "/assets/stories/school-infrastructure-before.jpeg",
    description:
      "Infrastructure firm rebuilding safe, sustainable school facilities in growing urban districts.",
  },
];

export const FILTERS = ["All", "Schools", "NGOs", "Companies", "Universities"] as const;
export type FilterKey = (typeof FILTERS)[number];

export const FILTER_TO_TYPE: Record<Exclude<FilterKey, "All">, PartnerType> = {
  Schools: "School",
  NGOs: "NGO",
  Companies: "Company",
  Universities: "University",
};

// Hero metric cards that orbit the logo
export interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  sub: string;
}

export const HERO_METRICS: Metric[] = [
  { label: "Schools Connected", value: 142, suffix: "+", sub: "Across India" },
  { label: "CSR Funding", value: 1, suffix: "Cr+", prefix: "Rs", sub: "Enabled this year" },
  { label: "NGOs", value: 90, suffix: "+", sub: "On the ground" },
  { label: "SDG Projects", value: 186, suffix: "+", sub: "Currently active" },
  { label: "Universities", value: 28, suffix: "+", sub: "Research partners" },
];

// Live impact counters
export const LIVE_STATS: Metric[] = [
  { label: "Projects", value: 186, suffix: "+", sub: "Currently active" },
  { label: "Schools", value: 142, suffix: "+", sub: "Across India" },
  { label: "NGOs", value: 90, suffix: "+", sub: "Partnered" },
  { label: "Students", value: 12000, suffix: "+", sub: "Reached" },
  { label: "CSR Funds", value: 1, suffix: "Cr+", prefix: "Rs", sub: "Mobilised" },
];

// Ecosystem nodes
export interface EcoNode {
  key: string;
  label: string;
  blurb: string;
  icon: "school" | "ngo" | "hub" | "company" | "university";
  color: string; // glow color
}

export const ECOSYSTEM: EcoNode[] = [
  { key: "schools", label: "Schools", blurb: "SDG education & awareness", icon: "school", color: "#00B050" },
  { key: "ngos", label: "NGOs", blurb: "Ground execution & community impact", icon: "ngo", color: "#00C2FF" },
  { key: "stepup", label: "StepUp SDG", blurb: "Coordination & impact tracking", icon: "hub", color: "#155DFC" },
  { key: "companies", label: "Companies", blurb: "Funding & resources", icon: "company", color: "#FF6B6B" },
  { key: "universities", label: "Universities", blurb: "Research, innovation & volunteers", icon: "university", color: "#F5A623" },
];

// Why partner
export interface BenefitCard {
  key: string;
  title: string;
  icon: "company" | "school" | "ngo";
  gradient: string;
  benefits: string[];
}

export const WHY_PARTNER: BenefitCard[] = [
  {
    key: "companies",
    title: "For Companies",
    icon: "company",
    gradient: "linear-gradient(135deg,#FF6B6B22,#155DFC22)",
    benefits: [
      "Verified impact reports for your board",
      "Direct line to 12,000+ students",
      "Brand visibility across 6 states",
    ],
  },
  {
    key: "schools",
    title: "For Schools / Universities",
    icon: "school",
    gradient: "linear-gradient(135deg,#00B05022,#00C2FF22)",
    benefits: [
      "Ready SDG curriculum and materials",
      "Funded workshops at zero cost",
      "Student leadership opportunities",
    ],
  },
  {
    key: "ngos",
    title: "For NGOs",
    icon: "ngo",
    gradient: "linear-gradient(135deg,#00C2FF22,#155DFC22)",
    benefits: [
      "Co-design programs with companies",
      "Reach across 8 partner cities",
      "Joint grant opportunities",
    ],
  },
];

export interface PartnershipModel {
  title: string;
  body: string;
  icon: "sponsorship" | "cohosted" | "awareness";
}

export const PARTNERSHIP_MODELS: PartnershipModel[] = [
  { title: "Sponsorship", body: "Fund SDG workshops and events. Full spend audit provided.", icon: "sponsorship" },
  { title: "Co-hosted Programs", body: "Run joint programs designed around your sector and SDG goals.", icon: "cohosted" },
  { title: "Awareness Campaigns", body: "Create student-led campaigns inside your partner schools.", icon: "awareness" },
];

// Journey timeline
export interface JourneyStep {
  title: string;
  body: string;
}

export const JOURNEY: JourneyStep[] = [
  { title: "Discover", body: "Explore the ecosystem and find aligned partners and SDG goals." },
  { title: "Connect", body: "Get matched and introduced to schools, NGOs, companies or universities." },
  { title: "Collaborate", body: "Co-design a transparent, measurable program around your strengths." },
  { title: "Launch", body: "Roll out workshops, funding or volunteering on the ground." },
  { title: "Measure Impact", body: "Track outcomes live and receive verified board-ready reports." },
];

// Trusted logos (existing assets)
export const LOGOS: { name: string; src: string }[] = [
  { name: "Wipro", src: "/assets/partners/wipro.png" },
  { name: "Accenture", src: "/assets/partners/accenture.png" },
  { name: "HCLTech", src: "/assets/partners/hcl.png" },
  { name: "World Bank", src: "/assets/partners/worldbank.png" },
  { name: "Tech Mahindra", src: "/assets/partners/techmahindra.png" },
  { name: "Save the Children", src: "/assets/partners/savethechildren.png" },
  { name: "Tata", src: "/assets/partners/tata.png" },
  { name: "Reliance Foundation", src: "/assets/partners/reliance.png" },
  { name: "UNICEF", src: "/assets/partners/unicef.png" },
  { name: "UNESCO", src: "/assets/partners/unesco.png" },
  { name: "Microsoft", src: "/assets/partners/microsoft.png" },
  { name: "Google", src: "/assets/partners/google.png" },
  { name: "Infosys", src: "/assets/partners/infosys.png" },
];
