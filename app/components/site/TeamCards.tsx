"use client";

import { useState } from "react";
const team = [
  {
    name: "Eswar Vardhan",
    role: "Co-Founder & Head of Operations",
    bio: "Building sustainable educational programs through strategic operations, efficient execution, and strong collaboration with schools, NGOs, and partners.",
    tags: ["Operations • Leadership", "Partnerships • Execution"],
    linkedin: "#", // TODO: replace with official LinkedIn URL when available
  },
  {
    name: "Vijay Vedantam",
    role: "Strategic Advisor",
    bio: "Guiding the organization's long-term vision through strategic planning, innovation, and partnerships that strengthen educational impact and sustainable growth.",
    tags: ["Strategy • Innovation", "Mentorship • Partnerships"],
    linkedin: "https://www.linkedin.com/in/vijayvedantam/",
  },
  {
    name: "Pavan Tarak",
    role: "Co-Founder & Head of Execution",
    bio: "Driving project execution by transforming ideas into impactful educational initiatives through teamwork, coordination, and community engagement.",
    tags: ["Execution • Leadership", "Projects • Community Impact"],
    linkedin: "https://www.linkedin.com/in/pavantarak/",
  },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("");
}

function FlipCard({ member }: { member: (typeof team)[0] }) {
  const [flipped, setFlipped] = useState(false);
  const hasLinkedIn = member.linkedin !== "#";

  function handleCardClick() {
    setFlipped(f => !f);
  }

  return (
    <div
      className="cursor-pointer group"
      style={{ perspective: "1000px", height: 280 }}
      onClick={handleCardClick}
    >
      <div
        className="group-hover:shadow-[0_0_24px_rgba(0,194,255,0.25)] transition-all duration-300"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4,0.2,0.2,1), box-shadow 0.3s ease, scale 0.3s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          scale: "1",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.scale = "1.02";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.scale = "1";
        }}
      >
        {/* Front */}
        <div
          className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="h-20 w-20 rounded-full bg-gradient-to-br from-electric to-cyan-glow grid place-items-center text-white text-2xl font-bold select-none cursor-pointer"
            onClick={(e) => { if (hasLinkedIn) { e.stopPropagation(); window.open(member.linkedin, "_blank", "noopener,noreferrer"); } }}
          >
            {initials(member.name)}
          </div>
          <h4 className="mt-4 font-semibold">{member.name}</h4>
          <p className="text-sm text-muted-text">{member.role}</p>
          <p className="mt-3 text-[11px] text-muted-text opacity-60">
            Click to learn more
          </p>
        </div>

        {/* Back */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg,#0D1B6E,#155DFC)",
          }}
        >
          <div className="flex-1 min-h-0">
            <h4 className="font-semibold text-white text-sm">{member.name}</h4>
            <p className="text-[11px] text-white/70 mb-2">{member.role}</p>
            <p className="text-[12px] text-white/85 leading-5 line-clamp-4">
              {member.bio}
            </p>
          </div>
          <div className="mt-3 border-t border-white/15 pt-2">
            <div className="text-[10px] leading-4 text-white/75">
              {member.tags.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamCards() {
  return (
    <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-3">
      {team.map((m) => (
        <FlipCard key={m.name} member={m} />
      ))}
    </div>
  );
}
