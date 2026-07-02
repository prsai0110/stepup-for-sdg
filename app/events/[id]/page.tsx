"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import { EVENTS } from "@/app/components/events/eventsData";
import { MapPin, CalendarDays, Tag, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find((e) => e.id === id);
  if (!event) return notFound();

  return <EventDetail event={event} />;
}

function EventDetail({ event }: { event: (typeof EVENTS)[0] }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", role: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-cyan-glow transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left — Event Details */}
          <div>
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={event.image} alt={event.title} className="w-full aspect-video object-cover" />
            </div>

            <div className="mt-6">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: event.accent }}>
                {event.category}
              </span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
                {event.title}
              </h1>

              <div className="mt-5 flex flex-col gap-3 text-sm" style={{ color: "var(--muted-text)" }}>
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" style={{ color: event.accent }} />
                  {event.fullDate}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: event.accent }} />
                  {event.location}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" style={{ color: event.accent }} />
                  {event.tags.join(" · ")}
                </span>
              </div>

              <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--muted-text)" }}>
                {event.description}
              </p>

              {/* What to expect */}
              <div className="mt-8 glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>What to Expect</h3>
                <ul className="space-y-3 text-sm" style={{ color: "var(--muted-text)" }}>
                  {event.whatToExpect.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: event.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — Registration Form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-3xl p-8 border border-border">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <CheckCircle className="h-16 w-16" style={{ color: event.accent }} />
                  <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>You're Registered!</h2>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                    Thank you for registering for <strong>{event.title}</strong>. We'll send confirmation details to your email.
                  </p>
                  <Link href="/events" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110" style={{ backgroundColor: event.accent }}>
                    Browse More Events
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Register Now</h2>
                  <p className="text-sm mb-6" style={{ color: "var(--muted-text)" }}>Secure your spot for {event.title}</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                      { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                      { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                      { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                      { key: "org", label: "Organization / School", type: "text", placeholder: "Your organization name" },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                        <input
                          type={type}
                          required
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition"
                          style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = event.accent)}
                          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Your Role</label>
                      <select
                        required
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition"
                        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                      >
                        <option value="">Select your role</option>
                        <option>Student</option>
                        <option>Teacher / Educator</option>
                        <option>NGO Representative</option>
                        <option>Corporate / CSR</option>
                        <option>Volunteer</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white transition hover:brightness-110 shadow-lg"
                      style={{ backgroundColor: event.accent, boxShadow: `0 0 24px ${event.accent}66` }}
                    >
                      Confirm Registration
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
