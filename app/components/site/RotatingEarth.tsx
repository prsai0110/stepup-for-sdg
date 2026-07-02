type Props = {
  size?: string;
  showCards?: boolean;
  className?: string;
};

export function RotatingEarth({
  size = "min(560px, 90vw)",
  showCards = true,
  className = "",
}: Props) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width: size, maxWidth: "100%" }}
    >
      <div className="earth-wrap">
        <div className="earth-glow" />
        <div className="orbit-ring r3">
          <span className="orbit-dot" style={{ background: "#AAB6C8" }} />
        </div>
        <div className="orbit-ring r2">
          <span className="orbit-dot" style={{ background: "#155DFC" }} />
        </div>
        <div className="orbit-ring">
          <span className="orbit-dot" />
        </div>
        <div
          className="earth-sphere"
          style={{ ["--earth-tex" as string]: `url(/assets/earth-map.jpg)` }}
        />
        <div className="earth-atmos" />

        <span className="impact-node" style={{ top: "32%", left: "42%" }} />
        <span
          className="impact-node"
          style={{ top: "48%", left: "58%", animationDelay: "0.7s" }}
        />
        <span
          className="impact-node"
          style={{
            top: "62%",
            left: "38%",
            animationDelay: "1.4s",
            background: "#00C2FF",
            boxShadow:
              "0 0 0 4px rgba(0,194,255,0.25), 0 0 20px rgba(0,194,255,0.7)",
          }}
        />
        {showCards && (
          <>
            <div className="float-card" style={{ top: "8%", left: "-6%" }}>
              🎓 Better Education, Better Future
            </div>
            <div
              className="float-card"
              style={{ top: "34%", right: "-8%", animationDelay: "1s" }}
            >
              🤝 Stronger Communities
            </div>
            <div
              className="float-card"
              style={{ bottom: "18%", left: "-10%", animationDelay: "2s" }}
            >
              🌱 Sustainable Tomorrow
            </div>
            <div
              className="float-card"
              style={{ bottom: "4%", right: "-4%", animationDelay: "3s" }}
            >
              📈 Shared Growth, Shared Impact
            </div>
          </>
        )}
      </div>
    </div>
  );
}
