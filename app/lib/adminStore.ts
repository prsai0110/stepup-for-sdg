'use client'

// ─── Types ────────────────────────────────────────────────────────────────────

export type VolunteerSubmission = {
  id: number
  fullName: string
  email: string
  phone: string
  city: string
  skills: string
  availability: string
  motivation: string
  submittedAt: string
}

export type EventRequest = {
  id: number
  fullName: string
  email: string
  phone: string
  organization: string
  eventType: string
  location: string
  audience: string
  details: string
  submittedAt: string
}

export type ContactMessage = {
  id: number
  from: string
  email: string
  phone?: string
  subject: string
  body: string
  time: string
  date: string
  unread: boolean
  tag: 'Contact' | 'Partner' | 'School' | 'NGO'
  avatar: string
}

export type PartnershipSubmission = {
  id: number
  fullName: string
  organization: string
  email: string
  type: string
  message: string
  submittedAt: string
}

export type DonationRecord = {
  id: number
  name: string
  email: string
  phone: string
  amount: number
  message: string
  method: string
  donatedAt: string
}

export type AdminStats = {
  totalPartners: number
  totalProjects: number
  totalEvents: number
  totalStudents: number
  schoolsSupported: number
  pendingRequests: number
  activeCampaigns: number
  studentContributions: number
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEYS = {
  contacts: 'stepup_contact_messages',
  partnerships: 'stepup_partnership_submissions',
  volunteers: 'stepup_volunteer_submissions',
  eventRequests: 'stepup_event_requests',
  stats: 'stepup_admin_stats',
  donations: 'stepup_donations',
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const DEFAULT_CONTACTS: ContactMessage[] = [
  { id: 1, from: 'GreenEarth NGO', email: 'contact@greenearth.org', subject: 'Partnership Application Follow-up', body: 'Hello, we submitted our partnership application 3 days ago and wanted to check on its status. We are very eager to collaborate on SDG 13 initiatives.', time: '10:32 AM', date: 'Today', unread: true, tag: 'Partner', avatar: 'G' },
  { id: 2, from: 'Bright Futures Academy', email: 'admin@brightfutures.edu', subject: 'SDG 4 Program Enrollment Query', body: 'We would like to enroll our school in the SDG 4 Quality Education program. Could you please send us the requirements and onboarding steps?', time: '9:15 AM', date: 'Today', unread: true, tag: 'School', avatar: 'B' },
  { id: 3, from: 'EcoSolutions Ltd', email: 'info@ecosolutions.com', subject: 'Q3 Impact Report Submission', body: 'Please find attached our Q3 impact report for the Clean Water Access project. All milestones have been achieved ahead of schedule.', time: 'Yesterday', date: 'Yesterday', unread: false, tag: 'Partner', avatar: 'E' },
  { id: 4, from: 'Hope Foundation', email: 'team@hopefoundation.org', subject: 'Funding Collaboration Proposal', body: 'We are reaching out to propose a joint funding initiative for SDG 1 and SDG 2.', time: 'Mon', date: 'Mon', unread: false, tag: 'Partner', avatar: 'H' },
]

const DEFAULT_PARTNERSHIPS: PartnershipSubmission[] = [
  { id: 1, fullName: 'Maria Rodriguez', organization: 'Sunrise Cooperative', email: 'maria@sunrise.org', type: 'NGO', message: 'We want to collaborate on SDG 2 — Zero Hunger initiatives in rural communities.', submittedAt: '2024-09-21' },
  { id: 2, fullName: 'Daniel Park', organization: 'OceanGuard Initiative', email: 'daniel@oceanguard.org', type: 'NGO', message: 'Interested in partnering on Life Below Water programs.', submittedAt: '2024-09-18' },
  { id: 3, fullName: 'Aisha Bello', organization: 'Lagos Youth Lab', email: 'aisha@lagosyouth.org', type: 'NGO', message: 'We run quality education programs for youth in Lagos and would love to align with SDG 4.', submittedAt: '2024-09-12' },
]

const DEFAULT_STATS: AdminStats = {
  totalPartners: 1248,
  totalProjects: 386,
  totalEvents: 156,
  totalStudents: 12450,
  schoolsSupported: 142,
  pendingRequests: 24,
  activeCampaigns: 38,
  studentContributions: 4820,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback))
      return fallback
    }
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export function getContactMessages(): ContactMessage[] {
  return load(KEYS.contacts, DEFAULT_CONTACTS)
}

export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'unread' | 'avatar'>) {
  const messages = getContactMessages()
  const newMsg: ContactMessage = {
    ...msg,
    id: Date.now(),
    unread: true,
    avatar: msg.from.charAt(0).toUpperCase(),
  }
  save(KEYS.contacts, [newMsg, ...messages])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function markContactRead(id: number) {
  const messages = getContactMessages()
  save(KEYS.contacts, messages.map(m => m.id === id ? { ...m, unread: false } : m))
}

export function saveContactMessages(messages: ContactMessage[]) {
  save(KEYS.contacts, messages)
}

// ─── Partnership Submissions ──────────────────────────────────────────────────

export function getPartnershipSubmissions(): PartnershipSubmission[] {
  return load(KEYS.partnerships, DEFAULT_PARTNERSHIPS)
}

export function addPartnershipSubmission(sub: Omit<PartnershipSubmission, 'id' | 'submittedAt'>) {
  const submissions = getPartnershipSubmissions()
  const newSub: PartnershipSubmission = {
    ...sub,
    id: Date.now(),
    submittedAt: new Date().toISOString().split('T')[0],
  }
  save(KEYS.partnerships, [newSub, ...submissions])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export function getAdminStats(): AdminStats {
  return load(KEYS.stats, DEFAULT_STATS)
}

export function updateAdminStats(patch: Partial<AdminStats>) {
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, ...patch })
}

// ─── Volunteer Submissions ─────────────────────────────────────────────────────

export function getVolunteerSubmissions(): VolunteerSubmission[] {
  return load(KEYS.volunteers, [])
}

export function addVolunteerSubmission(v: Omit<VolunteerSubmission, 'id' | 'submittedAt'>) {
  const list = getVolunteerSubmissions()
  save(KEYS.volunteers, [{ ...v, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0] }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

// ─── Event Requests ─────────────────────────────────────────────────────────────

export function getEventRequests(): EventRequest[] {
  return load(KEYS.eventRequests, [])
}

export function addEventRequest(r: Omit<EventRequest, 'id' | 'submittedAt'>) {
  const list = getEventRequests()
  save(KEYS.eventRequests, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0] }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

// ─── Donations ────────────────────────────────────────────────────────────────

export function getDonations(): DonationRecord[] {
  return load(KEYS.donations, [])
}

export function addDonation(d: Omit<DonationRecord, 'id' | 'donatedAt'>) {
  const list = getDonations()
  save(KEYS.donations, [{ ...d, id: Date.now(), donatedAt: new Date().toISOString() }, ...list])
}
