"use client";

import { useState } from "react";
import { Users, Leaf, TrendingUp, Shield, Handshake } from "lucide-react";

const pillars = [
  {
    letter: "P",
    title: "People",
    icon: Users,
    color: "#155DFC",
    gradient: "linear-gradient(135deg,#155DFC,#00C2FF)",
    desc: "Empowering every individual — students, teachers, parents and communities — to participate actively in the education ecosystem and drive inclusive, lifelong learning.",
  },
  {
    letter: "P",
    title: "Planet",
    icon: Leaf,
    color: "#00B050",
    gradient: "linear-gradient(135deg,#00A8A8,#00B050)",
    desc: "Embedding environmental responsibility into every programme — from eco-friendly school infrastructure to climate literacy curricula that prepare students for a sustainable future.",
  },
  {
    letter: "P",
    title: "Prosperity",
    icon: TrendingUp,
    color: "#FF7A00",
    gradient: "linear-gradient(135deg,#FF7A00,#FFB070)",
    desc: "Ensuring education investments generate measurable economic returns for communities — through skill-building, employment pathways, and entrepreneurship programmes for youth.",
  },
  {
    letter: "P",
    title: "Peace",
    icon: Shield,
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg,#8B5CF6,#C4B5FD)",
    desc: "Fostering inclusive, safe learning environments that celebrate diversity, resolve conflict through dialogue, and build the social cohesion necessary for lasting community well-being.",
  },
  {
    letter: "P",
    title: "Partnership",
    icon: Handshake,
    color: "#06B6D4",
    gradient: "linear-gradient(135deg,#06B6D4,#0EA5E9)",
    desc: "Building transparent, accountable alliances between schools, NGOs, corporations and governments — because lasting impact requires every stakeholder working toward a shared goal.",
  },
];

function PillarCard({ p }: { p: typeof pillars[0] }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = p.icon;

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "900px", height: 200 }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.55s cubic-bezier(0.4,0.2,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div className="glass rounded-2xl flex flex-col items-center justify-center gap-3 absolute inset-0"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
          <div className="h-12 w-12 rounded-xl grid place-items-center"
            style={{ background: p.gradient }}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="font-semibold text-sm">{p.title}</div>
          <div className="text-[10px] opacity-40" style={{ color: "var(--muted-text)" }}>click to explore</div>
        </div>

        {/* Back */}
        <div className="rounded-2xl p-5 flex flex-col justify-center absolute inset-0"
          style={{
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: p.gradient,
          }}>
          <div className="font-bold text-white text-base mb-2">{p.title}</div>
          <p className="text-white/85 text-[11px] leading-5">{p.desc}</p>
        </div>
      </div>
    </div>
  );
}

export function FivePCards() {
  return (
    <div className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-5">
      {pillars.map((p) => (
        <PillarCard key={p.title} p={p} />
      ))}
    </div>
  );
}
