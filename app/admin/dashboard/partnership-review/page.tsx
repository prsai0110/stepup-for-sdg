'use client'

import { useState, Suspense } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import { usePartnershipForms } from '../PartnershipFormContext'

function PartnershipReviewInner() {
  const { dark } = useDashboardTheme()
  const { submissions } = usePartnershipForms()
  const [selected, setSelected] = useState(0)

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f9fafb',
    border:      dark ? 'rgba(255,255,255,.07)' : '#eef0f2',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7888',
    textMuted:   dark ? '#4a5168' : '#9aa3ad',
  }

  const sub = submissions[selected]

  const initials = (name: string) =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const avatarColors = ['#3b6ef6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#0ea5e9']
  const avatarColor = (i: number) => avatarColors[i % avatarColors.length]

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: c.bg }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary, marginBottom: 6 }}>Partnership Requests</div>
      <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 24 }}>
        These are submissions from the public partnership form. We will contact them directly.
      </div>

      {submissions.length === 0 ? (
        <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: 48, textAlign: 'center', color: c.textMuted }}>
          No submissions yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'start' }}>

          {/* Left — list */}
          <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '14px 10px', boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, paddingLeft: 6 }}>
              {submissions.length} Submission{submissions.length !== 1 ? 's' : ''}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {submissions.map((s, i) => (
                <div key={s.id} onClick={() => setSelected(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px',
                  borderRadius: 10, cursor: 'pointer',
                  background: selected === i ? (dark ? '#1e2a4a' : '#f0f4ff') : 'transparent',
                  border: selected === i ? `1px solid ${dark ? '#3b6ef6' : '#d0dcff'}` : '1px solid transparent',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', background: avatarColor(i),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 11.5, fontWeight: 700, flexShrink: 0,
                  }}>{initials(s.fullName)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.fullName}</div>
                    <div style={{ fontSize: 11, color: c.textMuted, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.organization}</div>
                    <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 1 }}>⏱ {s.submittedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — detail */}
          {sub && (
            <div style={{ background: c.surface, borderRadius: 14, border: `1px solid ${c.border}`, padding: '24px 28px', boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', background: avatarColor(selected),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 18, fontWeight: 700, flexShrink: 0,
                }}>{initials(sub.fullName)}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary }}>{sub.fullName}</div>
                  <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>Submitted on {sub.submittedAt}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Organization', value: sub.organization },
                  { label: 'Work Email', value: sub.email },
                  { label: 'Type', value: sub.type },
                ].map((f, i) => (
                  <div key={i} style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{f.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{f.value || '—'}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: '16px 18px', marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>How they want to collaborate</div>
                <div style={{ fontSize: 13.5, color: c.textPrimary, lineHeight: 1.65 }}>{sub.message || '—'}</div>
              </div>

              <div style={{ background: dark ? 'rgba(59,110,246,.1)' : '#f0f4ff', border: `1px solid ${dark ? '#3b6ef6' : '#d0dcff'}`, borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b6ef6" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <div style={{ fontSize: 13, color: dark ? '#7aa3fb' : '#2563eb', fontWeight: 500 }}>
                  Contact this person at <strong>{sub.email}</strong> to follow up on their request.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function PartnershipReviewPage() {
  return (
    <Suspense fallback={<div style={{ padding: 28 }}>Loading...</div>}>
      <PartnershipReviewInner />
    </Suspense>
  )
}
