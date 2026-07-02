"use client";
import { useState } from "react";
import { CalendarPlus, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { addEventRequest } from "@/app/lib/adminStore";

export default function HostEventPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", eventType: "", location: "", date: "", audience: "", details: "" });
  const accent = "#0066cc";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addEventRequest({
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      organization: form.org,
      eventType: form.eventType,
      location: form.location,
      audience: form.audience,
      details: form.details,
    });
    setSubmitted(true);
  }
  function update(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#050B18]/80" />
      <div className="mx-auto max-w-2xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-cyan-glow transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Link>

        <div className="glass rounded-3xl p-8 border border-border">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-8">
              <CheckCircle className="h-16 w-16" style={{ color: accent }} />
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Request Submitted!</h2>
              <p className="text-sm" style={{ color: "var(--muted-text)" }}>Thank you! Our team will review your event request and get back to you within 2–3 business days.</p>
              <Link href="/events" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: accent }}>Back to Events</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-12 w-12 grid place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,#1f3a5f,#0066cc,#00a8a8)" }}>
                  <CalendarPlus className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Host an SDG Event</h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>Bring an education drive or workshop to your school or community</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: "name", label: "Your Full Name", type: "text", placeholder: "Full name" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { key: "org", label: "School / Organization", type: "text", placeholder: "Name of your school or org" },
                  { key: "location", label: "Event Location", type: "text", placeholder: "City, State" },
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
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Type of Event</label>
                  <select required value={form.eventType} onChange={(e) => update("eventType", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select event type</option>
                    <option>School Drive</option>
                    <option>Workshop</option>
                    <option>Awareness Campaign</option>
                    <option>Community Outreach</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Expected Audience Size</label>
                  <select required value={form.audience} onChange={(e) => update("audience", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <option value="">Select size</option>
                    <option>Less than 50</option>
                    <option>50 – 100</option>
                    <option>100 – 500</option>
                    <option>500+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Additional Details</label>
                  <textarea rows={3} placeholder="Tell us more about the event you want to host..." value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <button type="submit" className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition"
                  style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}66` }}>
                  Submit Event Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
