"use client";
import { useState } from "react";
import { HandHeart, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { addVolunteerSubmission } from "@/app/lib/adminStore";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", age: "", availability: "", skills: "", motivation: "" });
  const accent = "#22c55e";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addVolunteerSubmission({
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      skills: form.skills,
      availability: form.availability,
      motivation: form.motivation,
    });
    setSubmitted(true);
  }
  function update(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="absolute inset-0 -z-20">
        <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2000&q=80" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#050B18]/80" />
      <div className="mx-auto max-w-2xl">
        <Link href="/work-with-us" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-cyan-glow transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="glass rounded-3xl p-8 border border-border">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-8">
              <CheckCircle className="h-16 w-16" style={{ color: accent }} />
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Application Received!</h2>
              <p className="text-sm" style={{ color: "var(--muted-text)" }}>Thanks for volunteering! We'll reach out within 2–3 business days with next steps.</p>
              <Link href="/work-with-us" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: accent }}>Back</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-12 w-12 grid place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,#14532d,#22c55e,#4ade80)" }}>
                  <HandHeart className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Volunteer With Us</h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>Mentor students and support learning sessions on the ground</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: "name", label: "Your Full Name", type: "text", placeholder: "Full name" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { key: "city", label: "City / Location", type: "text", placeholder: "City, State" },
                  { key: "age", label: "Age", type: "number", placeholder: "Your age" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                    <input type={type} required placeholder={placeholder} value={form[key as keyof typeof form]}
                      onChange={(e) => update(key, e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Availability</label>
                  <select required value={form.availability} onChange={(e) => update("availability", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select availability</option>
                    <option>Weekdays</option>
                    <option>Weekends</option>
                    <option>Both</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Skills / Areas of Expertise</label>
                  <input type="text" placeholder="e.g. Teaching, Tech, Design" value={form.skills}
                    onChange={(e) => update("skills", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Why do you want to volunteer?</label>
                  <textarea rows={3} placeholder="Tell us your motivation..." value={form.motivation}
                    onChange={(e) => update("motivation", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <button type="submit" className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition"
                  style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}66` }}>
                  Join as Volunteer
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
