"use client";

import { useState, useMemo } from "react";
import { EVENTS } from "@/app/components/events/eventsData";
import { useDashboardTheme } from "../ThemeContext";

// ── Types ──────────────────────────────────────────────────────────────────────

interface TicketTier {
  name: string;
  price: number;
}

interface Coordinator {
  name: string;
  email: string;
  phone: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  schoolOrg: string;
  sdgFocus: string;
  registeredDate: string;
}

interface SDGEvent {
  id: string;
  title: string;
  sdgTag: string;
  sdgColor: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: "online" | "offline";
  participantCount: number;
  bannerColor: string;
  ticket: TicketTier;
  coordinator: Coordinator;
  participants: Participant[];
}

export interface PendingEventRequest {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  form: typeof EMPTY_FORM;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const SDG_OPTIONS = [
  { label: "SDG 1 – No Poverty", color: "#E5243B" },
  { label: "SDG 2 – Zero Hunger", color: "#DDA63A" },
  { label: "SDG 3 – Good Health", color: "#4C9F38" },
  { label: "SDG 4 – Quality Education", color: "#C5192D" },
  { label: "SDG 5 – Gender Equality", color: "#FF3A21" },
  { label: "SDG 6 – Clean Water", color: "#26BDE2" },
  { label: "SDG 7 – Affordable Energy", color: "#FCC30B" },
  { label: "SDG 8 – Decent Work", color: "#A21942" },
  { label: "SDG 9 – Industry & Innovation", color: "#FD6925" },
  { label: "SDG 10 – Reduced Inequalities", color: "#DD1367" },
  { label: "SDG 11 – Sustainable Cities", color: "#FD9D24" },
  { label: "SDG 12 – Responsible Consumption", color: "#BF8B2E" },
  { label: "SDG 13 – Climate Action", color: "#3F7E44" },
  { label: "SDG 14 – Life Below Water", color: "#0A97D9" },
  { label: "SDG 15 – Life on Land", color: "#56C02B" },
  { label: "SDG 16 – Peace & Justice", color: "#00689D" },
  { label: "SDG 17 – Partnerships", color: "#19486A" },
];

const MOCK_EVENTS: SDGEvent[] = [
  {
    id: "1",
    title: "Climate Action Summit 2025",
    sdgTag: "SDG 13 – Climate Action",
    sdgColor: "#3F7E44",
    description: "A gathering of youth leaders to tackle climate challenges through innovation and community-led solutions.",
    date: "2025-08-14",
    time: "09:00",
    venue: "Hyderabad International Convention Centre",
    type: "offline",
    participantCount: 342,
    bannerColor: "#3F7E44",
    ticket: { name: "General Admission", price: 500 },
    coordinator: { name: "Priya Reddy", email: "priya@sdghyd.org", phone: "+91 98765 43210" },
    participants: [
      { id: "P001", name: "Arjun Sharma", email: "arjun@example.com", phone: "+91 90000 11111", schoolOrg: "IIT Hyderabad", sdgFocus: "SDG 13", registeredDate: "2025-07-01" },
      { id: "P002", name: "Sneha Rao", email: "sneha@example.com", phone: "+91 90000 22222", schoolOrg: "NALSAR University", sdgFocus: "SDG 13", registeredDate: "2025-07-03" },
      { id: "P003", name: "Vikram Nair", email: "vikram@example.com", phone: "+91 90000 33333", schoolOrg: "BITS Pilani (Hyd)", sdgFocus: "SDG 11", registeredDate: "2025-07-05" },
    ],
  },
  {
    id: "2",
    title: "Zero Hunger Hackathon",
    sdgTag: "SDG 2 – Zero Hunger",
    sdgColor: "#DDA63A",
    description: "48-hour hackathon to design technology-driven solutions addressing food insecurity across urban and rural India.",
    date: "2025-09-06",
    time: "08:00",
    venue: "T-Hub, Hyderabad",
    type: "offline",
    participantCount: 210,
    bannerColor: "#DDA63A",
    ticket: { name: "Team Pass (4 members)", price: 0 },
    coordinator: { name: "Mohammed Irfan", email: "irfan@sdghyd.org", phone: "+91 98765 00001" },
    participants: [
      { id: "P004", name: "Divya Kapoor", email: "divya@example.com", phone: "+91 80000 44444", schoolOrg: "IIIT Hyderabad", sdgFocus: "SDG 2", registeredDate: "2025-08-10" },
    ],
  },
  {
    id: "3",
    title: "Quality Education Webinar Series",
    sdgTag: "SDG 4 – Quality Education",
    sdgColor: "#C5192D",
    description: "Monthly online sessions connecting educators and policymakers to reimagine inclusive learning for every child.",
    date: "2025-10-02",
    time: "14:00",
    venue: "Online (Zoom)",
    type: "online",
    participantCount: 580,
    bannerColor: "#C5192D",
    ticket: { name: "Free Registration", price: 0 },
    coordinator: { name: "Lakshmi Prasad", email: "lakshmi@sdghyd.org", phone: "+91 98765 00002" },
    participants: [
      { id: "P005", name: "Rahul Gupta", email: "rahul@example.com", phone: "+91 70000 55555", schoolOrg: "Hyderabad Public School", sdgFocus: "SDG 4", registeredDate: "2025-09-15" },
      { id: "P006", name: "Ananya Singh", email: "ananya@example.com", phone: "+91 70000 66666", schoolOrg: "Osmania University", sdgFocus: "SDG 4", registeredDate: "2025-09-16" },
    ],
  },
  {
    id: "4",
    title: "Clean Water Innovation Fair",
    sdgTag: "SDG 6 – Clean Water",
    sdgColor: "#26BDE2",
    description: "An exhibition showcasing student-led prototypes tackling water purification and sanitation challenges in Telangana.",
    date: "2025-11-18",
    time: "10:00",
    venue: "Nehru Zoological Park Grounds",
    type: "offline",
    participantCount: 128,
    bannerColor: "#26BDE2",
    ticket: { name: "Student Pass", price: 200 },
    coordinator: { name: "Suresh Babu", email: "suresh@sdghyd.org", phone: "+91 98765 00003" },
    participants: [],
  },
  {
    id: "5",
    title: "Gender Equality Forum",
    sdgTag: "SDG 5 – Gender Equality",
    sdgColor: "#FF3A21",
    description: "Panel discussions and workshops on dismantling systemic barriers facing women and gender minorities in STEM and policy.",
    date: "2025-12-05",
    time: "11:00",
    venue: "Shilpakala Vedika",
    type: "offline",
    participantCount: 275,
    bannerColor: "#FF3A21",
    ticket: { name: "General", price: 300 },
    coordinator: { name: "Kavitha Murali", email: "kavitha@sdghyd.org", phone: "+91 98765 00004" },
    participants: [],
  },
  {
    id: "6",
    title: "Sustainable Cities Workshop",
    sdgTag: "SDG 11 – Sustainable Cities",
    sdgColor: "#FD9D24",
    description: "Urban planners, architects, and youth delegates co-design sustainable neighbourhood blueprints for Hyderabad 2040.",
    date: "2026-01-20",
    time: "09:30",
    venue: "HMDA Metro Training Centre",
    type: "offline",
    participantCount: 96,
    bannerColor: "#FD9D24",
    ticket: { name: "Workshop Pass", price: 750 },
    coordinator: { name: "Ravi Teja", email: "ravi@sdghyd.org", phone: "+91 98765 00005" },
    participants: [],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span
      style={{
        background: hexToRgba(color, 0.15),
        color,
        border: `1px solid ${hexToRgba(color, 0.4)}`,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function IconButton({
  onClick,
  title,
  children,
  danger,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "5px 7px",
        borderRadius: 6,
        color: danger ? "#ef4444" : "var(--icon-btn-color)",
        display: "flex",
        alignItems: "center",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background = danger
          ? "rgba(239,68,68,0.1)"
          : "var(--icon-btn-hover)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background = "none")
      }
    >
      {children}
    </button>
  );
}

// ── Event Card ─────────────────────────────────────────────────────────────────

function EventCard({
  event,
  onView,
  onEdit,
  onDelete,
}: {
  event: SDGEvent;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="sdg-card">
      {/* Banner */}
      <div
        className="sdg-card-banner"
        style={{ background: `linear-gradient(135deg, ${event.bannerColor} 0%, ${hexToRgba(event.bannerColor, 0.7)} 100%)` }}
      >
        <span className="sdg-card-banner-title">{event.title}</span>
        <span className="sdg-card-type-pill">{event.type === "online" ? "🌐 Online" : "📍 Offline"}</span>
      </div>

      {/* Body */}
      <div className="sdg-card-body">
        <div style={{ marginBottom: 8 }}>
          <Badge color={event.sdgColor} label={event.sdgTag} />
        </div>
        <p className="sdg-card-desc">{event.description}</p>

        <div className="sdg-card-meta">
          <span>{formatDate(event.date)} · {event.time}</span>
          <span>{event.venue}</span>
          <span>{event.participantCount.toLocaleString()} participants</span>
        </div>
      </div>

      {/* Footer */}
      <div className="sdg-card-footer">
        <button className="sdg-view-btn" onClick={onView}>
          View Details
        </button>
        <div style={{ display: "flex", gap: 2 }}>
          <IconButton onClick={onEdit} title="Edit event">
            {/* Pencil */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </IconButton>
          <IconButton onClick={onDelete} title="Delete event" danger>
            {/* Trash */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

// ── Detail Panel ───────────────────────────────────────────────────────────────

function DetailPanel({ event, onClose }: { event: SDGEvent; onClose: () => void }) {
  return (
    <div className="sdg-detail-overlay" onClick={onClose}>
      <div className="sdg-detail-panel" onClick={(e) => e.stopPropagation()}>
        {/* Panel header banner */}
        <div
          className="sdg-detail-banner"
          style={{
            background: `linear-gradient(135deg, ${event.bannerColor} 0%, ${hexToRgba(event.bannerColor, 0.6)} 100%)`,
          }}
        >
          <div>
            <h2 className="sdg-detail-title">{event.title}</h2>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <Badge color="#ffffff" label={event.sdgTag} />
              <Badge color="#ffffff" label={event.type === "online" ? "🌐 Online" : "📍 Offline"} />
            </div>
          </div>
          <button className="sdg-detail-close" onClick={onClose}>✕</button>
        </div>

        <div className="sdg-detail-content">
          {/* Overview */}
          <section className="sdg-detail-section">
            <h3 className="sdg-detail-section-title">Event Overview</h3>
            <div className="sdg-detail-grid">
              <div className="sdg-detail-field">
                <span className="sdg-detail-label">Date & Time</span>
                <span className="sdg-detail-value">{formatDate(event.date)} · {event.time}</span>
              </div>
              <div className="sdg-detail-field">
                <span className="sdg-detail-label">Venue</span>
                <span className="sdg-detail-value">{event.venue}</span>
              </div>
              <div className="sdg-detail-field">
                <span className="sdg-detail-label">Participants</span>
                <span className="sdg-detail-value">{event.participantCount.toLocaleString()}</span>
              </div>
              <div className="sdg-detail-field">
                <span className="sdg-detail-label">SDG Focus</span>
                <span className="sdg-detail-value">{event.sdgTag}</span>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="sdg-detail-section">
            <h3 className="sdg-detail-section-title">Description</h3>
            <p className="sdg-detail-desc">{event.description}</p>
          </section>

          {/* Ticket */}
          <section className="sdg-detail-section">
            <h3 className="sdg-detail-section-title">Ticket Tier</h3>
            <div
              className="sdg-ticket-card"
              style={{ borderLeft: `4px solid ${event.sdgColor}` }}
            >
              <span className="sdg-ticket-name">{event.ticket.name}</span>
              <span className="sdg-ticket-price" style={{ color: event.sdgColor }}>
                {event.ticket.price === 0 ? "Free" : `₹${event.ticket.price}`}
              </span>
            </div>
          </section>

          {/* Coordinator */}
          <section className="sdg-detail-section">
            <h3 className="sdg-detail-section-title">Coordinator</h3>
            <div className="sdg-coordinator-card">
              <div
                className="sdg-coordinator-avatar"
                style={{ background: hexToRgba(event.sdgColor, 0.2), color: event.sdgColor }}
              >
                {event.coordinator.name.charAt(0)}
              </div>
              <div>
                <p className="sdg-coordinator-name">{event.coordinator.name}</p>
                <p className="sdg-coordinator-meta">{event.coordinator.email}</p>
                <p className="sdg-coordinator-meta">{event.coordinator.phone}</p>
              </div>
            </div>
          </section>

          {/* Participants table */}
          <section className="sdg-detail-section">
            <h3 className="sdg-detail-section-title">
              Registered Participants{" "}
              <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.6 }}>
                ({event.participants.length} shown)
              </span>
            </h3>
            {event.participants.length === 0 ? (
              <p style={{ opacity: 0.5, fontSize: 14 }}>No participants registered yet.</p>
            ) : (
              <div className="sdg-table-wrapper">
                <table className="sdg-table">
                  <thead>
                    <tr>
                      {["ID", "Name", "Email", "Phone", "School / Org", "SDG Focus", "Registered"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {event.participants.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.phone}</td>
                        <td>{p.schoolOrg}</td>
                        <td>
                          <Badge
                            color={SDG_OPTIONS.find((s) => s.label.startsWith(p.sdgFocus))?.color ?? "#666"}
                            label={p.sdgFocus}
                          />
                        </td>
                        <td>{formatDate(p.registeredDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// ── Create / Edit Modal ────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "",
  sdgTag: SDG_OPTIONS[0].label,
  date: "",
  time: "",
  venue: "",
  type: "offline" as "online" | "offline",
  description: "",
  ticketName: "",
  ticketPrice: "",
  coordinatorName: "",
  coordinatorEmail: "",
  coordinatorPhone: "",
};

function EventModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: SDGEvent;
  onSave: (data: typeof EMPTY_FORM) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<typeof EMPTY_FORM>(
    initial
      ? {
          title: initial.title,
          sdgTag: initial.sdgTag,
          date: initial.date,
          time: initial.time,
          venue: initial.venue,
          type: initial.type,
          description: initial.description,
          ticketName: initial.ticket.name,
          ticketPrice: String(initial.ticket.price),
          coordinatorName: initial.coordinator.name,
          coordinatorEmail: initial.coordinator.email,
          coordinatorPhone: initial.coordinator.phone,
        }
      : { ...EMPTY_FORM }
  );

  const set = (k: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="sdg-detail-overlay" onClick={onClose}>
      <div className="sdg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sdg-modal-header">
          <h2>{initial ? "Edit Event" : "Create New Event"}</h2>
          <button className="sdg-detail-close" onClick={onClose}>✕</button>
        </div>

        <div className="sdg-modal-body">
          <div className="sdg-form-grid">
            <div className="sdg-form-field sdg-span-2">
              <label>Event Title *</label>
              <input placeholder="e.g. Climate Action Summit 2025" value={form.title} onChange={set("title")} />
            </div>

            <div className="sdg-form-field">
              <label>SDG Focus *</label>
              <select value={form.sdgTag} onChange={set("sdgTag")}>
                {SDG_OPTIONS.map((s) => (
                  <option key={s.label}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="sdg-form-field">
              <label>Event Type</label>
              <select value={form.type} onChange={set("type")}>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="sdg-form-field">
              <label>Date *</label>
              <input type="date" value={form.date} onChange={set("date")} />
            </div>

            <div className="sdg-form-field">
              <label>Time *</label>
              <input type="time" value={form.time} onChange={set("time")} />
            </div>

            <div className="sdg-form-field sdg-span-2">
              <label>Venue *</label>
              <input placeholder="e.g. HICC, Hyderabad" value={form.venue} onChange={set("venue")} />
            </div>

            <div className="sdg-form-field sdg-span-2">
              <label>Description</label>
              <textarea rows={3} placeholder="What is this event about?" value={form.description} onChange={set("description")} />
            </div>

            <div className="sdg-form-field sdg-span-2 sdg-section-label">
              <span>Ticket</span>
            </div>

            <div className="sdg-form-field">
              <label>Ticket Name</label>
              <input placeholder="e.g. General Admission" value={form.ticketName} onChange={set("ticketName")} />
            </div>

            <div className="sdg-form-field">
              <label>Price (₹)</label>
              <input type="number" placeholder="0 for free" value={form.ticketPrice} onChange={set("ticketPrice")} />
            </div>

            <div className="sdg-form-field sdg-span-2 sdg-section-label">
              <span>Coordinator</span>
            </div>

            <div className="sdg-form-field sdg-span-2">
              <label>Full Name *</label>
              <input placeholder="Coordinator's name" value={form.coordinatorName} onChange={set("coordinatorName")} />
            </div>

            <div className="sdg-form-field">
              <label>Email *</label>
              <input type="email" placeholder="coordinator@org.com" value={form.coordinatorEmail} onChange={set("coordinatorEmail")} />
            </div>

            <div className="sdg-form-field">
              <label>Phone</label>
              <input placeholder="+91 98765 43210" value={form.coordinatorPhone} onChange={set("coordinatorPhone")} />
            </div>
          </div>
        </div>

        <div className="sdg-modal-footer">
          <button className="sdg-cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="sdg-save-btn"
            onClick={() => {
              if (!form.title || !form.date || !form.venue || !form.coordinatorName) {
                alert("Please fill all required (*) fields.");
                return;
              }
              onSave(form);
            }}
          >
            {initial ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Mock Pending Requests ─────────────────────────────────────────────────────

const MOCK_PENDING = [
  { id: 'PR001', submittedAt: '2025-07-10T08:30:00Z', form: { title: 'SDG Youth Summit 2025', sdgTag: 'SDG 4 – Quality Education', type: 'offline' as const, date: '2025-09-20', time: '10:00', venue: 'Jawaharlal Nehru Stadium, Delhi', description: 'Annual youth summit focused on quality education reforms.', ticketName: 'Student Pass', ticketPrice: '250', coordinatorName: 'Neha Verma', coordinatorEmail: 'neha@sdgyouth.org', coordinatorPhone: '+91 98001 11111' } },
  { id: 'PR002', submittedAt: '2025-07-12T11:15:00Z', form: { title: 'Green Energy Expo', sdgTag: 'SDG 7 – Affordable Energy', type: 'offline' as const, date: '2025-10-05', time: '09:00', venue: 'Pragati Maidan, New Delhi', description: 'Showcasing renewable energy innovations by student teams.', ticketName: 'General', ticketPrice: '0', coordinatorName: 'Amit Sinha', coordinatorEmail: 'amit@greenexpo.in', coordinatorPhone: '+91 98002 22222' } },
  { id: 'PR003', submittedAt: '2025-07-15T14:00:00Z', form: { title: 'No Poverty Awareness Walk', sdgTag: 'SDG 1 – No Poverty', type: 'offline' as const, date: '2025-08-30', time: '07:00', venue: 'Hussain Sagar Lake, Hyderabad', description: 'Community walk raising awareness about poverty eradication.', ticketName: 'Free', ticketPrice: '0', coordinatorName: 'Sunita Rao', coordinatorEmail: 'sunita@sdghyd.org', coordinatorPhone: '+91 98003 33333' } },
];

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const { dark } = useDashboardTheme();

  const [events, setEvents] = useState<SDGEvent[]>(MOCK_EVENTS);
  const [search, setSearch] = useState("");
  const [viewEvent, setViewEvent] = useState<SDGEvent | null>(null);
  const [editEvent, setEditEvent] = useState<SDGEvent | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [activeTab, setActiveTab] = useState<'events'|'pending'>('events');

  const [pendingRequests, setPendingRequests] = useState<any[]>(() => {
    if (typeof window === 'undefined') return MOCK_PENDING;
    // merge localStorage event requests from the public host-event form
    const stored = localStorage.getItem('sdg_pending_events');
    const adminStoreRaw = localStorage.getItem('stepup_event_requests');
    const adminRequests: any[] = adminStoreRaw ? JSON.parse(adminStoreRaw).map((r: any) => ({
      id: String(r.id),
      submittedAt: r.submittedAt,
      form: {
        title: `${r.eventType} — ${r.organization}`,
        sdgTag: SDG_OPTIONS[0].label,
        type: 'offline' as const,
        date: '',
        time: '',
        venue: r.location,
        description: r.details,
        ticketName: 'Free',
        ticketPrice: '0',
        coordinatorName: r.fullName,
        coordinatorEmail: r.email,
        coordinatorPhone: r.phone,
      }
    })) : [];
    if (stored === null) {
      const merged = [...MOCK_PENDING, ...adminRequests];
      localStorage.setItem('sdg_pending_events', JSON.stringify(merged));
      return merged;
    }
    const parsed = JSON.parse(stored);
    const base = parsed.length > 0 ? parsed : MOCK_PENDING;
    // add any new admin store requests not already in the list
    const existingIds = new Set(base.map((r: any) => String(r.id)));
    const newOnes = adminRequests.filter((r: any) => !existingIds.has(String(r.id)));
    return [...newOnes, ...base];
  });

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.sdgTag.toLowerCase().includes(search.toLowerCase()) ||
          e.venue.toLowerCase().includes(search.toLowerCase())
      ),
    [events, search]
  );

  function handleCreate(form: typeof EMPTY_FORM) {
    const pending = JSON.parse(localStorage.getItem('sdg_pending_events') || '[]');
    pending.unshift({ id: String(Date.now()), submittedAt: new Date().toISOString(), form });
    localStorage.setItem('sdg_pending_events', JSON.stringify(pending));
    setPendingRequests(pending);
    setShowCreate(false);
    setActiveTab('pending');
  }

  function handleEdit(form: typeof EMPTY_FORM) {
    if (!editEvent) return;
    const sdgOption = SDG_OPTIONS.find((s) => s.label === form.sdgTag) ?? SDG_OPTIONS[0];
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editEvent.id
          ? {
              ...e,
              title: form.title,
              sdgTag: form.sdgTag,
              sdgColor: sdgOption.color,
              bannerColor: sdgOption.color,
              description: form.description,
              date: form.date,
              time: form.time,
              venue: form.venue,
              type: form.type,
              ticket: { name: form.ticketName, price: Number(form.ticketPrice) || 0 },
              coordinator: { name: form.coordinatorName, email: form.coordinatorEmail, phone: form.coordinatorPhone },
            }
          : e
      )
    );
    setEditEvent(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  function handleExport() {
    const rows = [
      ["Title", "SDG", "Date", "Time", "Venue", "Type", "Participants"],
      ...events.map((e) => [e.title, e.sdgTag, e.date, e.time, e.venue, e.type, String(e.participantCount)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sdg-events.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        .sdg-root {
          --sdg-bg: #f7f8fa;
          --sdg-card-bg: #ffffff;
          --sdg-card-border: #e5e7eb;
          --sdg-text: #111827;
          --sdg-text-muted: #6b7280;
          --sdg-input-bg: #ffffff;
          --sdg-input-border: #d1d5db;
          --sdg-overlay: rgba(0,0,0,0.45);
          --sdg-panel-bg: #ffffff;
          --sdg-table-head: #f3f4f6;
          --sdg-table-row-alt: #f9fafb;
          --sdg-table-border: #e5e7eb;
          --sdg-section-divider: #e5e7eb;
          --sdg-footer-bg: #f9fafb;
          --icon-btn-color: #374151;
          --icon-btn-hover: rgba(0,0,0,0.06);
          --sdg-search-bg: #ffffff;
        }
        .sdg-root.sdg-dark {
          --sdg-bg: transparent;
          --sdg-card-bg: #1a1d27;
          --sdg-card-border: rgba(255,255,255,0.07);
          --sdg-text: #f0f2f8;
          --sdg-text-muted: #8891aa;
          --sdg-input-bg: #1f2335;
          --sdg-input-border: rgba(255,255,255,0.1);
          --sdg-overlay: rgba(0,0,0,0.65);
          --sdg-panel-bg: #1a1d27;
          --sdg-table-head: #1f2335;
          --sdg-table-row-alt: #1f2335;
          --sdg-table-border: rgba(255,255,255,0.07);
          --sdg-section-divider: rgba(255,255,255,0.07);
          --sdg-footer-bg: #1f2335;
          --icon-btn-color: #8891aa;
          --icon-btn-hover: rgba(255,255,255,0.08);
          --sdg-search-bg: #1f2335;
        }

        .sdg-page { padding: 24px 28px; color: var(--sdg-text); min-height: 100vh; }

        /* Header */
        .sdg-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .sdg-header h1 { font-size: 22px; font-weight: 700; margin: 0; }
        .sdg-header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

        /* Search bar */
        .sdg-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
        .sdg-search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 400px; }
        .sdg-search-wrap svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.45; }
        .sdg-search-wrap input {
          width: 100%; padding: 8px 12px 8px 34px; border-radius: 8px;
          border: 1px solid var(--sdg-input-border); background: var(--sdg-search-bg);
          color: var(--sdg-text); font-size: 14px; outline: none;
        }
        .sdg-search-wrap input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .sdg-result-count { font-size: 13px; color: var(--sdg-text-muted); margin-left: auto; }

        /* Buttons */
        .sdg-btn-primary {
          background: #6366f1; color: #fff; border: none; border-radius: 8px;
          padding: 8px 16px; font-size: 14px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 6px; white-space: nowrap;
          transition: background 0.15s;
        }
        .sdg-btn-primary:hover { background: #4f46e5; }
        .sdg-btn-secondary {
          background: var(--sdg-card-bg); color: var(--sdg-text);
          border: 1px solid var(--sdg-card-border); border-radius: 8px;
          padding: 8px 16px; font-size: 14px; font-weight: 500; cursor: pointer;
          display: flex; align-items: center; gap: 6px; white-space: nowrap;
          transition: background 0.15s;
        }
        .sdg-btn-secondary:hover { background: var(--sdg-table-head); }

        /* Grid */
        .sdg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .sdg-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .sdg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px)  { .sdg-grid { grid-template-columns: 1fr; } }

        /* Card */
        .sdg-card {
          background: var(--sdg-card-bg);
          border: 1px solid var(--sdg-card-border);
          border-radius: 12px; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.07);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .sdg-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }
        .sdg-card-banner {
          padding: 18px 16px 14px; min-height: 80px;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative;
        }
        .sdg-card-banner-title { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.3; }
        .sdg-card-type-pill {
          margin-top: 8px; display: inline-block;
          background: rgba(255,255,255,0.2); color: #fff;
          border-radius: 20px; padding: 2px 10px; font-size: 11px; font-weight: 600; width: fit-content;
        }
        .sdg-card-body { padding: 14px 16px 10px; flex: 1; }
        .sdg-card-desc { font-size: 13px; color: var(--sdg-text-muted); margin: 8px 0 10px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .sdg-card-meta { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--sdg-text-muted); }
        .sdg-card-meta span { display: flex; align-items: center; gap: 4px; }
        .sdg-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px; border-top: 1px solid var(--sdg-card-border);
          background: var(--sdg-footer-bg);
        }
        .sdg-view-btn {
          font-size: 13px; font-weight: 600; color: #6366f1;
          background: rgba(99,102,241,0.08); border: none; cursor: pointer;
          padding: 5px 12px; border-radius: 6px; transition: background 0.15s;
        }
        .sdg-view-btn:hover { background: rgba(99,102,241,0.15); }

        /* Detail panel overlay */
        .sdg-detail-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: var(--sdg-overlay);
          display: flex; align-items: flex-start; justify-content: flex-end;
          overflow: hidden;
        }
        .sdg-detail-panel {
          width: min(680px, 100%); height: 100vh; overflow-y: auto;
          background: var(--sdg-panel-bg); display: flex; flex-direction: column;
          animation: slideIn 0.22s ease;
        }
        @keyframes slideIn { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .sdg-detail-banner {
          padding: 28px 24px 20px; display: flex;
          justify-content: space-between; align-items: flex-start; flex-shrink: 0;
        }
        .sdg-detail-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
        .sdg-detail-close {
          background: rgba(255,255,255,0.2); border: none; color: #fff;
          width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
          font-size: 14px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-left: 16px;
        }
        .sdg-detail-close:hover { background: rgba(255,255,255,0.35); }
        .sdg-detail-content { padding: 20px 24px 32px; flex: 1; }
        .sdg-detail-section { margin-bottom: 28px; }
        .sdg-detail-section-title {
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.07em; color: var(--sdg-text-muted);
          margin: 0 0 12px; padding-bottom: 8px;
          border-bottom: 1px solid var(--sdg-section-divider);
        }
        .sdg-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .sdg-detail-field { display: flex; flex-direction: column; gap: 3px; }
        .sdg-detail-label { font-size: 11px; font-weight: 600; color: var(--sdg-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .sdg-detail-value { font-size: 14px; font-weight: 500; color: var(--sdg-text); }
        .sdg-detail-desc { font-size: 14px; color: var(--sdg-text-muted); line-height: 1.7; margin: 0; }
        .sdg-ticket-card {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-radius: 8px;
          background: var(--sdg-table-head);
          border: 1px solid var(--sdg-card-border);
        }
        .sdg-ticket-name { font-size: 14px; font-weight: 500; color: var(--sdg-text); }
        .sdg-ticket-price { font-size: 18px; font-weight: 700; }
        .sdg-coordinator-card { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 8px; background: var(--sdg-table-head); border: 1px solid var(--sdg-card-border); }
        .sdg-coordinator-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0; }
        .sdg-coordinator-name { font-size: 15px; font-weight: 600; margin: 0 0 2px; color: var(--sdg-text); }
        .sdg-coordinator-meta { font-size: 13px; color: var(--sdg-text-muted); margin: 0; }

        /* Table */
        .sdg-table-wrapper { overflow-x: auto; border-radius: 8px; border: 1px solid var(--sdg-table-border); }
        .sdg-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .sdg-table th { background: var(--sdg-table-head); padding: 10px 14px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sdg-text-muted); white-space: nowrap; }
        .sdg-table td { padding: 10px 14px; border-top: 1px solid var(--sdg-table-border); color: var(--sdg-text); vertical-align: middle; }
        .sdg-table tr:nth-child(even) td { background: var(--sdg-table-row-alt); }

        /* Modal */
        .sdg-modal {
          width: min(600px, 96vw); max-height: 90vh; overflow-y: auto;
          background: var(--sdg-panel-bg); border-radius: 14px;
          margin: auto; display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          animation: fadeUp 0.2s ease;
        }
        @keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sdg-detail-overlay { align-items: center; justify-content: center; }
        /* Override for the slide panel when used with detail */
        .sdg-detail-overlay:has(.sdg-detail-panel) { align-items: flex-start; justify-content: flex-end; }
        .sdg-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 16px; border-bottom: 1px solid var(--sdg-section-divider);
        }
        .sdg-modal-header h2 { margin: 0; font-size: 17px; font-weight: 700; color: var(--sdg-text); }
        .sdg-modal-body { padding: 20px 24px; }
        .sdg-modal-footer {
          display: flex; align-items: center; justify-content: flex-end; gap: 10px;
          padding: 14px 24px; border-top: 1px solid var(--sdg-section-divider);
          background: var(--sdg-footer-bg);
        }
        .sdg-cancel-btn {
          background: none; border: 1px solid var(--sdg-input-border);
          color: var(--sdg-text); border-radius: 8px; padding: 8px 18px;
          font-size: 14px; cursor: pointer;
        }
        .sdg-cancel-btn:hover { background: var(--sdg-table-head); }
        .sdg-save-btn {
          background: #6366f1; color: #fff; border: none; border-radius: 8px;
          padding: 8px 20px; font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .sdg-save-btn:hover { background: #4f46e5; }

        /* Form */
        .sdg-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .sdg-form-field { display: flex; flex-direction: column; gap: 5px; }
        .sdg-form-field label { font-size: 12px; font-weight: 600; color: var(--sdg-text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
        .sdg-form-field input,
        .sdg-form-field select,
        .sdg-form-field textarea {
          background: var(--sdg-input-bg); border: 1px solid var(--sdg-input-border);
          border-radius: 7px; padding: 8px 10px; color: var(--sdg-text); font-size: 14px; outline: none;
          font-family: inherit; width: 100%; box-sizing: border-box;
        }
        .sdg-form-field input:focus,
        .sdg-form-field select:focus,
        .sdg-form-field textarea:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .sdg-span-2 { grid-column: span 2; }
        .sdg-section-label {
          grid-column: span 2; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--sdg-text-muted); padding: 8px 0 2px;
          border-bottom: 1px solid var(--sdg-section-divider);
        }

        /* Empty state */
        .sdg-empty { text-align: center; padding: 80px 20px; color: var(--sdg-text-muted); }
        .sdg-empty h3 { font-size: 16px; margin: 12px 0 6px; color: var(--sdg-text); }
        .sdg-empty p { font-size: 14px; margin: 0; }

        /* View toggle */
        .sdg-view-toggle { display: flex; align-items: center; background: var(--sdg-table-head); border: 1px solid var(--sdg-card-border); border-radius: 8px; padding: 3px; gap: 2px; }
        .sdg-view-toggle button { background: none; border: none; cursor: pointer; padding: 5px 8px; border-radius: 6px; color: var(--sdg-text-muted); display: flex; align-items: center; transition: all 0.15s; }
        .sdg-view-toggle button.active { background: var(--sdg-card-bg); color: var(--sdg-text); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

        /* Events table */
        .sdg-events-table-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid var(--sdg-table-border); }
        .sdg-events-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .sdg-events-table th { background: var(--sdg-table-head); padding: 11px 14px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sdg-text-muted); white-space: nowrap; }
        .sdg-events-table td { padding: 12px 14px; border-top: 1px solid var(--sdg-table-border); color: var(--sdg-text); vertical-align: middle; }
        .sdg-events-table tr:hover td { background: var(--sdg-table-row-alt); }
        .sdg-type-pill { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
      `}</style>

      <div className={`sdg-root${dark ? ' sdg-dark' : ''}`}>
      <div className="sdg-page">

        {/* ── Live Site Events Overview ── */}
        {(() => {
          const today = new Date();
          const upcoming = EVENTS.filter(e => new Date(e.fullDate) >= today);
          const categoryCounts = EVENTS.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + 1; return acc; }, {} as Record<string, number>);
          const categoryColors: Record<string, string> = {
            'School Drives': '#C5192D',
            'Workshops': '#FF7A00',
            'CSR Meets': '#7b61ff',
            'NGO Collaboration': '#00b050',
            'Youth Challenges': '#f4b400',
          };
          return (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sdg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Live Site — Upcoming Events</div>
              {/* Summary stat strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 14 }}>
                {[
                  { label: 'Total Events', value: EVENTS.length, color: '#6366f1' },
                  { label: 'Upcoming', value: upcoming.length, color: '#10b981' },
                  { label: 'School Drives', value: categoryCounts['School Drives'] || 0, color: categoryColors['School Drives'] },
                  { label: 'Workshops', value: categoryCounts['Workshops'] || 0, color: categoryColors['Workshops'] },
                  { label: 'CSR Meets', value: categoryCounts['CSR Meets'] || 0, color: categoryColors['CSR Meets'] },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'var(--sdg-card-bg)', border: '1px solid var(--sdg-card-border)', borderRadius: 10, padding: '14px 16px', borderTop: `3px solid ${s.color}` }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--sdg-text-muted)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Events list */}
              <div style={{ background: 'var(--sdg-card-bg)', border: '1px solid var(--sdg-card-border)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, padding: '9px 16px', background: 'var(--sdg-table-head)', borderBottom: '1px solid var(--sdg-card-border)' }}>
                  {['Event', 'Category', 'Date', 'Location'].map(h => (
                    <div key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--sdg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
                  ))}
                </div>
                {EVENTS.map((e, i) => (
                  <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, padding: '11px 16px', borderBottom: i < EVENTS.length - 1 ? '1px solid var(--sdg-card-border)' : 'none', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sdg-text)' }}>{e.title}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: categoryColors[e.category] || '#6366f1', background: `${categoryColors[e.category]}18`, border: `1px solid ${categoryColors[e.category]}40`, borderRadius: 5, padding: '2px 8px', width: 'fit-content' }}>{e.category}</span>
                    <div style={{ fontSize: 12, color: 'var(--sdg-text-muted)' }}>{e.day} {e.month} {e.year}</div>
                    <div style={{ fontSize: 12, color: 'var(--sdg-text-muted)' }}>{e.location}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── Header ── */}
        <div className="sdg-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1>SDG Events Management</h1>
            <div style={{ display: 'flex', background: 'var(--sdg-table-head)', border: '1px solid var(--sdg-card-border)', borderRadius: 8, padding: 3, gap: 2 }}>
              <button onClick={() => setActiveTab('events')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: activeTab === 'events' ? 'var(--sdg-card-bg)' : 'transparent', color: activeTab === 'events' ? 'var(--sdg-text)' : 'var(--sdg-text-muted)' }}>Events</button>
              <button onClick={() => setActiveTab('pending')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: activeTab === 'pending' ? 'var(--sdg-card-bg)' : 'transparent', color: activeTab === 'pending' ? 'var(--sdg-text)' : 'var(--sdg-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                Pending Requests
                {pendingRequests.length > 0 && <span style={{ background: '#ef4444', color: '#fff', borderRadius: 20, fontSize: 10, fontWeight: 700, padding: '1px 7px' }}>{pendingRequests.length}</span>}
              </button>
            </div>
          </div>
          <div className="sdg-header-right">
            <button className="sdg-btn-primary" onClick={() => setShowCreate(true)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Event
            </button>
          </div>
        </div>

        {/* ── Pending Tab ── */}
        {activeTab === 'pending' && (
          <div style={{ background: 'var(--sdg-card-bg)', border: '1px solid var(--sdg-card-border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--sdg-card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sdg-text)' }}>Pending Event Requests</div>
              <span style={{ fontSize: 11, color: 'var(--sdg-text-muted)' }}>{pendingRequests.length} awaiting review</span>
            </div>
            {pendingRequests.length === 0 ? (
              <div className="sdg-empty"><h3>No pending requests</h3><p>All submissions have been reviewed.</p></div>
            ) : (
              <div className="sdg-events-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
                <table className="sdg-events-table">
                  <thead><tr>{['Event Title','SDG','Type','Date','Venue','Coordinator','Submitted','Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {pendingRequests.map((req) => {
                      const col = SDG_OPTIONS.find(s => s.label === req.form.sdgTag)?.color ?? '#6366f1';
                      return (
                        <tr key={req.id}>
                          <td style={{ fontWeight: 600 }}>{req.form.title}</td>
                          <td><span style={{ background: hexToRgba(col, 0.15), color: col, border: `1px solid ${hexToRgba(col, 0.4)}`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{req.form.sdgTag.split('–')[0].trim()}</span></td>
                          <td><span className="sdg-type-pill" style={{ background: req.form.type === 'online' ? 'rgba(99,102,241,0.12)' : 'rgba(16,185,129,0.12)', color: req.form.type === 'online' ? '#6366f1' : '#10b981' }}>{req.form.type}</span></td>
                          <td style={{ whiteSpace: 'nowrap' }}>{req.form.date}</td>
                          <td style={{ fontSize: 12 }}>{req.form.venue}</td>
                          <td style={{ fontSize: 12 }}>{req.form.coordinatorName}</td>
                          <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{new Date(req.submittedAt).toLocaleDateString('en-IN')}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button onClick={() => {
                                const opt = SDG_OPTIONS.find(s => s.label === req.form.sdgTag) ?? SDG_OPTIONS[0];
                                const ev: SDGEvent = { id: req.id, title: req.form.title, sdgTag: req.form.sdgTag, sdgColor: opt.color, bannerColor: opt.color, description: req.form.description, date: req.form.date, time: req.form.time, venue: req.form.venue, type: req.form.type, participantCount: 0, ticket: { name: req.form.ticketName || 'General', price: Number(req.form.ticketPrice) || 0 }, coordinator: { name: req.form.coordinatorName, email: req.form.coordinatorEmail, phone: req.form.coordinatorPhone }, participants: [] };
                                setEvents(p => [ev, ...p]);
                                const u = pendingRequests.filter(r => r.id !== req.id);
                                setPendingRequests(u);
                                localStorage.setItem('sdg_pending_events', JSON.stringify(u));
                                setActiveTab('events');
                              }} style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#10b981', border: 'none', borderRadius: 7, padding: '6px 14px', cursor: 'pointer' }}>Approve</button>
                              <button onClick={() => {
                                const u = pendingRequests.filter(r => r.id !== req.id);
                                setPendingRequests(u);
                                localStorage.setItem('sdg_pending_events', JSON.stringify(u));
                              }} style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 7, padding: '6px 14px', cursor: 'pointer' }}>Reject</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Toolbar ── */}
        {activeTab === 'events' && <div className="sdg-toolbar">
          <div className="sdg-view-toggle">
            <button className={viewMode === "card" ? "active" : ""} onClick={() => setViewMode("card")} title="Card view">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button className={viewMode === "table" ? "active" : ""} onClick={() => setViewMode("table")} title="Table view">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="sdg-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search events, SDGs, venues…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="sdg-btn-secondary" onClick={handleExport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
          <span className="sdg-result-count">
            {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>}

        {/* ── Card / Table Grid ── */}
        {activeTab === 'events' && (filtered.length === 0 ? (
          <div className="sdg-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", display: "block", opacity: 0.3 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h3>No events found</h3>
            <p>Try a different search term or create a new event.</p>
          </div>
        ) : viewMode === "card" ? (
          <div className="sdg-grid">
            {filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onView={() => setViewEvent(event)}
                onEdit={() => setEditEvent(event)}
                onDelete={() => handleDelete(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="sdg-events-table-wrap">
            <table className="sdg-events-table">
              <thead>
                <tr>
                  {["Title", "SDG", "Type", "Date", "Time", "Venue", "Participants", "Ticket", "Actions"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((event) => (
                  <tr key={event.id}>
                    <td style={{ fontWeight: 600, maxWidth: 180 }}>{event.title}</td>
                    <td>
                      <span style={{ background: hexToRgba(event.sdgColor, 0.15), color: event.sdgColor, border: `1px solid ${hexToRgba(event.sdgColor, 0.4)}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {event.sdgTag.split("–")[0].trim()}
                      </span>
                    </td>
                    <td>
                      <span className="sdg-type-pill" style={{ background: event.type === "online" ? "rgba(99,102,241,0.12)" : "rgba(16,185,129,0.12)", color: event.type === "online" ? "#6366f1" : "#10b981" }}>
                        {event.type === "online" ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{formatDate(event.date)}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{event.time}</td>
                    <td style={{ maxWidth: 160, color: "var(--sdg-text-muted)", fontSize: 12 }}>{event.venue}</td>
                    <td style={{ textAlign: "center" }}>{event.participantCount.toLocaleString()}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {event.ticket.price === 0 ? (
                        <span style={{ color: "#10b981", fontWeight: 600 }}>Free</span>
                      ) : (
                        <span style={{ fontWeight: 600 }}>₹{event.ticket.price}</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setViewEvent(event)} style={{ fontSize: 11, fontWeight: 600, color: "#6366f1", background: "rgba(99,102,241,0.08)", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>View</button>
                        <button onClick={() => setEditEvent(event)} style={{ fontSize: 11, fontWeight: 600, color: "var(--sdg-text-muted)", background: "var(--sdg-table-head)", border: "1px solid var(--sdg-card-border)", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>Edit</button>
                        <button onClick={() => handleDelete(event.id)} style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      </div>
      {/* ── Detail Panel ── */}
      {viewEvent && (
        <DetailPanel event={viewEvent} onClose={() => setViewEvent(null)} />
      )}

      {/* ── Edit Modal ── */}
      {editEvent && (
        <EventModal
          initial={editEvent}
          onSave={handleEdit}
          onClose={() => setEditEvent(null)}
        />
      )}

      {/* ── Create Modal ── */}
      {showCreate && (
        <EventModal onSave={handleCreate} onClose={() => setShowCreate(false)} />
      )}
    </>
  );
}
