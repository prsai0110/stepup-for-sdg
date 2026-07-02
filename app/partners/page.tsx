"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from "framer-motion";

/* ─── GLOBAL STYLES ───────────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%) skewX(-12deg); }
  }
  @keyframes mesh-move {
    0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
    33%       { opacity: 0.6; transform: scale(1.05) translate(-20px, 10px); }
    66%       { opacity: 0.5; transform: scale(0.98) translate(15px, -8px); }
  }
  @keyframes shimmer-bg {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes border-glow {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }
  @keyframes card-bg-shift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }
  @keyframes top-line-sweep {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .hero-card-border { animation: border-glow 3s ease-in-out infinite; }
  .hero-top-line    { background-size: 200% 100%; animation: top-line-sweep 3s linear infinite; }
  @keyframes particle-float {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
    33%       { transform: translateY(-20px) translateX(8px); opacity: 0.8; }
    66%       { transform: translateY(-10px) translateX(-6px); opacity: 0.5; }
  }
  @keyframes aurora-1 {
    0%,100% { transform: translate(0%,0%) scale(1);   opacity:0.55; }
    33%      { transform: translate(8%,-12%) scale(1.15); opacity:0.75; }
    66%      { transform: translate(-6%,8%) scale(0.92); opacity:0.5; }
  }
  @keyframes aurora-2 {
    0%,100% { transform: translate(0%,0%) scale(1);    opacity:0.45; }
    33%      { transform: translate(-10%,10%) scale(1.2); opacity:0.65; }
    66%      { transform: translate(12%,-6%) scale(0.9); opacity:0.4; }
  }
  @keyframes aurora-3 {
    0%,100% { transform: translate(0%,0%) scale(1);   opacity:0.35; }
    50%      { transform: translate(6%,14%) scale(1.1);  opacity:0.55; }
  }
  @keyframes grid-pulse {
    0%,100% { opacity:0.035; }
    50%      { opacity:0.07;  }
  }
  @keyframes orb-drift {
    0%,100% { transform:translate(0px,0px) scale(1);   }
    25%      { transform:translate(30px,-20px) scale(1.05); }
    50%      { transform:translate(-20px,30px) scale(0.96); }
    75%      { transform:translate(20px,10px) scale(1.03);  }
  }
  @keyframes scan-line {
    0%   { transform:translateY(-100%); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:1; }
    100% { transform:translateY(100vh); opacity:0; }
  }
  @keyframes slow-zoom {
    0%   { transform: scale(1.0) translate(0px,0px); }
    50%  { transform: scale(1.12) translate(-18px,-10px); }
    100% { transform: scale(1.0) translate(0px,0px); }
  }
  .particle   { animation: particle-float var(--dur, 6s) ease-in-out infinite; }
  .aurora-1   { animation: aurora-1 18s ease-in-out infinite; }
  .aurora-2   { animation: aurora-2 24s ease-in-out infinite 3s; }
  .aurora-3   { animation: aurora-3 20s ease-in-out infinite 6s; }
  .grid-pulse { animation: grid-pulse 6s ease-in-out infinite; }
  .orb-drift  { animation: orb-drift 22s ease-in-out infinite; }
  .scan-line  { animation: scan-line 12s linear infinite; }
  .slow-zoom  { animation: slow-zoom 20s ease-in-out infinite; }

  .mq-track        { display:flex; width:max-content; animation:marquee 32s linear infinite; }
  .mq-track-slow   { display:flex; width:max-content; animation:marquee 50s linear infinite; }
  .mq-track:hover, .mq-track-slow:hover { animation-play-state:paused; }

  .logo-pill {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    cursor: default;
  }
  .logo-pill:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); opacity: 1 !important; }

  .shine-sweep::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
    transform: translateX(-100%) skewX(-12deg); pointer-events: none; border-radius: inherit;
  }
  .shine-sweep:hover::after { animation: shimmer 0.7s ease forwards; }

  .mesh-blob   { animation: mesh-move 12s ease-in-out infinite; }
  .mesh-blob-2 { animation: mesh-move 16s ease-in-out infinite reverse; }
  .mesh-blob-3 { animation: mesh-move 20s ease-in-out infinite 4s; }

  .segmented-tab { position: relative; transition: color 0.2s ease; }
  .glass-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
  .glass-input:focus { outline: none; }

  .theme-transition * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

  .logo-shimmer {
    background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
    background-size: 200% 100%;
    animation: shimmer-bg 1.4s ease infinite;
  }
`;

/* ─── THEMES ──────────────────────────────────────────────────────────────── */
const DARK = {
  pageBg:"#060a10", sectionAlt:"#070c14", card:"#0d1625", cardHover:"#101c2e", footer:"#040810",
  border:"#1a2537", borderSubtle:"#111b28", text:"#f0f4f8", textSub:"#c8d4e0",
  muted:"#6b8099", dim:"#3d5166",
  accent:"#0ea5c9", accentGlow:"rgba(14,165,201,0.2)", accentRed:"#ef4444", inputBg:"#080f1a",
  glass:"rgba(13,22,37,0.82)", glassBorder:"rgba(14,165,201,0.2)",
  glow:"rgba(14,165,201,0.15)", overlay:"rgba(4,8,16,0.88)",
  gridLine:"rgba(255,255,255,0.03)",
  meshA:"rgba(14,165,201,0.12)", meshB:"rgba(99,102,241,0.08)", meshC:"rgba(16,185,129,0.06)",
};
const LIGHT = {
  pageBg:"#fafbfd", sectionAlt:"#f3f6fa", card:"#ffffff", cardHover:"#fafcff", footer:"#111827",
  border:"#e1e8f0", borderSubtle:"#edf2f7", text:"#0d1829", textSub:"#374151",
  muted:"#6b7280", dim:"#9ca3af",
  accent:"#0284c7", accentGlow:"rgba(2,132,199,0.15)", accentRed:"#dc2626", inputBg:"#f8fafc",
  glass:"rgba(255,255,255,0.92)", glassBorder:"rgba(2,132,199,0.2)",
  glow:"rgba(2,132,199,0.08)", overlay:"rgba(0,0,0,0.75)",
  gridLine:"rgba(0,0,0,0.025)",
  meshA:"rgba(2,132,199,0.06)", meshB:"rgba(99,102,241,0.04)", meshC:"rgba(16,185,129,0.03)",
};
type T = typeof DARK;

/* ─── TYPES ───────────────────────────────────────────────────────────────── */
type PartnerType = "School" | "NGO" | "Company" | "University";
type Tier = "Gold" | "Silver";
interface Partner {
  id: number; name: string; type: PartnerType; city: string;
  initials: string; sdgs: number[]; since: string; story: string;
  lastActivity: string; funds?: string; fundsLakh?: number; tier?: Tier;
  logoSources: string[]; domain?: string;
}

/* ─── TYPE CONFIGS ────────────────────────────────────────────────────────── */
const typeConfig: Record<PartnerType, {
  color: string; bg: string; border: string; badgeBg: string; badgeText: string; gradient: string;
  IconEl: (p: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;
}> = {
  School: {
    color:"#34d399", bg:"rgba(16,185,129,0.08)", border:"rgba(52,211,153,0.25)",
    badgeBg:"rgba(16,185,129,0.12)", badgeText:"#34d399",
    gradient:"linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>),
  },
  NGO: {
    color:"#38bdf8", bg:"rgba(56,189,248,0.08)", border:"rgba(56,189,248,0.25)",
    badgeBg:"rgba(56,189,248,0.12)", badgeText:"#38bdf8",
    gradient:"linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(99,102,241,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>),
  },
  Company: {
    color:"#f87171", bg:"rgba(248,113,113,0.08)", border:"rgba(248,113,113,0.25)",
    badgeBg:"rgba(248,113,113,0.12)", badgeText:"#f87171",
    gradient:"linear-gradient(135deg, rgba(248,113,113,0.1) 0%, rgba(251,146,60,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
      </svg>),
  },
  University: {
    color:"#fbbf24", bg:"rgba(251,191,36,0.08)", border:"rgba(251,191,36,0.25)",
    badgeBg:"rgba(251,191,36,0.12)", badgeText:"#fbbf24",
    gradient:"linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(249,115,22,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
      </svg>),
  },
};

const tierConfig: Record<Tier, { label: string; color: string; bg: string }> = {
  Gold:   { label:"Gold",   color:"#f59e0b", bg:"rgba(245,158,11,0.1)"  },
  Silver: { label:"Silver", color:"#94a3b8", bg:"rgba(148,163,184,0.1)" },
};

const tabs = ["All","Schools","NGOs","Companies","Universities"] as const;
type Tab = (typeof tabs)[number];
const TAB_TO_TYPE: Record<Tab, PartnerType | null> = {
  All:null, Schools:"School", NGOs:"NGO", Companies:"Company", Universities:"University",
};

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const partners: Partner[] = [
  { id:1, name:"Delhi Public School", type:"School", city:"New Delhi", initials:"DPS", sdgs:[4,13], since:"2023",
    story:"Students launched their own sustainability council after their first SDG workshop.",
    lastActivity:"Hosted an SDG workshop · 2 weeks ago", domain:"dpsrkp.net",
    logoSources:["https://dpsrkp.net/wp-content/uploads/2019/06/logo-png-152x195.png","https://upload.wikimedia.org/wikipedia/en/3/3c/Delhi_Public_School_logo.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dpsrkp.net&size=128`]},
  { id:2, name:"GreenEarth Initiative", type:"NGO", city:"Hyderabad", initials:"GE", sdgs:[13,15], since:"2024",
    story:"Co-designed a tree-cover restoration curriculum now used across 6 partner schools.",
    lastActivity:"Published impact report · 5 days ago", domain:"greenearth.org",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Green_Earth_logo.svg/240px-Green_Earth_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://greenearth.org&size=128`]},
  { id:3, name:"TechCorp India", type:"Company", city:"Bangalore", initials:"TC", sdgs:[4,9], since:"2023",
    story:"A Rs50L CSR commitment turned into 3 audited programs reaching 620 students.",
    lastActivity:"Funded the AI Bootcamp cohort · 3 days ago", funds:"Rs50L", fundsLakh:50, tier:"Gold", domain:"techcorp.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Tata_Consultancy_Services_Logo.svg/240px-Tata_Consultancy_Services_Logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://tcs.com&size=128`]},
  { id:4, name:"IIT Hyderabad", type:"University", city:"Hyderabad", initials:"IIT", sdgs:[4,9,17], since:"2023",
    story:"420 student volunteers now run peer-led SDG workshops in government schools.",
    lastActivity:"Volunteer cohort onboarded · 1 week ago", domain:"iith.ac.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Indian_Institute_of_Technology_Hyderabad_Logo.svg/240px-Indian_Institute_of_Technology_Hyderabad_Logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://iith.ac.in&size=128`]},
  { id:5, name:"Bright Futures Academy", type:"School", city:"Mumbai", initials:"BF", sdgs:[4,10], since:"2024",
    story:"First cohort of 95% satisfaction-rated SDG electives — expanding to more grade levels.",
    lastActivity:"Completed term-1 workshops · 4 days ago", domain:"brightfuturesacademy.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kendriya_Vidyalaya_logo.svg/240px-Kendriya_Vidyalaya_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://brightfuturesacademy.in&size=128`]},
  { id:6, name:"EcoVolt Energy", type:"Company", city:"Chennai", initials:"EV", sdgs:[7,13], since:"2024",
    story:"Brought hands-on renewable-energy labs to schools.",
    lastActivity:"New funding round confirmed · 6 days ago", funds:"Rs20L", fundsLakh:20, tier:"Silver", domain:"ecovolt.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tata_Power_Logo.svg/240px-Tata_Power_Logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ecovolt.in&size=128`]},
  { id:7, name:"Hope NGO", type:"NGO", city:"Delhi", initials:"HN", sdgs:[1,10], since:"2024",
    story:"Connected 840 beneficiaries across 4 cities with partner companies.",
    lastActivity:"Beneficiary survey completed · 2 weeks ago", domain:"hopengo.org",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CRY_logo.svg/240px-CRY_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://hopengo.org&size=128`]},
  { id:8, name:"Woxsen University", type:"University", city:"Hyderabad", initials:"WU", sdgs:[4,17], since:"2025",
    story:"Newest university partner — piloting a joint research project with GreenEarth.",
    lastActivity:"Joined the ecosystem · 3 weeks ago", domain:"woxsen.edu.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Woxsen.png/240px-Woxsen.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://woxsen.edu.in&size=128`]},
  { id:9, name:"InfraBuild Corp", type:"Company", city:"Mumbai", initials:"IB", sdgs:[9,11], since:"2024",
    story:"Funding urban-planning workshops letting students redesign real city blocks.",
    lastActivity:"Workshop showcase held · 1 week ago", funds:"Rs30L", fundsLakh:30, tier:"Silver", domain:"l-and-t.com",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Larsen_%26_Toubro_logo.svg/240px-Larsen_%26_Toubro_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://larsentoubro.com&size=128`]},
];

const ECOSYSTEM_LOGOS = [
  { name:"Microsoft",     domain:"microsoft.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name:"Google",        domain:"google.com",       wiki:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name:"Amazon",        domain:"amazon.com",       wiki:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name:"IBM",           domain:"ibm.com",          wiki:"https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name:"Infosys",       domain:"infosys.com",      wiki:"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name:"TCS",           domain:"tcs.com",          wiki:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Tata_Consultancy_Services_Logo.svg" },
  { name:"Wipro",         domain:"wipro.com",        wiki:"https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name:"Accenture",     domain:"accenture.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name:"Deloitte",      domain:"deloitte.com",     wiki:"https://upload.wikimedia.org/wikipedia/commons/1/15/Deloitte_Logo.png" },
  { name:"NVIDIA",        domain:"nvidia.com",       wiki:"https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg" },
  { name:"Adobe",         domain:"adobe.com",        wiki:"https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" },
  { name:"Cognizant",     domain:"cognizant.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/3/37/Cognizant_logo.svg" },
  { name:"HCL Tech",      domain:"hcltech.com",      wiki:"https://upload.wikimedia.org/wikipedia/commons/f/f5/HCL_Technologies_logo.svg" },
  { name:"Tech Mahindra", domain:"techmahindra.com", wiki:"https://upload.wikimedia.org/wikipedia/commons/8/8e/Tech_Mahindra_New_Logo.svg" },
  { name:"Capgemini",     domain:"capgemini.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Capgemini_201x_logo.svg" },
];

const heroFloatingCards = [
  { label:"CSR Funding",       value:"Rs1Cr+", sub:"Enabled this year",  delay:0,    floatDur:3.2 },
  { label:"SDG Projects",      value:"186+",   sub:"Currently active",   delay:0.15, floatDur:4.0 },
  { label:"Schools Connected", value:"142+",   sub:"Across India",       delay:0.3,  floatDur:3.6 },
  { label:"Verified Partners", value:"260+",   sub:"Organizations",      delay:0.45, floatDur:3.8 },
];

const ecosystemRoles: { type: PartnerType | "Hub"; title: string; role: string }[] = [
  { type:"School",     title:"Schools",      role:"SDG education & awareness"           },
  { type:"NGO",        title:"NGOs",         role:"Ground execution & community impact" },
  { type:"Hub",        title:"StepUp SDG",   role:"Coordination & impact tracking"      },
  { type:"Company",    title:"Companies",    role:"Funding & resources"                 },
  { type:"University", title:"Universities", role:"Research, innovation & volunteers"   },
];

const partnershipModels = [
  { title:"Sponsorship",         desc:"Fund SDG workshops and events. Full spend audit provided."     },
  { title:"Co-hosted Programs",  desc:"Run joint programs designed around your sector and SDG goals." },
  { title:"Awareness Campaigns", desc:"Create student-led campaigns inside your partner schools."     },
];

const audienceCards: { title: string; type: PartnerType; benefits: string[]; href: string; btnLabel: string }[] = [
  { title:"For Companies",              type:"Company", href:"mailto:companies@stepupsdg.in", btnLabel:"Get started",    benefits:["Verified impact reports for your board","Direct line to 12,000+ students","Brand visibility across 6 states"] },
  { title:"For Schools / Universities", type:"School",  href:"mailto:schools@stepupsdg.in",   btnLabel:"Join as a school", benefits:["Ready SDG curriculum and materials","Funded workshops at zero cost","Student leadership opportunities"] },
  { title:"For NGOs",                   type:"NGO",     href:"mailto:ngos@stepupsdg.in",      btnLabel:"Partner with us",  benefits:["Co-design programs with companies","Reach across 8 partner cities","Joint grant opportunities"] },
];

const COMPANY_PROJECTS = [
  { name:"SDG Workshop — Hyderabad", amount:"Rs15L", status:"Completed" as const, verified:true  },
  { name:"AI Bootcamp for Schools",  amount:"Rs12L", status:"Ongoing"   as const, verified:false },
  { name:"Climate Action Camp",      amount:"Rs11L", status:"Completed" as const, verified:true  },
];

const METRICS_BY_TYPE: Record<PartnerType, [string,string][]> = {
  Company:    [["Rs50L","Total contributed"],["Rs38L","Funds utilized"],["Rs12L","Remaining"],["620","Students reached"],["12","Schools helped"],["8","Workshops done"]],
  School:     [["320","Students"],["8","Workshops"],["3","SDG Goals"],["2","Years active"],["4","Events held"],["95%","Satisfaction"]],
  NGO:        [["12","Projects"],["4","Cities"],["5","SDG Goals"],["840","Beneficiaries"],["3","Years active"],["6","Partners"]],
  University: [["420","Volunteers"],["6","Events"],["5","SDG Goals"],["200","Students active"],["4","Departments"],["2","Years active"]],
};

/* ─── ICONS ───────────────────────────────────────────────────────────────── */
const Icon = {
  Search:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  X:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Check:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polyline points="20 6 9 17 4 12"/></svg>),
  MapPin:({className="w-3 h-3"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Arrow:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  Globe:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Star:({className="w-2.5 h-2.5"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Shield:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>),
  Sun:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>),
  Moon:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>),
  Clock:({className="w-4 h-4",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>),
  Lock:({className="w-4 h-4",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>),
  BarChart:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
  Handshake:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>),
  Megaphone:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>),
};

/* ─── MULTI-SOURCE LOGO ───────────────────────────────────────────────────── */
function MultiSourceImg({ sources,alt,initials,color,gradient,border,className,style,isDark }:{
  sources:string[]; alt:string; initials:string; color:string; gradient:string; border:string;
  className?:string; style?:React.CSSProperties; isDark:boolean;
}) {
  const [idx,setIdx]=useState(0);
  const [loaded,setLoaded]=useState(false);
  const [allFailed,setAllFailed]=useState(false);
  const tryNext=()=>{ if(idx+1<sources.length){setIdx(i=>i+1);setLoaded(false);}else setAllFailed(true); };
  if(allFailed||sources.length===0) return (
    <div className={className} style={{...style,background:gradient,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${border}`}}>
      <span style={{color,fontWeight:900,fontSize:"clamp(14px,2.5vw,26px)",letterSpacing:"-0.03em"}}>{initials}</span>
    </div>
  );
  return (
    <div className={className} style={{...style,position:"relative",overflow:"hidden"}}>
      {!loaded&&<div className="logo-shimmer" style={{position:"absolute",inset:0,borderRadius:"inherit"}}/>}
      <img key={idx} src={sources[idx]} alt={alt} onLoad={()=>setLoaded(true)} onError={tryNext}
        style={{width:"100%",height:"100%",objectFit:"contain",padding:"12%",opacity:loaded?1:0,transition:"opacity 0.35s ease",filter:isDark?"brightness(0.9) saturate(0.85)":"none"}}/>
    </div>
  );
}

/* ─── ANIMATED COUNTER ────────────────────────────────────────────────────── */
function AnimatedCounter({value,theme}:{value:string;theme:T}) {
  const ref=useRef<HTMLDivElement>(null);
  const isInView=useInView(ref,{once:true,margin:"-50px"});
  const [display,setDisplay]=useState("0");
  useEffect(()=>{
    if(!isInView) return;
    const num=parseFloat(value.replace(/[^0-9.]/g,""));
    if(isNaN(num)){setDisplay(value);return;}
    const suffix=value.replace(/[0-9.]/g,"");
    const dur=1400; const start=performance.now();
    const update=(now:number)=>{
      const t=Math.min((now-start)/dur,1);
      const eased=1-Math.pow(1-t,3);
      const cur=eased*num;
      setDisplay(`${num<100?cur.toFixed(num%1!==0?1:0):Math.round(cur)}${suffix}`);
      if(t<1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },[isInView,value]);
  return <div ref={ref} style={{color:theme.text}}>{display}</div>;
}

/* ─── TILT CARD ───────────────────────────────────────────────────────────── */
function TiltCard({children,className,style,onClick}:{children:React.ReactNode;className?:string;style?:React.CSSProperties;onClick?:()=>void}) {
  const ref=useRef<HTMLDivElement>(null);
  const x=useMotionValue(0); const y=useMotionValue(0);
  const rotateX=useSpring(useTransform(y,[-0.5,0.5],[4,-4]),{stiffness:300,damping:30});
  const rotateY=useSpring(useTransform(x,[-0.5,0.5],[-4,4]),{stiffness:300,damping:30});
  const glowX=useTransform(x,[-0.5,0.5],[0,100]);
  const glowY=useTransform(y,[-0.5,0.5],[0,100]);
  const handleMouseMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    if(!ref.current) return;
    const rect=ref.current.getBoundingClientRect();
    x.set((e.clientX-rect.left)/rect.width-0.5);
    y.set((e.clientY-rect.top)/rect.height-0.5);
  },[x,y]);
  const handleMouseLeave=useCallback(()=>{x.set(0);y.set(0);},[x,y]);
  return (
    <motion.div ref={ref} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{rotateX,rotateY,transformStyle:"preserve-3d",perspective:1000,...style}} className={className}>
      <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{background:useTransform([glowX,glowY],([gx,gy])=>`radial-gradient(circle at ${gx}% ${gy}%, rgba(14,165,201,0.08) 0%, transparent 60%)`)}}/>
      {children}
    </motion.div>
  );
}

/* ─── PARTNER LOGO MARK ───────────────────────────────────────────────────── */
function PartnerLogoMark({partner,theme,isDark}:{partner:Partner;theme:T;isDark:boolean}) {
  const cfg=typeConfig[partner.type];
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden"
      style={{background:cfg.gradient,height:148,borderBottom:`1px solid ${theme.border}`}}>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:`linear-gradient(${theme.gridLine} 1px,transparent 1px),linear-gradient(90deg,${theme.gridLine} 1px,transparent 1px)`,backgroundSize:"24px 24px"}}/>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <MultiSourceImg sources={partner.logoSources} alt={partner.name} initials={partner.initials}
          color={cfg.color} gradient={cfg.gradient} border={cfg.border} isDark={isDark}
          style={{width:90,height:60,borderRadius:10}}/>
        <span className="rounded-full px-2 py-[2px] text-[9px] font-bold uppercase tracking-widest"
          style={{background:cfg.badgeBg,color:cfg.badgeText}}>{partner.type}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{background:`linear-gradient(90deg,transparent,${cfg.color}60,transparent)`}}/>
    </div>
  );
}

/* ─── SDG CHIP ────────────────────────────────────────────────────────────── */
function SDGChip({num,theme}:{num:number;theme:T}) {
  return (
    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold"
      style={{background:theme.borderSubtle,color:theme.muted,border:`1px solid ${theme.border}`}}>
      SDG {num}
    </span>
  );
}

/* ─── PARTNER CARD ────────────────────────────────────────────────────────── */
function PartnerCard({partner,onSelect,theme,isDark}:{partner:Partner;onSelect:()=>void;theme:T;isDark:boolean}) {
  const cfg=typeConfig[partner.type];
  const [hovered,setHovered]=useState(false);
  return (
    <TiltCard onClick={onSelect} className="group relative cursor-pointer shine-sweep"
      style={{background:theme.card,border:`1px solid ${hovered?cfg.color:theme.border}`,borderRadius:20,overflow:"hidden",
        boxShadow:hovered?`0 24px 80px -24px ${cfg.color}40,0 0 0 1px ${cfg.color}40`:`0 1px 3px rgba(0,0,0,0.12)`,
        transition:"transform 0.25s ease, box-shadow 0.25s ease", backgroundImage:`radial-gradient(circle at top left, ${cfg.color}12, transparent 35%), radial-gradient(circle at bottom right, ${cfg.color}08, transparent 30%)`}}>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{background:`radial-gradient(circle at 20% 20%, ${cfg.color}18 0%, transparent 24%), radial-gradient(circle at 80% 80%, ${cfg.color}08 0%, transparent 18%)`}}/>
      <motion.div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        animate={{y:hovered?-2:0}} transition={{type:"spring",stiffness:400,damping:25}}>
        <PartnerLogoMark partner={partner} theme={theme} isDark={isDark}/>
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[14px] font-bold leading-snug tracking-[-0.01em]" style={{color:theme.text}}>{partner.name}</div>
              <div className="flex items-center gap-1 mt-1 text-[11px]" style={{color:theme.muted}}><Icon.MapPin/>{partner.city}</div>
            </div>
            {partner.tier&&(
              <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold shrink-0"
                style={{color:tierConfig[partner.tier].color,background:tierConfig[partner.tier].bg}}>
                <Icon.Star/>{partner.tier}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[9px] font-semibold"
              style={{background:`rgba(34,197,94,0.12)`,color:"#22c55e",border:`1px solid rgba(34,197,94,0.25)`}}>
              <Icon.Shield className="w-2.5 h-2.5"/>Verified
            </span>
            <span className="text-[10px]" style={{color:theme.dim}}>Since {partner.since}</span>
            {partner.funds&&<span className="ml-auto text-[10px] font-semibold" style={{color:cfg.color}}>{partner.funds}</span>}
          </div>
          <div className="flex flex-wrap gap-1.5">{partner.sdgs.map(n=><SDGChip key={n} num={n} theme={theme}/>)}</div>
          <div className="flex items-center gap-2 pt-3 text-[10px]" style={{borderTop:`1px solid ${theme.border}`,color:theme.dim}}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse" style={{background:"#22c55e"}}/>
            {partner.lastActivity}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ─── PARTNER MODAL ───────────────────────────────────────────────────────── */
function PartnerModal({partner,onClose,theme,isDark}:{partner:Partner;onClose:()=>void;theme:T;isDark:boolean}) {
  const cfg=typeConfig[partner.type];
  const metrics=METRICS_BY_TYPE[partner.type];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{background:theme.overlay,backdropFilter:"blur(8px)"}} onClick={onClose}>
      <motion.div initial={{scale:0.92,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
        exit={{scale:0.94,opacity:0,y:10}} transition={{type:"spring",stiffness:400,damping:30}}
        onClick={e=>e.stopPropagation()}
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[24px]"
        style={{background:theme.card,border:`1px solid ${theme.border}`,boxShadow:`0 40px 80px rgba(0,0,0,0.4)`}}>
        <div className="sticky top-0 z-10 p-6 flex items-start justify-between"
          style={{background:theme.card,borderBottom:`1px solid ${theme.border}`,backdropFilter:"blur(12px)"}}>
          <div className="flex items-center gap-4">
            <MultiSourceImg sources={partner.logoSources} alt={partner.name} initials={partner.initials}
              color={cfg.color} gradient={cfg.gradient} border={cfg.border} isDark={isDark}
              style={{width:56,height:56,borderRadius:14,flexShrink:0}}/>
            <div>
              <div className="text-[17px] font-bold tracking-tight" style={{color:theme.text}}>{partner.name}</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs" style={{color:theme.muted}}>
                <Icon.MapPin className="w-3 h-3"/>{partner.city} · Since {partner.since}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                  style={{background:cfg.badgeBg,color:cfg.badgeText}}>{partner.type}</span>
                {partner.tier&&(
                  <span className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-bold"
                    style={{color:tierConfig[partner.tier].color,background:tierConfig[partner.tier].bg}}>
                    <Icon.Star/>{tierConfig[partner.tier].label}
                  </span>
                )}
              </div>
            </div>
          </div>
          <motion.button onClick={onClose} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{border:`1px solid ${theme.border}`,color:theme.muted,background:theme.pageBg}}>
            <Icon.X/>
          </motion.button>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div className="rounded-2xl p-5" style={{background:theme.pageBg,border:`1px solid ${theme.border}`}}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{color:theme.muted}}>The story so far</div>
            <p className="text-[13px] leading-relaxed" style={{color:theme.textSub}}>{partner.story}</p>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl p-3.5"
            style={{border:"1px solid rgba(34,197,94,0.2)",background:"rgba(34,197,94,0.06)"}}>
            <Icon.Shield className="w-4 h-4" style={{color:"#22c55e"}}/>
            <span className="text-[13px] font-semibold" style={{color:"#22c55e"}}>Verified Partner</span>
            <span className="ml-auto text-[11px]" style={{color:"#4ade80"}}>Audited · Impact verified</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {metrics.map(([val,label])=>(
              <motion.div key={label} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.05}}
                className="rounded-2xl p-4 text-center" style={{background:cfg.gradient,border:`1px solid ${cfg.border}`}}>
                <div className="text-[22px] font-black tracking-tight leading-none" style={{color:cfg.color}}>{val}</div>
                <div className="mt-1 text-[11px] leading-snug" style={{color:theme.muted}}>{label}</div>
              </motion.div>
            ))}
          </div>
          {partner.type==="Company"&&(
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{color:theme.muted}}>Funding journey</div>
              {COMPANY_PROJECTS.map((p,i)=>(
                <div key={p.name} className="relative flex gap-3 pb-4 pl-1 last:pb-0">
                  {i!==COMPANY_PROJECTS.length-1&&<span className="absolute left-[7px] top-4 h-full w-px" style={{background:theme.border}}/>}
                  <span className="z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                    style={{borderColor:cfg.color,background:p.status==="Completed"?cfg.color:"transparent"}}/>
                  <div className="flex-1 rounded-xl p-3" style={{background:theme.pageBg,border:`1px solid ${theme.border}`}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium" style={{color:theme.text}}>{p.name}</span>
                      <span className="text-[13px] font-bold" style={{color:cfg.color}}>{p.amount}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px]" style={{color:theme.muted}}>
                      <span>{p.status}</span>
                      {p.verified&&<span className="flex items-center gap-1" style={{color:theme.accent}}><Icon.Check className="w-3 h-3"/>Verified</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MARQUEE LOGO CARD ───────────────────────────────────────────────────── */
function MarqueeLogoCard({logo,theme,isDark}:{logo:{name:string;domain:string;wiki:string};theme:T;isDark:boolean}) {
  const sources=[logo.wiki,`https://cdn.brandfetch.io/${logo.domain}/w/180/h/60/logo`,`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${logo.domain}&size=128`];
  const [idx,setIdx]=useState(0);
  const [loaded,setLoaded]=useState(false);
  const [allFailed,setAllFailed]=useState(false);
  const tryNext=()=>{ if(idx+1<sources.length){setIdx(i=>i+1);setLoaded(false);}else setAllFailed(true); };
  return (
    <div className="logo-pill mx-3 flex items-center justify-center rounded-2xl px-5"
      style={{minWidth:160,height:76,flexShrink:0,position:"relative",overflow:"hidden",
        background:isDark?"rgba(255,255,255,0.05)":"#ffffff",
        border:`1px solid ${isDark?"rgba(255,255,255,0.09)":"#e5e9f0"}`,
        boxShadow:isDark?"none":"0 1px 4px rgba(0,0,0,0.07)"}}>
      {allFailed?(
        <span style={{fontSize:12,fontWeight:700,letterSpacing:"-0.02em",color:isDark?"rgba(255,255,255,0.45)":theme.muted,userSelect:"none"}}>{logo.name}</span>
      ):(
        <>
          {!loaded&&<div className="logo-shimmer" style={{position:"absolute",inset:0,borderRadius:"inherit"}}/>}
          <img key={idx} src={sources[idx]} alt={logo.name} loading="lazy" onLoad={()=>setLoaded(true)} onError={tryNext}
            style={{maxWidth:120,maxHeight:40,objectFit:"contain",display:"block",opacity:loaded?1:0,transition:"opacity 0.35s ease",filter:isDark?"brightness(0.85) saturate(0.9)":"brightness(0.95) saturate(1)"}}/>
        </>
      )}
    </div>
  );
}

function EcosystemLogoMarquee({theme,isDark}:{theme:T;isDark:boolean}) {
  const doubled=[...ECOSYSTEM_LOGOS,...ECOSYSTEM_LOGOS];
  return (
    <div className="overflow-hidden py-2" style={{WebkitMaskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)",maskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)"}}>
      <div className="mq-track-slow" style={{alignItems:"center",padding:"8px 0"}}>
        {doubled.map((logo,i)=><MarqueeLogoCard key={`${logo.domain}-${i}`} logo={logo} theme={theme} isDark={isDark}/>)}
      </div>
    </div>
  );
}

/* ─── SCROLL REVEAL ───────────────────────────────────────────────────────── */
function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const ref=useRef(null);
  const isInView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <motion.div ref={ref} initial={{opacity:0,y:24}} animate={isInView?{opacity:1,y:0}:{}}
      transition={{duration:0.55,delay,ease:[0.21,0.47,0.32,0.98]}}>
      {children}
    </motion.div>
  );
}

/* ─── HERO BACKGROUND SLIDESHOW ─────────────────────────────────────────── */
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1800&q=85",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&q=85",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=85",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=85",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=85",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1800&q=85",
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1800&q=85",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=85",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&q=85",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=85",
];

function HeroBgSlideshow() {
  const [cur, setCur] = useState(0);

  useEffect(()=>{
    const id = setInterval(()=>{
      setCur(n=>(n+1)%BG_IMAGES.length);
    }, 5000);
    return ()=>clearInterval(id);
  },[]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {BG_IMAGES.map((src,i)=>(
        <div
          key={src}
          className="slow-zoom absolute inset-[-8%]"
          style={{
            backgroundImage:`url('${src}')`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            opacity: i===cur ? 1 : 0,
            transition: "opacity 1.6s ease-in-out",
          }}
        />
      ))}
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}

/* ─── EXPANDABLE STAT CARD ───────────────────────────────────────────────── */
function ExpandableStatCard({card,index,mounted}:{
  card:{label:string;value:string;sub:string;delay:number;floatDur:number};
  index:number;
  mounted:boolean;
}) {
  const [expanded,setExpanded]=useState(false);
  const color=index%2===0?"#0ea5c9":"#a5b4fc";
  const glowColor=index%2===0?"#0ea5c9":"#818cf8";

  return (
    <motion.div
      initial={{opacity:0,scale:0.88,y:16}}
      animate={mounted?{opacity:1,scale:1,y:0}:{}}
      transition={{delay:0.4+index*0.1,duration:0.5,ease:[0.21,0.47,0.32,0.98]}}
      onClick={()=>setExpanded(prev=>!prev)}
      style={{cursor:"pointer",position:"relative",zIndex:expanded?20:1}}
    >
      <motion.div
        animate={{scale:expanded?1.18:1}}
        whileHover={!expanded?{scale:1.05,y:-4}:{}}
        whileTap={{scale:expanded?1.14:1.02}}
        transition={{type:"spring",stiffness:260,damping:20}}
        className="rounded-[20px] p-6 relative"
        style={{
          background:expanded
            ?`linear-gradient(135deg,rgba(6,16,36,0.99) 0%,rgba(12,20,44,0.99) 100%)`
            :"rgba(8,14,28,0.92)",
          border:`1.5px solid ${expanded?color+"90":"rgba(14,165,201,0.22)"}`,
          boxShadow:expanded
            ?`0 28px 72px rgba(0,0,0,0.75),0 0 0 2px ${color}40,0 0 60px ${glowColor}35`
            :"0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow:"hidden",
          transformOrigin:"center center",
        }}
      >
        {/* Glow blob — grows on expand */}
        <motion.div
          className="pointer-events-none absolute -top-6 -right-6 rounded-full blur-2xl"
          animate={{opacity:expanded?0.6:0.28,width:expanded?120:96,height:expanded?120:96}}
          transition={{duration:0.35,ease:"easeOut"}}
          style={{background:glowColor}}
        />

        {/* Ring ripple on expand */}
        <AnimatePresence>
          {expanded&&(
            <motion.span
              key="ring"
              className="pointer-events-none absolute inset-0 rounded-[20px]"
              initial={{opacity:0.7,scale:1}}
              animate={{opacity:0,scale:1.2}}
              exit={{opacity:0}}
              transition={{duration:0.55,ease:"easeOut"}}
              style={{border:`2px solid ${color}`,position:"absolute",borderRadius:20}}
            />
          )}
        </AnimatePresence>

        {/* Float bob — stops when expanded */}
        <motion.div
          animate={expanded?{y:0}:{y:[0,-5,0]}}
          transition={expanded
            ?{duration:0.25,ease:"easeOut"}
            :{duration:card.floatDur,repeat:Infinity,ease:"easeInOut",delay:index*0.7}
          }
        >
          <motion.div
            animate={{color:expanded?color:"rgba(14,165,201,0.65)"}}
            transition={{duration:0.3}}
            className="text-[9px] font-bold uppercase tracking-[0.12em] mb-3"
          >
            {card.label}
          </motion.div>

          <motion.div
            animate={{scale:expanded?1.15:1}}
            transition={{type:"spring",stiffness:280,damping:22}}
            className="font-black tracking-tight leading-none mb-2"
            style={{fontSize:30,transformOrigin:"left center"}}
          >
            <HeroStatCounter value={card.value} color={color}/>
          </motion.div>

          <motion.div
            animate={{opacity:expanded?1:0.5}}
            transition={{duration:0.25}}
            className="text-[12px] font-medium"
            style={{color:"rgba(200,212,224,0.8)"}}
          >
            {card.sub}
          </motion.div>

          {/* Slide-in detail on expand */}
          <AnimatePresence>
            {expanded&&(
              <motion.div
                initial={{opacity:0,y:6,height:0}}
                animate={{opacity:1,y:0,height:"auto"}}
                exit={{opacity:0,y:4,height:0}}
                transition={{duration:0.28,ease:"easeOut"}}
                style={{overflow:"hidden",marginTop:10}}
              >
                <div style={{height:1,background:`linear-gradient(90deg,${color}50,transparent)`,marginBottom:8}}/>
                <div style={{fontSize:10,color:"rgba(200,212,224,0.4)",fontWeight:500}}>Click to collapse</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── HERO STAT COUNTER ──────────────────────────────────────────────────── */
function HeroStatCounter({value,color}:{value:string;color:string}) {
  const ref=useRef<HTMLDivElement>(null);
  const isInView=useInView(ref,{once:true,margin:"-40px"});
  const [display,setDisplay]=useState("0");
  useEffect(()=>{
    if(!isInView) return;
    const num=parseFloat(value.replace(/[^0-9.]/g,""));
    if(isNaN(num)){setDisplay(value);return;}
    const prefix=value.match(/^[^0-9]*/)?.[0]||""; // e.g. "Rs"
    const suffix=value.replace(/^[^0-9]*/,"").replace(/[0-9.]/g,""); // e.g. "Cr+"
    const dur=1600; const start=performance.now();
    const update=(now:number)=>{
      const t=Math.min((now-start)/dur,1);
      const eased=1-Math.pow(1-t,3);
      const cur=eased*num;
      setDisplay(`${prefix}${num<10?cur.toFixed(1):Math.round(cur)}${suffix}`);
      if(t<1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },[isInView,value]);
  return <div ref={ref} style={{color}}>{display}</div>;
}

/* ─── HERO CARD WRAPPER ───────────────────────────────────────────────────── */
function HeroCard({children,mounted,mouseX,mouseY,heroRef}:{
  children:React.ReactNode;
  mounted:boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  heroRef: React.RefObject<HTMLDivElement>;
}) {
  const cardRef=useRef<HTMLDivElement>(null);
  const [hovered,setHovered]=useState(false);
  const [spotlight,setSpotlight]=useState({x:50,y:50});

  const handleMouseMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    if(!cardRef.current) return;
    const rect=cardRef.current.getBoundingClientRect();
    setSpotlight({
      x:((e.clientX-rect.left)/rect.width)*100,
      y:((e.clientY-rect.top)/rect.height)*100,
    });
  },[]);

  return (
    <motion.div
      ref={cardRef}
      initial={{opacity:0,y:32,scale:0.98}}
      animate={mounted?{opacity:1,y:0,scale:1}:{}}
      transition={{duration:0.75,ease:[0.21,0.47,0.32,0.98]}}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onMouseMove={handleMouseMove}
      className="mx-auto max-w-3xl rounded-[32px] relative"
      style={{
        background:"rgba(6,10,18,0.75)",
        backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)",
        border:`1px solid ${hovered?"rgba(14,165,201,0.45)":"rgba(14,165,201,0.22)"}`,
        boxShadow:hovered
          ?"0 40px 100px rgba(0,0,0,0.65),inset 0 1px 0 rgba(255,255,255,0.08),0 0 0 1px rgba(14,165,201,0.1),0 0 80px rgba(14,165,201,0.08)"
          :"0 32px 80px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.06),0 0 0 1px rgba(14,165,201,0.05)",
        overflow:"visible", minHeight:460,
        transition:"border-color 0.4s ease, box-shadow 0.4s ease",
      }}>

      {/* Animated spotlight radial glow on hover */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity:hovered?1:0,
          background:`radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(14,165,201,0.07) 0%, transparent 60%)`,
        }}/>

      {/* Animated sweeping top border line */}
      <div className="hero-top-line pointer-events-none absolute top-0 left-0 right-0 h-[1.5px]"
        style={{background:"linear-gradient(90deg,transparent,rgba(14,165,201,0.8),rgba(129,140,248,0.6),transparent)"}}/>

      {/* Corner accent glows */}
      <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{background:"#0ea5c9",transform:"translate(-50%,-50%)"}}/>
      <div className="pointer-events-none absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-15"
        style={{background:"#818cf8",transform:"translate(40%,40%)"}}/>

      {children}
    </motion.div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function PartnersPage() {
  const { theme: siteTheme } = useTheme();
  const isDark = siteTheme === "dark";
  const [activeTab,setActiveTab]=useState<Tab>("All");
  const [selectedPartner,setSelected]=useState<Partner|null>(null);
  const [searchQuery,setSearchQuery]=useState("");
  const [mounted,setMounted]=useState(false);
  const [searchFocused,setSearchFocused]=useState(false);
  const theme:T=isDark?DARK:LIGHT;

  const mouseX=useMotionValue(0);
  const mouseY=useMotionValue(0);
  const heroRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    setMounted(true);
  },[]);

  const handleHeroMouseMove=useCallback((e:React.MouseEvent)=>{
    if(!heroRef.current) return;
    const rect=heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX-rect.left); mouseY.set(e.clientY-rect.top);
  },[mouseX,mouseY]);

  const filtered=partners.filter(p=>{
    const targetType=TAB_TO_TYPE[activeTab];
    const matchesTab=targetType===null||p.type===targetType;
    const q=searchQuery.trim().toLowerCase();
    return matchesTab&&(q===""||p.name.toLowerCase().includes(q)||p.city.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen theme-transition" style={{background:theme.pageBg,color:theme.text,fontFamily:"'Inter',system-ui,sans-serif"}}>
      <style>{GLOBAL_STYLES}</style>

      {/* ── HERO ── */}
      <section ref={heroRef} onMouseMove={handleHeroMouseMove} className="relative overflow-hidden"
        style={{minHeight:"calc(100vh - 80px)",display:"flex",alignItems:"center"}}>

        {/* ── BACKGROUND ── */}

        {/* Crossfading photo slideshow */}
        <HeroBgSlideshow />

        {/* Strong dark overlay so text is always readable */}
        <div className="pointer-events-none absolute inset-0" style={{background:"linear-gradient(120deg,rgba(2,6,18,0.94) 0%,rgba(4,10,24,0.85) 55%,rgba(2,6,16,0.92) 100%)"}}/>

        {/* Aurora blobs */}
        <div className="aurora-1 pointer-events-none absolute rounded-full blur-[140px]"
          style={{width:700,height:500,top:"-10%",left:"-5%",background:"radial-gradient(ellipse,rgba(14,165,201,0.30) 0%,rgba(6,182,212,0.12) 55%,transparent 75%)"}}/>
        <div className="aurora-2 pointer-events-none absolute rounded-full blur-[160px]"
          style={{width:750,height:580,top:"15%",right:"-8%",background:"radial-gradient(ellipse,rgba(99,102,241,0.25) 0%,rgba(139,92,246,0.10) 55%,transparent 75%)"}}/>
        <div className="aurora-3 pointer-events-none absolute rounded-full blur-[180px]"
          style={{width:600,height:500,bottom:"-15%",left:"28%",background:"radial-gradient(ellipse,rgba(16,185,129,0.20) 0%,rgba(6,182,212,0.08) 55%,transparent 75%)"}}/>

        {/* Drifting warm orb */}
        <div className="orb-drift pointer-events-none absolute rounded-full blur-[100px] opacity-25"
          style={{width:320,height:320,top:"40%",left:"42%",background:"radial-gradient(circle,rgba(251,191,36,0.4),rgba(249,115,22,0.15),transparent 70%)"}}/>



        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0"
          style={{background:"radial-gradient(ellipse 85% 75% at 50% 50%,transparent 45%,rgba(1,4,12,0.9) 100%)"}}/>

        {/* Floating particles */}
        {[
          {size:5, top:"10%", left:"6%",   dur:"5s",   delay:"0s",   color:"#0ea5c9" },
          {size:3, top:"68%", left:"3%",   dur:"7s",   delay:"1s",   color:"#818cf8" },
          {size:7, top:"22%", left:"92%",  dur:"6s",   delay:"0.5s", color:"#0ea5c9" },
          {size:4, top:"80%", left:"88%",  dur:"8s",   delay:"2s",   color:"#34d399" },
          {size:3, top:"44%", left:"12%",  dur:"5.5s", delay:"1.5s", color:"#818cf8" },
          {size:6, top:"16%", left:"77%",  dur:"6.5s", delay:"0.8s", color:"#0ea5c9" },
          {size:4, top:"58%", left:"96%",  dur:"7.5s", delay:"0.3s", color:"#c084fc" },
          {size:5, top:"88%", left:"22%",  dur:"6s",   delay:"2.5s", color:"#34d399" },
          {size:3, top:"32%", left:"50%",  dur:"9s",   delay:"3s",   color:"#818cf8" },
          {size:4, top:"75%", left:"60%",  dur:"8.5s", delay:"1.2s", color:"#0ea5c9" },
        ].map((p,i)=>(
          <div key={i} className="particle pointer-events-none absolute rounded-full"
            style={{width:p.size,height:p.size,top:p.top,left:p.left,
              ["--dur" as string]:p.dur,animationDelay:p.delay,
              background:p.color,boxShadow:`0 0 ${p.size*3}px ${p.color}`,
            }}/>
        ))}

        <div className="relative z-10 w-full px-4 md:px-14 py-16">
          <HeroCard mounted={mounted} mouseX={mouseX} mouseY={mouseY} heroRef={heroRef as React.RefObject<HTMLDivElement>}>

            {/* Card inner layout: left text + right stats side by side */}
            <div className="flex flex-col md:flex-row md:items-center gap-10 p-8 md:p-12">

              {/* Left: Text content */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <motion.h1 initial={{opacity:0,y:20}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.22}}
                  className="font-black leading-[1.05] tracking-[-0.035em]"
                  style={{color:"#ffffff",fontSize:"clamp(28px,3.2vw,42px)"}}>
                  <span style={{display:"block",whiteSpace:"nowrap"}}>Building impact</span>
                  <span style={{backgroundImage:"linear-gradient(135deg,#0ea5c9 0%,#818cf8 60%,#c084fc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",display:"block"}}>
                    through
                  </span>
                  <span style={{backgroundImage:"linear-gradient(135deg,#0ea5c9 0%,#818cf8 60%,#c084fc 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",display:"block"}}>
                    collaboration.
                  </span>
                </motion.h1>

                <motion.p initial={{opacity:0,y:12}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.3}}
                  className="text-[15px] leading-[1.75]" style={{color:"rgba(200,212,224,0.80)",maxWidth:460}}>
                  Schools, NGOs, universities, and companies united around the 17 UN SDGs.
                  Every partnership creates a ripple of lasting change.
                </motion.p>

                {/* Trust badges */}
                <motion.div initial={{opacity:0,y:8}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.36}}
                  className="flex flex-wrap gap-2">
                  {["260+ Partners","17 UN SDGs","6 States"].map((badge,i)=>(
                    <span key={badge} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
                      style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(200,220,240,0.75)"}}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{background:i===0?"#0ea5c9":i===1?"#818cf8":"#34d399"}}/>
                      {badge}
                    </span>
                  ))}
                </motion.div>

                <motion.div initial={{opacity:0,y:10}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.42}}
                  className="flex flex-wrap gap-3">
                  <motion.a href="/work-with-us" whileHover={{scale:1.04,y:-2,boxShadow:"0 8px 30px rgba(14,165,201,0.55)"}} whileTap={{scale:0.97}}
                    className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-[14px] font-bold"
                    style={{background:"linear-gradient(135deg,#0ea5c9,#0369a1)",color:"#fff",boxShadow:"0 4px 24px rgba(14,165,201,0.45)",transition:"box-shadow 0.2s"}}>
                    Partner With Us <Icon.Arrow className="w-4 h-4"/>
                  </motion.a>

                </motion.div>
              </div>

              {/* Right: Stat cards grid — 2×2 */}
              <div className="hidden md:grid grid-cols-2 gap-4 shrink-0" style={{width:320,position:"relative"}}>
                {heroFloatingCards.map((card,i)=>(
                  <ExpandableStatCard key={card.label} card={card} index={i} mounted={mounted}/>
                ))}
              </div>

            </div>

            {/* Mobile stat grid */}
            <div className="md:hidden grid grid-cols-2 gap-3 px-8 pb-10">
              {heroFloatingCards.map(card=>(
                <div key={card.label} className="rounded-[16px] px-4 py-5"
                  style={{background:"rgba(8,14,26,0.85)",border:"1px solid rgba(14,165,201,0.18)"}}>
                  <div className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{color:"rgba(14,165,201,0.7)"}}>{card.label}</div>
                  <div className="text-[24px] font-black tracking-tight" style={{color:"#0ea5c9"}}>{card.value}</div>
                  <div className="text-[11px] mt-1" style={{color:"rgba(200,212,224,0.55)"}}>{card.sub}</div>
                </div>
              ))}
            </div>
          </HeroCard>
        </div>
      </section>

      {/* ── ECOSYSTEM FLOW ── */}
      <section className="px-6 md:px-10 py-16" style={{borderBottom:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Our partnership ecosystem</p>
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tight" style={{color:theme.text}}>Together, we create lasting change</h2>
            <p className="mt-2 text-sm max-w-md mx-auto" style={{color:theme.muted}}>Each partner plays a distinct role, working toward the same goals.</p>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-y-6">
          {ecosystemRoles.map((node,i)=>{
            const isHub=node.type==="Hub";
            const cfg=!isHub?typeConfig[node.type as PartnerType]:null;
            const color=isHub?theme.accent:cfg!.color;
            const nodeDelay=i*0.85;
            const ringDelay=i===0?0.3:nodeDelay+0.6;
            return (
              <div key={node.title} className="flex items-center">
                {i!==0&&(
                  <div className="hidden md:block relative h-px w-12 lg:w-20 shrink-0" style={{background:theme.border}}>
                    <motion.div className="absolute inset-0"
                      initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}}
                      transition={{duration:0.55,delay:nodeDelay,ease:"easeInOut"}}
                      style={{background:`linear-gradient(90deg,${color}80,${color})`,transformOrigin:"left",height:"100%"}}
                    />
                    <motion.div className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                      initial={{left:"0%",opacity:0,scale:0}}
                      whileInView={{left:["0%","110%"],opacity:[0,1,1,0],scale:[0,1.6,1.6,0]}}
                      viewport={{once:true}}
                      transition={{duration:0.55,delay:nodeDelay,ease:"easeInOut",times:[0,0.1,0.85,1]}}
                      style={{width:10,height:10,background:color,boxShadow:`0 0 12px ${color},0 0 24px ${color}`,position:"absolute"}}
                    />
                  </div>
                )}
                <div className={`flex flex-col items-center gap-3 text-center ${isHub?"w-[150px]":"w-[120px]"}`}>
                  <div className="relative flex items-center justify-center">
                    {/* one-time burst on arrival */}
                    <motion.div className="absolute rounded-full pointer-events-none"
                      initial={{scale:0.8,opacity:0}} whileInView={{scale:[0.8,1.8],opacity:[0.8,0]}}
                      viewport={{once:true}}
                      transition={{duration:0.65,delay:ringDelay,ease:"easeOut"}}
                      style={{width:isHub?96:64,height:isHub?96:64,border:`2px solid ${color}`,borderRadius:"50%"}}
                    />
                    {/* continuous pulse ring 1 */}
                    <motion.div className="absolute rounded-full pointer-events-none"
                      animate={{scale:[1,1.5,1],opacity:[0.55,0,0.55]}}
                      transition={{duration:2.6,repeat:Infinity,ease:"easeInOut",delay:ringDelay+0.8}}
                      style={{width:isHub?96:64,height:isHub?96:64,border:`1.5px solid ${color}`,borderRadius:"50%"}}
                    />
                    {/* continuous pulse ring 2 */}
                    <motion.div className="absolute rounded-full pointer-events-none"
                      animate={{scale:[1,1.85,1],opacity:[0.3,0,0.3]}}
                      transition={{duration:3.4,repeat:Infinity,ease:"easeInOut",delay:ringDelay+1.2}}
                      style={{width:isHub?96:64,height:isHub?96:64,border:`1px solid ${color}`,borderRadius:"50%"}}
                    />
                    {/* node circle */}
                    <motion.div
                      whileHover={{scale:1.12,y:-4,boxShadow:`0 0 36px ${color}90`}}
                      initial={{opacity:0,scale:0.4,y:16}}
                      whileInView={{opacity:1,scale:1,y:0}}
                      viewport={{once:true}}
                      transition={{duration:0.55,delay:ringDelay,type:"spring",stiffness:240,damping:18}}
                      className={`relative flex items-center justify-center rounded-full border-2 ${isHub?"h-24 w-24":"h-16 w-16"}`}
                      style={{
                        background:isHub?"rgba(255,255,255,0.95)":cfg?.gradient,
                        borderColor:color,
                        boxShadow:`0 0 22px ${color}55,0 0 0 3px ${color}20`,
                        overflow:"hidden",padding:0,
                      }}>
                      {isHub
                        ?<img src="/assets/SDG_LOGO-removebg-preview.png" alt="StepUp SDG" style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"50%",position:"absolute",inset:0}}/>
                        :cfg&&<motion.span
                          animate={{rotate:[0,10,-10,0],scale:[1,1.18,1]}}
                          transition={{duration:3.5,repeat:Infinity,ease:"easeInOut",delay:i*0.5}}
                          style={{color:cfg.color}}><cfg.IconEl className="w-6 h-6"/></motion.span>
                      }
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                    transition={{duration:0.4,delay:ringDelay+0.15}}>
                    <div className="text-[13px] font-bold" style={{color:isHub?theme.accent:theme.text}}>
                      {isHub?<><span style={{color:theme.accent}}>StepUp</span>{" "}<span style={{color:"#ef4444"}}>For SDG</span></>:node.title}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug" style={{color:theme.muted}}>{node.role}</div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PARTNER DIRECTORY ── */}
      <section id="directory" className="px-6 md:px-10 py-16" style={{borderBottom:`1px solid ${theme.border}`}}>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{color:theme.muted}}>
                <motion.span animate={{scale:searchFocused?1.1:1}} transition={{duration:0.2}}><Icon.Search className="w-3.5 h-3.5"/></motion.span>
              </span>
              <input type="text" placeholder="Search by name or city..." value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                onFocus={()=>setSearchFocused(true)} onBlur={()=>setSearchFocused(false)}
                className="glass-input rounded-xl py-2.5 pl-[38px] pr-4 text-[13px] w-[280px]"
                style={{background:theme.card,border:`1.5px solid ${searchFocused?theme.accent:theme.border}`,color:theme.text,
                  boxShadow:searchFocused?`0 0 0 3px ${theme.accent}15`:"none"}}/>
            </div>
            <div className="relative flex rounded-xl p-1" style={{background:theme.sectionAlt,border:`1px solid ${theme.border}`}}>
              {tabs.map(tab=>{
                const isActive=activeTab===tab;
                return (
                  <button key={tab} onClick={()=>setActiveTab(tab)}
                    className="segmented-tab relative rounded-lg px-4 py-1.5 text-[13px] font-medium z-10"
                    style={{color:isActive?(isDark?"#fff":"#0d1829"):theme.muted}}>
                    {isActive&&<motion.span layoutId="tab-indicator" className="absolute inset-0 rounded-lg z-0"
                      style={{background:isDark?theme.card:"#ffffff",border:`1px solid ${theme.border}`,boxShadow:"0 1px 4px rgba(0,0,0,0.12)"}}
                      transition={{type:"spring",stiffness:500,damping:35}}/>}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
        {filtered.length===0?(
          <div className="rounded-2xl py-24 text-center text-sm" style={{border:`1px dashed ${theme.border}`,color:theme.muted}}>
            No partners found for &ldquo;{searchQuery}&rdquo;
          </div>
        ):(
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((partner,idx)=>(
                <motion.div key={partner.id} layout initial={{opacity:0,scale:0.94,y:16}}
                  animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.94}}
                  transition={{duration:0.35,delay:idx*0.04,ease:"easeOut"}}>
                  <PartnerCard partner={partner} onSelect={()=>setSelected(partner)} theme={theme} isDark={isDark}/>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ── LOGO MARQUEE ── */}
      <section className="py-12" style={{borderBottom:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <Reveal>
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest mb-8 px-6" style={{color:theme.dim}}>
            Organizations in our ecosystem
          </p>
        </Reveal>
        <EcosystemLogoMarquee theme={theme} isDark={isDark}/>
      </section>

      {/* ── PARTNER WITH US ── */}
      <section id="partner-form" className="relative overflow-hidden px-6 md:px-10 py-20"
        style={{borderTop:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <div aria-hidden className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{background:`${theme.accent}08`}}/>
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Join the ecosystem</p>
            <h2 className="text-[34px] md:text-[44px] font-black tracking-[-0.03em] mb-4" style={{color:theme.text}}>Partner with StepUp For SDG</h2>
            <p className="mx-auto max-w-[480px] text-[15px] leading-relaxed" style={{color:theme.muted}}>
              Whether you&apos;re a company with a CSR mandate, a school with motivated students, or an NGO with a program to scale — there&apos;s a place for you here.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 mb-6 md:grid-cols-3">
          {audienceCards.map((card,idx)=>{
            const cfg=typeConfig[card.type];
            return (
              <Reveal key={card.title} delay={idx*0.08}>
                <motion.div whileHover={{y:-4}} className="rounded-[20px] p-7 h-full"
                  style={{background:theme.card,border:`1px solid ${theme.border}`}}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border"
                    style={{background:cfg.gradient,borderColor:cfg.border,color:cfg.color}}>
                    <cfg.IconEl className="w-5 h-5"/>
                  </div>
                  <div className="mb-4 text-[15px] font-bold tracking-tight" style={{color:theme.text}}>{card.title}</div>
                  <ul className="flex flex-col gap-3 mb-6">
                    {card.benefits.map(b=>(
                      <li key={b} className="flex items-start gap-2.5 text-[13px] leading-snug" style={{color:theme.muted}}>
                        <Icon.Check className="mt-0.5 w-3.5 h-3.5 shrink-0" style={{color:theme.accent}}/>{b}
                      </li>
                    ))}
                  </ul>
                  <a href={card.href}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-semibold transition-opacity hover:opacity-80"
                    style={{background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}`}}>
                    {card.btnLabel} <Icon.Arrow className="w-3.5 h-3.5"/>
                  </a>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mb-6 rounded-[20px] p-7" style={{background:theme.card,border:`1px solid ${theme.border}`}}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-5" style={{color:theme.muted}}>Partnership models</p>
            <div className="grid gap-3.5 md:grid-cols-3">
              {[{IconEl:Icon.BarChart,...partnershipModels[0]},{IconEl:Icon.Handshake,...partnershipModels[1]},{IconEl:Icon.Megaphone,...partnershipModels[2]}].map(m=>(
                <motion.div key={m.title} whileHover={{y:-2}} className="rounded-[14px] p-5"
                  style={{background:theme.pageBg,border:`1px solid ${theme.border}`}}>
                  <span style={{color:theme.accent}}><m.IconEl className="w-4 h-4"/></span>
                  <div className="mb-1.5 mt-3 text-[13px] font-semibold" style={{color:theme.text}}>{m.title}</div>
                  <div className="text-[12px] leading-relaxed" style={{color:theme.muted}}>{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex justify-center">
            <motion.a
              href="/work-with-us"
              whileHover={{scale:1.05,y:-2}} whileTap={{scale:0.97}}
              className="inline-flex items-center gap-3 rounded-2xl px-10 py-4 text-[16px] font-bold"
              style={{background:`linear-gradient(135deg,${theme.accent},#0284c7)`,color:"#fff",boxShadow:`0 8px 32px ${theme.accent}40`}}>
              Work with us <Icon.Arrow className="w-5 h-5"/>
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedPartner&&<PartnerModal partner={selectedPartner} onClose={()=>setSelected(null)} theme={theme} isDark={isDark}/>}
      </AnimatePresence>

    </div>
  );
}