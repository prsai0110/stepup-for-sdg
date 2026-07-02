"use client";

import { Eye, Target, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Stat = { icon: string; to: number; suffix: string; label: string };

type CardData = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  highlight: string;
  image: string;
  imageAlt: string;
  stats: Stat[];
  from: "left" | "right";
  delay: number;
};

const cards: CardData[] = [
  {
    id: "vision",
    icon: Eye,
    eyebrow: "Our Vision",
    headline: "Empowering Every Learner to Build a Better Tomorrow",
    paragraphs: [
      "We envision a future where every child, regardless of geography, income, or background, has equal access to quality education, technology, and opportunities that unlock their full potential.",
      "StepUp for SDG aims to create inclusive schools, empowered educators, and connected communities that inspire lifelong learning and sustainable development.",
    ],
    highlight: "Education is the foundation for lasting change.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    imageAlt: "Children learning inside a modern classroom",
    stats: [
      { icon: "👨‍🎓", to: 1, suffix: "M+", label: "Future Learners" },
      { icon: "🏫", to: 500, suffix: "+", label: "Schools" },
      { icon: "🌍", to: 25, suffix: "+", label: "Regions" },
    ],
    from: "left",
    delay: 0,
  },
  {
    id: "mission",
    icon: Target,
    eyebrow: "Our Mission",
    headline: "Transforming Partnerships into Measurable Educational Impact",
    paragraphs: [
      "Our mission is to connect schools, NGOs, companies, volunteers, and communities through one collaborative platform that enables transparent educational initiatives, innovation, and measurable social impact.",
      "Every contribution helps children gain knowledge, confidence, and opportunities for a brighter future.",
    ],
    highlight: "Together we create opportunities that transform lives.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    imageAlt: "Volunteers helping students in a rural school",
    stats: [
      { icon: "🤝", to: 200, suffix: "+", label: "Partners" },
      { icon: "📚", to: 1000, suffix: "+", label: "Projects" },
      { icon: "❤️", to: 50, suffix: "K+", label: "Lives Impacted" },
    ],
    from: "right",
    delay: 0.2,
  },
];

function PremiumCard({ data }: { data: CardData }) {
  const Icon = data.icon;

  // Normalised pointer position (-0.5 .. 0.5) for tilt + magnetic pull.
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  // Raw pixel position for the mouse-following border glow.
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [10, -10]), spring);
  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-10, 10]), spring);
  const magX = useSpring(useTransform(nx, [-0.5, 0.5], [-14, 14]), spring);
  const magY = useSpring(useTransform(ny, [-0.5, 0.5], [-14, 14]), spring);

  const glow = useMotionTemplate`radial-gradient(220px circle at ${gx}% ${gy}%, rgba(0,208,132,0.65), rgba(0,194,255,0.35) 45%, transparent 72%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    nx.set(relX - 0.5);
    ny.set(relY - 0.5);
    gx.set(relX * 100);
    gy.set(relY * 100);
  }
  function handleMouseLeave() {
    nx.set(0);
    ny.set(0);
    gx.set(50);
    gy.set(50);
  }

  return (
    // Outer wrapper: 3D rotate-in + blur-to-clear scroll reveal.
    <motion.div
      initial={{
        opacity: 0,
        rotateY: data.from === "left" ? -55 : 55,
        y: 40,
        filter: "blur(14px)",
      }}
      whileInView={{ opacity: 1, rotateY: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 55,
        damping: 16,
        delay: data.delay,
      }}
      style={{ perspective: 1200 }}
      className="[transform-style:preserve-3d]"
    >
      {/* Interactive layer: magnetic pull + 3D tilt + hover lift. */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          x: magX,
          y: magY,
          transformPerspective: 1000,
        }}
        whileHover={{ scale: 1.02 }}
        className="vm-card group relative rounded-[32px] p-[1.5px] [transform-style:preserve-3d]"
      >
        {/* Mouse-following border glow */}
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="vm-glow pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Inner frosted glass surface */}
        <div className="vm-surface relative flex h-full min-h-[480px] flex-col gap-5 rounded-[31px] p-6 md:p-7">
          {/* Icon + eyebrow */}
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="vm-icon grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[18deg]"
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.span>
            <h3 className="font-display text-xl font-bold text-white md:text-2xl">
              {data.eyebrow}
            </h3>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.imageAlt}
              className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          </div>

          {/* Headline + body */}
          <div className="flex flex-1 flex-col gap-3">
            <h4 className="font-display text-lg font-semibold leading-snug text-white">
              {data.headline}
            </h4>
            {data.paragraphs.map((p, i) => (
              <p key={i} className="text-[13px] leading-relaxed text-[#CBD5E1]">
                {p}
              </p>
            ))}
            <p className="vm-highlight mt-0.5 border-l-2 pl-3 text-[13px] font-medium italic">
              “{data.highlight}”
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[11px] leading-tight text-[#CBD5E1]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}



export function VisionMission() {
  return (
    <section className="vm-section relative overflow-hidden">
      {/* Ambient background */}
      <div className="vm-bg pointer-events-none absolute inset-0 -z-10">
        <span className="vm-blob vm-blob-blue" />
        <span className="vm-blob vm-blob-green" />
        <span className="vm-rays" />
        <span className="vm-particles" />

      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="vision-title font-display text-4xl font-bold md:text-5xl">
          Vision &amp; Mission
        </h2>
        <p className="vision-subtitle mt-4 text-base md:text-lg">
          Building a Future Where Every Child Has Equal Access to Quality
          Education
        </p>
      </motion.div>

      {/* Cards */}
      <div className="mx-auto mt-12 grid w-full max-w-[1120px] grid-cols-1 gap-8 md:grid-cols-2">
        {cards.map((c) => (
          <PremiumCard key={c.id} data={c} />
        ))}
      </div>
    </section>
  );
}
