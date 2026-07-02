"use client";
import { useState } from "react";
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { addPartnershipSubmission } from "@/app/lib/adminStore";

export default function SchoolPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    schoolName: "",
    type: "",
    board: "",
    contact: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    state: "",
    students: "",
    support: "",
    message: "",
  });

  const accent = "#00A8A8";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addPartnershipSubmission({
      fullName: form.contact,
      organization: form.schoolName,
      email: form.email,
      type: 'SCHOOL',
      message: `Type: ${form.type} | Board: ${form.board} | Students: ${form.students} | Support: ${form.support} | ${form.message}`,
    });
    setSubmitted(true);
  }
  function update(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  const inputStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
  };

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#050B18]/85" />

      <div className="mx-auto max-w-2xl">
        <Link href="/work-with-us" className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-cyan-glow transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="glass rounded-3xl p-8 border border-border">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <CheckCircle className="h-16 w-16" style={{ color: accent }} />
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Registration Received!</h2>
              <p className="text-sm max-w-sm" style={{ color: "var(--muted-text)" }}>
                Thank you! Our team will review your school registration and get in touch within 3–5 business days.
              </p>
              <Link href="/work-with-us" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ backgroundColor: accent }}>
                Go Back
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-12 w-12 grid place-items-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg,#004d4d,#00A8A8,#00C2FF)" }}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Join as a School</h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                    Access digital tools, infrastructure support and quality learning programs
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* School Info */}
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>School Information</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>School / University / College Name</label>
                    <input type="text" required placeholder="Full institution name" value={form.schoolName}
                      onChange={(e) => update("schoolName", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Institution Type</label>
                    <select required value={form.type} onChange={(e) => update("type", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                      <option value="">Select type</option>
                      <option>Primary School</option>
                      <option>Secondary School</option>
                      <option>Higher Secondary</option>
                      <option>College</option>
                      <option>University</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Board / Affiliation</label>
                    <select required value={form.board} onChange={(e) => update("board", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                      <option value="">Select board</option>
                      <option>CBSE</option>
                      <option>ICSE</option>
                      <option>State Board</option>
                      <option>IB</option>
                      <option>University Affiliated</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>City</label>
                    <input type="text" required placeholder="City" value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>State</label>
                    <input type="text" required placeholder="State" value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Total Students</label>
                    <select required value={form.students} onChange={(e) => update("students", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                      <option value="">Select range</option>
                      <option>Less than 200</option>
                      <option>200 – 500</option>
                      <option>500 – 1,000</option>
                      <option>1,000 – 5,000</option>
                      <option>5,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Website (optional)</label>
                    <input type="url" placeholder="https://yourschool.edu" value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = accent)}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                  </div>
                </div>

                {/* Contact Info */}
                <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: accent }}>Contact Person</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "contact", label: "Full Name", type: "text", placeholder: "Full name" },
                    { key: "designation", label: "Designation", type: "text", placeholder: "e.g. Principal, Dean" },
                    { key: "email", label: "Official Email", type: "email", placeholder: "principal@school.edu" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                      <input type={type} required placeholder={placeholder} value={form[key as keyof typeof form]}
                        onChange={(e) => update(key, e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = accent)}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                    </div>
                  ))}
                </div>

                {/* Support Needed */}
                <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: accent }}>Support Needed</p>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>What support are you looking for?</label>
                  <select required value={form.support} onChange={(e) => update("support", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle}>
                    <option value="">Select support type</option>
                    <option>Digital Tools & Technology</option>
                    <option>Infrastructure Support</option>
                    <option>Teacher Training</option>
                    <option>Learning Materials</option>
                    <option>SDG Curriculum Integration</option>
                    <option>Funding / Scholarships</option>
                    <option>All of the above</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Additional Message</label>
                  <textarea rows={3} placeholder="Tell us more about your school's needs and goals..."
                    value={form.message} onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <button type="submit" className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition"
                  style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}66` }}>
                  Submit Registration
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
