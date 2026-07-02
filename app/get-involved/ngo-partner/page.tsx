"use client";
import { useState } from "react";
import { Building2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { addPartnershipSubmission } from "@/app/lib/adminStore";

export default function NgoPartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ org: "", contact: "", email: "", phone: "", website: "", state: "", focus: "", size: "", proposal: "" });
  const accent = "#3b82f6";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addPartnershipSubmission({
      fullName: form.contact,
      organization: form.org,
      email: form.email,
      type: "NGO",
      message: form.proposal,
    });
    setSubmitted(true);
  }
  function update(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
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
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Partnership Request Sent!</h2>
              <p className="text-sm" style={{ color: "var(--muted-text)" }}>Thank you! Our partnerships team will review your submission and contact you within 3–5 business days.</p>
              <Link href="/work-with-us" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: accent }}>Back</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-12 w-12 grid place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,#1e3a8a,#3b82f6,#60a5fa)" }}>
                  <Building2 className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Partner as NGO</h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>Collaborate, share resources, and scale rural school support</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: "org", label: "Organization Name", type: "text", placeholder: "Your NGO name" },
                  { key: "contact", label: "Contact Person", type: "text", placeholder: "Full name" },
                  { key: "email", label: "Official Email", type: "email", placeholder: "contact@ngo.org" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { key: "website", label: "Website (optional)", type: "url", placeholder: "https://yourngo.org" },
                  { key: "state", label: "State / Region of Operation", type: "text", placeholder: "State, Country" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                    <input type={type} required={key !== "website"} placeholder={placeholder} value={form[key as keyof typeof form]}
                      onChange={(e) => update(key, e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Primary Focus Area</label>
                  <select required value={form.focus} onChange={(e) => update("focus", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select focus area</option>
                    <option>Education</option>
                    <option>Health</option>
                    <option>Environment</option>
                    <option>Women Empowerment</option>
                    <option>Livelihood</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Organization Size</label>
                  <select required value={form.size} onChange={(e) => update("size", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select size</option>
                    <option>1–10 members</option>
                    <option>11–50 members</option>
                    <option>51–200 members</option>
                    <option>200+ members</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Partnership Proposal</label>
                  <textarea rows={3} required placeholder="Describe how you'd like to collaborate..." value={form.proposal}
                    onChange={(e) => update("proposal", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <button type="submit" className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition"
                  style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}66` }}>
                  Become a Partner
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
