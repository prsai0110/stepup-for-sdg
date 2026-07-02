"use client";
import { useState } from "react";
import { Building2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { addPartnershipSubmission } from "@/app/lib/adminStore";

export default function CorporateCSRFundsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    industry: "",
    contact: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    csrBudget: "",
    fundingArea: "",
    region: "",
    duration: "",
    sdg: "",
    message: "",
  });

  const accent = "#155DFC";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addPartnershipSubmission({
      fullName: form.contact,
      organization: form.company,
      email: form.email,
      type: 'COMPANY',
      message: `CSR Budget: ${form.csrBudget} | SDG: ${form.sdg} | Area: ${form.fundingArea} | ${form.message}`,
    });
    setSubmitted(true);
  }
  function update(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  const inputStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
  };

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80"
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
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                CSR Fund Application Received!
              </h2>
              <p className="text-sm max-w-sm" style={{ color: "var(--muted-text)" }}>
                Thank you! Our corporate partnerships team will review your application and reach out within 3–5 business days.
              </p>
              <Link href="/work-with-us" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ backgroundColor: accent }}>
                Back
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="h-12 w-12 grid place-items-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg,#0a2a7a,#155DFC,#00C2FF)" }}
                >
                  <Building2 className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                    Corporate CSR Funds
                  </h1>
                  <p className="text-sm" style={{ color: "var(--muted-text)" }}>
                    Apply to fund transparent, measurable education programs
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Company Info */}
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                  Company Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "company", label: "Company Name", type: "text", placeholder: "Your company name" },
                    { key: "industry", label: "Industry / Sector", type: "text", placeholder: "e.g. Technology, FMCG" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                      <input type={type} required placeholder={placeholder} value={form[key as keyof typeof form]}
                        onChange={(e) => update(key, e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = accent)}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Website (optional)</label>
                  <input type="url" placeholder="https://yourcompany.com" value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                {/* Contact Info */}
                <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: accent }}>
                  Contact Person
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "contact", label: "Full Name", type: "text", placeholder: "Full name" },
                    { key: "designation", label: "Designation", type: "text", placeholder: "e.g. CSR Head" },
                    { key: "email", label: "Official Email", type: "email", placeholder: "csr@company.com" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{label}</label>
                      <input type={type} required placeholder={placeholder} value={form[key as keyof typeof form]}
                        onChange={(e) => update(key, e.target.value)}
                        className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = accent)}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                    </div>
                  ))}
                </div>

                {/* Fund Details */}
                <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: accent }}>
                  CSR Fund Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Annual CSR Budget</label>
                    <select required value={form.csrBudget} onChange={(e) => update("csrBudget", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={inputStyle}>
                      <option value="">Select range</option>
                      <option>₹50,000 – ₹1,00,000</option>
                      <option>₹1,00,000 – ₹5,00,000</option>
                      <option>₹5,00,000 – ₹25,00,000</option>
                      <option>₹25,00,000 – ₹1 Crore</option>
                      <option>Above ₹1 Crore</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Funding Duration</label>
                    <select required value={form.duration} onChange={(e) => update("duration", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={inputStyle}>
                      <option value="">Select duration</option>
                      <option>One-time</option>
                      <option>6 Months</option>
                      <option>1 Year</option>
                      <option>2 Years</option>
                      <option>3+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Primary Funding Area</label>
                    <select required value={form.fundingArea} onChange={(e) => update("fundingArea", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={inputStyle}>
                      <option value="">Select area</option>
                      <option>Digital Infrastructure</option>
                      <option>Teacher Training</option>
                      <option>Scholarships</option>
                      <option>School Construction</option>
                      <option>Learning Materials</option>
                      <option>STEM Programs</option>
                      <option>Girl Child Education</option>
                      <option>Rural Outreach</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Target Region</label>
                    <select required value={form.region} onChange={(e) => update("region", e.target.value)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={inputStyle}>
                      <option value="">Select region</option>
                      <option>Pan India</option>
                      <option>North India</option>
                      <option>South India</option>
                      <option>East India</option>
                      <option>West India</option>
                      <option>Northeast India</option>
                      <option>South Asia</option>
                      <option>Africa</option>
                      <option>Global</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Preferred SDG Focus</label>
                  <select required value={form.sdg} onChange={(e) => update("sdg", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={inputStyle}>
                    <option value="">Select SDG</option>
                    <option>SDG 4 – Quality Education</option>
                    <option>SDG 5 – Gender Equality</option>
                    <option>SDG 1 – No Poverty</option>
                    <option>SDG 10 – Reduced Inequalities</option>
                    <option>SDG 17 – Partnerships for Goals</option>
                    <option>No Preference</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>Additional Notes</label>
                  <textarea rows={3} placeholder="Describe your CSR goals, expected outcomes, or any specific requirements..."
                    value={form.message} onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = accent)}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full py-3 text-sm font-bold text-white hover:brightness-110 transition"
                  style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}66` }}
                >
                  Submit CSR Fund Application
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
