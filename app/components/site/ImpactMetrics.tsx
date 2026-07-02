import { Counter } from "./Counter";
import { FadeUp } from "./FadeUp";

const metrics = [
  { value: 1240,   suffix: "+", label: "Schools Supported",  accent: "#155DFC" },
  { value: 560,    suffix: "+", label: "Projects Completed", accent: "#00A8A8" },
  { value: 380000, suffix: "+", label: "Students Enrolled",  accent: "#00B050" },
  { value: 45000,  suffix: "+", label: "Volunteer Hours",    accent: "#FF7A00" },
];

export function ImpactMetrics() {
  return (
    <section className="relative pb-6 pt-20 px-6">
      <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <FadeUp key={m.label} delay={i * 100}>
            <div
              className="rounded-2xl p-6 text-center lift"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="text-3xl md:text-4xl font-display font-bold"
                style={{ color: m.accent }}
              >
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--muted-text)" }}>{m.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
