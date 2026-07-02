export function SpaceBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 space-bg" />
      <div className="stars-layer" />
      <span className="streak" style={{ top: "20%", animationDelay: "0s" }} />
      <span className="streak" style={{ top: "45%", animationDelay: "2s" }} />
      <span className="streak" style={{ top: "70%", animationDelay: "4s" }} />
      <span className="streak" style={{ top: "10%", animationDelay: "1s" }} />
    </div>
  );
}
