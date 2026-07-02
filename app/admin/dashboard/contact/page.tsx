'use client'

import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../ThemeContext'
import {
  getContactMessages, markContactRead,
  getVolunteerSubmissions,
  type ContactMessage,
} from '@/app/lib/adminStore'

const TICKETS = [
  { id: 'TKT-001', subject: 'Cannot access partner portal', from: 'GreenEarth NGO', priority: 'High', status: 'Open', created: '12 Apr 2026' },
  { id: 'TKT-002', subject: 'Report upload failing', from: 'EcoSolutions Ltd', priority: 'Medium', status: 'In Progress', created: '11 Apr 2026' },
  { id: 'TKT-003', subject: 'SDG badge not reflecting', from: 'Bright Futures Academy', priority: 'Low', status: 'Resolved', created: '10 Apr 2026' },
  { id: 'TKT-004', subject: 'Wrong contact info displayed', from: 'Hope Foundation', priority: 'Medium', status: 'Open', created: '9 Apr 2026' },
]

const TAG_COLORS: Record<string, string> = { Partner: '#3b6ef6', School: '#10b981', NGO: '#8b5cf6', Contact: '#f59e0b' }
const PRIORITY_COLORS: Record<string, string> = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' }
const STATUS_COLORS: Record<string, string> = { Open: '#ef4444', 'In Progress': '#f59e0b', Resolved: '#10b981' }

export default function ContactCentrePage() {
  const { dark } = useContext(ThemeContext)
  const [tab, setTab] = useState<'inbox' | 'tickets'>('inbox')
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [compose, setCompose] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [reply, setReply] = useState('')
  const [replySent, setReplySent] = useState(false)
  const [form, setForm] = useState({ to: '', subject: '', body: '' })
  const [sent, setSent] = useState(false)

  // Load from store on mount and poll for new messages
  useEffect(() => {
    const load = () => {
      const contacts = getContactMessages()
      // merge volunteer submissions as contact messages
      const volunteers = getVolunteerSubmissions().map(v => ({
        id: v.id,
        from: v.fullName,
        email: v.email,
        phone: v.phone,
        subject: 'Volunteer Application',
        body: `Skills: ${v.skills} | Availability: ${v.availability} | Motivation: ${v.motivation}`,
        time: v.submittedAt,
        date: v.submittedAt,
        unread: true,
        tag: 'Contact' as const,
        avatar: v.fullName.charAt(0).toUpperCase(),
      }))
      // deduplicate by id
      const existingIds = new Set(contacts.map(m => m.id))
      const newVolunteers = volunteers.filter(v => !existingIds.has(v.id))
      setMessages([...contacts, ...newVolunteers])
    }
    load()
    const interval = setInterval(load, 2000)
    return () => clearInterval(interval)
  }, [])

  const c = {
    bg: dark ? '#0f1117' : '#f5f6fa',
    surface: dark ? '#1a1d27' : '#ffffff',
    surfaceAlt: dark ? '#1f2335' : '#f8f9fc',
    border: dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond: dark ? '#8891aa' : '#6b7280',
    textMuted: dark ? '#4a5168' : '#9ca3af',
    accent: '#3b6ef6',
    accentLight: dark ? 'rgba(59,110,246,.15)' : 'rgba(59,110,246,.07)',
    shadow: dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const filtered = messages.filter(m => {
    const matchSearch = m.from.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || m.tag === filter || (filter === 'Unread' && m.unread)
    return matchSearch && matchFilter
  })

  const unreadCount = messages.filter(m => m.unread).length

  const handleSelect = (msg: ContactMessage) => {
    setSelected(msg)
    markContactRead(msg.id)
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, unread: false } : m))
    setReply('')
    setReplySent(false)
    setCompose(false)
  }

  const handleSendReply = () => {
    if (!reply.trim()) return
    setReplySent(true)
    setTimeout(() => { setReplySent(false); setReply('') }, 1800)
  }

  const handleSend = () => {
    if (!form.to || !form.subject || !form.body) return
    setSent(true)
    setTimeout(() => { setSent(false); setCompose(false); setForm({ to: '', subject: '', body: '' }) }, 1800)
  }

  const avatarColor = (letter: string) => {
    const colors = ['#3b6ef6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9']
    return colors[letter.charCodeAt(0) % colors.length]
  }

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: c.bg }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Contact Centre</div>
          <div style={{ fontSize: 12.5, color: c.textMuted, marginTop: 2 }}>Manage partner and school communications</div>
        </div>
        <button onClick={() => { setCompose(true); setSelected(null) }} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: c.accent, color: '#fff',
          border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Compose
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { label: 'Total Messages', value: messages.length, color: '#3b6ef6' },
          { label: 'Unread', value: unreadCount, color: '#8b5cf6' },
          { label: 'Open Tickets', value: TICKETS.filter(t => t.status === 'Open').length, color: '#ef4444' },
          { label: 'Resolved', value: TICKETS.filter(t => t.status === 'Resolved').length, color: '#10b981' },
        ].map((s, i) => (
          <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 18px', boxShadow: c.shadow }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 18, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {(['inbox', 'tickets'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 20px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: tab === t ? c.accent : 'transparent',
            color: tab === t ? '#fff' : c.textSecond,
            transition: 'all .15s',
          }}>
            {t === 'inbox' ? `Inbox ${unreadCount > 0 ? `(${unreadCount})` : ''}` : 'Support Tickets'}
          </button>
        ))}
      </div>

      {tab === 'inbox' && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, alignItems: 'start' }}>
          {/* Message List */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow, overflow: 'hidden' }}>
            <div style={{ padding: '14px 14px 10px', borderBottom: `1px solid ${c.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: '7px 12px', marginBottom: 10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: c.textSecond, width: '100%', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['All', 'Unread', 'Partner', 'School', 'NGO', 'Contact'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    fontSize: 10.5, fontWeight: 600, padding: '3px 10px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: filter === f ? c.accent : c.surfaceAlt,
                    color: filter === f ? '#fff' : c.textSecond,
                  }}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ maxHeight: 480, overflowY: 'auto' }}>
              {filtered.length === 0 && (
                <div style={{ padding: 32, textAlign: 'center', color: c.textMuted, fontSize: 13 }}>No messages found</div>
              )}
              {filtered.map(msg => (
                <div key={msg.id} onClick={() => handleSelect(msg)} style={{
                  padding: '12px 14px', cursor: 'pointer', borderBottom: `1px solid ${c.border}`,
                  background: selected?.id === msg.id ? c.accentLight : msg.unread ? (dark ? 'rgba(59,110,246,.07)' : 'rgba(59,110,246,.03)') : 'transparent',
                  transition: 'background .15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: avatarColor(msg.avatar), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{msg.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12.5, fontWeight: msg.unread ? 700 : 500, color: c.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{msg.from}</span>
                        <span style={{ fontSize: 10.5, color: c.textMuted, flexShrink: 0 }}>{msg.time}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: msg.unread ? c.textPrimary : c.textSecond, fontWeight: msg.unread ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{msg.subject}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: c.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{msg.body.slice(0, 50)}…</span>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: TAG_COLORS[msg.tag] ?? '#6b7280', background: (TAG_COLORS[msg.tag] ?? '#6b7280') + '18', padding: '2px 7px', borderRadius: 20, flexShrink: 0 }}>{msg.tag}</span>
                      </div>
                    </div>
                    {msg.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.accent, flexShrink: 0, marginTop: 4 }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail / Compose Panel */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow, minHeight: 420 }}>
            {compose ? (
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary, marginBottom: 18 }}>New Message</div>
                {[{ label: 'To', key: 'to', placeholder: 'recipient@email.com' }, { label: 'Subject', key: 'subject', placeholder: 'Message subject' }].map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: c.textSecond, marginBottom: 5 }}>{f.label}</div>
                    <input value={form[f.key as 'to' | 'subject']} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                      style={{ width: '100%', padding: '9px 13px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                ))}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: c.textSecond, marginBottom: 5 }}>Message</div>
                  <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} placeholder="Write your message here..." rows={7}
                    style={{ width: '100%', padding: '10px 13px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={handleSend} style={{ background: sent ? '#10b981' : c.accent, color: '#fff', border: 'none', borderRadius: 9, padding: '9px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background .2s' }}>
                    {sent ? '✓ Sent!' : 'Send Message'}
                  </button>
                  <button onClick={() => setCompose(false)} style={{ background: c.surfaceAlt, color: c.textSecond, border: `1px solid ${c.border}`, borderRadius: 9, padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            ) : selected ? (
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: avatarColor(selected.avatar), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{selected.avatar}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary }}>{selected.subject}</div>
                      <div style={{ fontSize: 12, color: c.textSecond, marginTop: 3 }}><b>{selected.from}</b> &lt;{selected.email}&gt;</div>
                      {selected.phone && <div style={{ fontSize: 11, color: c.textMuted, marginTop: 1 }}>📞 {selected.phone}</div>}
                      <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{selected.date} · {selected.time}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: TAG_COLORS[selected.tag] ?? '#6b7280', background: (TAG_COLORS[selected.tag] ?? '#6b7280') + '18', padding: '4px 12px', borderRadius: 20 }}>{selected.tag}</span>
                </div>
                <div style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: '16px 18px', fontSize: 13.5, color: c.textSecond, lineHeight: 1.7, marginBottom: 22 }}>
                  {selected.body}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.textSecond, marginBottom: 8 }}>Reply</div>
                <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Write your reply..." rows={4}
                  style={{ width: '100%', padding: '10px 13px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: 12 }} />
                <button onClick={handleSendReply} style={{ background: replySent ? '#10b981' : c.accent, color: '#fff', border: 'none', borderRadius: 9, padding: '9px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background .2s' }}>
                  {replySent ? '✓ Reply Sent!' : 'Send Reply'}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 420, color: c.textMuted }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14, opacity: .4 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Select a message to read</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>or compose a new one</div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'tickets' && (
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Support Tickets</div>
            <span style={{ fontSize: 11, color: c.textMuted }}>{TICKETS.length} total</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: c.surfaceAlt }}>
                {['Ticket ID', 'Subject', 'From', 'Priority', 'Status', 'Created'].map(h => (
                  <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: `1px solid ${c.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TICKETS.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < TICKETS.length - 1 ? `1px solid ${c.border}` : 'none', transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = c.accentLight)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '13px 18px', fontSize: 12.5, fontWeight: 700, color: c.accent }}>{t.id}</td>
                  <td style={{ padding: '13px 18px', fontSize: 12.5, color: c.textPrimary, fontWeight: 500 }}>{t.subject}</td>
                  <td style={{ padding: '13px 18px', fontSize: 12.5, color: c.textSecond }}>{t.from}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[t.priority], background: PRIORITY_COLORS[t.priority] + '18', padding: '3px 10px', borderRadius: 20 }}>{t.priority}</span>
                  </td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLORS[t.status], background: STATUS_COLORS[t.status] + '18', padding: '3px 10px', borderRadius: 20 }}>{t.status}</span>
                  </td>
                  <td style={{ padding: '13px 18px', fontSize: 12, color: c.textMuted }}>{t.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
