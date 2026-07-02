'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThemeContext } from './ThemeContext'
import { PartnersProvider } from './PartnersContext'
import { PartnershipFormProvider } from './PartnershipFormContext'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('stepup_admin_session')
    if (!session) router.push('/admin/login')
    if (localStorage.getItem('stepup_dark') === 'true') setDark(true)
  }, [])

  const toggleDark = () => setDark(d => {
    localStorage.setItem('stepup_dark', String(!d))
    return !d
  })

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7280',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    accent:      '#3b6ef6',
    accentLight: dark ? 'rgba(59,110,246,.18)' : 'rgba(59,110,246,.08)',
    accentText:  dark ? '#7aa3fb' : '#2563eb',
    red:    '#ef4444',
    shadow: dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
    shadowMd: dark ? '0 8px 32px rgba(0,0,0,.5)' : '0 4px 20px rgba(17,24,39,.1)',
  }

  const navItems = [
    { label: 'Dashboard',          href: '/admin/dashboard',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },

    { label: 'Partnership Review', href: '/admin/dashboard/partnership-review',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
    { label: 'Events Management',  href: '/admin/dashboard/events',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { label: 'Funds',               href: '/admin/dashboard/donations',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { label: 'Contact Centre',     href: '/admin/dashboard/contact',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('stepup_admin_session')
    window.location.href = '/admin/login'
  }

  return (
    <ThemeContext.Provider value={{ dark }}>
      <PartnershipFormProvider>
      <PartnersProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: c.bg, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", transition: 'background .3s' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(1.6);} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
          @keyframes spin-slow { to{ transform:rotate(360deg); } }
          .fade-up { animation: fadeUp .35s ease forwards; }
          .nav-item:hover { background: rgba(255,255,255,.08) !important; color: rgba(255,255,255,.9) !important; }
          .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(17,24,39,.12) !important; }
          .card-hover { transition: transform .2s, box-shadow .2s; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: rgba(128,128,128,.15); border-radius: 8px; }
          input::placeholder { color: ${c.textMuted}; }
        `}</style>

        {/* SIDEBAR */}
        <aside style={{
          width: 248, position: 'fixed', height: '100vh', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
          background: dark ? 'linear-gradient(175deg,#0d1117 0%,#1a2035 50%,#0f1729 100%)' : 'linear-gradient(175deg,#1e3a8a 0%,#1d4ed8 50%,#0ea5e9 100%)',
          borderRight: '1px solid rgba(255,255,255,.05)',
          boxShadow: '2px 0 20px rgba(0,0,0,.2)', zIndex: 100,
        }}>
          <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 64, height: 64, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                <img src="/assets/SDG_LOGO-removebg-preview.png" alt="SDG Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>StepUp SDG</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 3, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Admin Portal</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '20px 12px 8px' }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,.2)', letterSpacing: '1.5px', textTransform: 'uppercase', paddingLeft: 8, marginBottom: 8 }}>Menu</div>
            {navItems.map((item, i) => {
              const isActive = pathname === item.href
              return (
                <Link key={i} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                  <div className="nav-item" style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9,
                    background: isActive ? 'rgba(59,110,246,.25)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,.45)',
                    transition: 'all .15s', cursor: 'pointer',
                    borderLeft: isActive ? '2px solid #7aa3fb' : '2px solid transparent',
                  }}>
                    <span style={{ flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                    {isActive && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#7aa3fb' }} />}
                  </div>
                </Link>
              )
            })}
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', overflow: 'hidden', borderRadius: 12 }}>
              <img src="/PPP-SDG.png" alt="PPP SDG" style={{ width: '100%', display: 'block', animation: 'spin-slow 12s linear infinite', transformOrigin: 'center center' }} />
            </div>
          </div>

          <div style={{ padding: '14px 16px 20px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#3b6ef6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>A</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#f0f2f8', lineHeight: 1 }}>Lasya</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 3 }}>Super Admin</div>
                </div>
              </div>
              <button onClick={handleLogout} style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: '4px 8px', borderRadius: 6 }}>
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ flex: 1, marginLeft: 248, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

          {/* Topbar */}
          <header style={{
            height: 62, background: c.surface, borderBottom: `1px solid ${c.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px', position: 'sticky', top: 0, zIndex: 90,
            boxShadow: c.shadow, transition: 'background .3s',
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, lineHeight: 1 }}>Admin Dashboard</div>
              <div style={{ fontSize: 11, color: c.textMuted, marginTop: 3 }}>Welcome back, Lasya</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: '7px 14px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input placeholder="Search..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12.5, color: c.textSecond, width: 150, fontFamily: 'inherit' }} />
              </div>

              {/* Notifications */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setShowNotifs(n => !n); setShowSettings(false) }}
                  style={{ position: 'relative', background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textSecond} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: c.red, border: `2px solid ${c.surface}`, animation: 'pulse 2s ease infinite' }} />
                </button>
                {showNotifs && (
                  <div style={{ position: 'absolute', top: 46, right: 0, width: 310, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadowMd, zIndex: 200, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 18px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: c.textPrimary }}>Notifications</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: c.red, borderRadius: 20, padding: '2px 9px' }}>3 new</span>
                    </div>
                    {[
                      { title: 'New partner application', desc: 'GreenEarth NGO submitted a request', time: '2h ago', unread: true },
                      { title: 'New School Enrolled', desc: 'Bright Futures Academy joined SDG 4', time: '5h ago', unread: true },
                      { title: 'Project Milestone', desc: 'Water Access Project reached 100%', time: 'Yesterday', unread: true },
                      { title: 'Report Submitted', desc: 'EcoSolutions uploaded Q3 impact report', time: '2d ago', unread: false },
                    ].map((n, i, arr) => (
                      <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', background: n.unread ? c.accentLight : 'transparent', cursor: 'pointer' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary }}>{n.title}</span>
                            {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, flexShrink: 0, marginTop: 4 }} />}
                          </div>
                          <div style={{ fontSize: 11, color: c.textSecond, marginTop: 2 }}>{n.desc}</div>
                          <div style={{ fontSize: 10, color: c.textMuted, marginTop: 3 }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ padding: '10px 18px', textAlign: 'center', borderTop: `1px solid ${c.border}` }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all notifications</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setShowSettings(s => !s); setShowNotifs(false) }}
                  style={{ background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textSecond} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </button>
                {showSettings && (
                  <div style={{ position: 'absolute', top: 46, right: 0, width: 230, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadowMd, zIndex: 200, overflow: 'hidden' }}>
                    <div style={{ padding: '13px 16px', borderBottom: `1px solid ${c.border}` }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>Settings</span>
                    </div>
                    {[
                      { icon: '🌗', label: 'Dark Mode', action: toggleDark, toggle: true, value: dark },
                      { icon: '🔔', label: 'Notifications', toggle: true, value: true },
                      { icon: '🔒', label: 'Security', toggle: false },
                      { icon: '📤', label: 'Export Data', toggle: false },
                    ].map((item, i, arr) => (
                      <div key={i} onClick={item.action} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 14 }}>{item.icon}</span>
                          <span style={{ fontSize: 12.5, fontWeight: 500, color: c.textPrimary }}>{item.label}</span>
                        </div>
                        {item.toggle ? (
                          <div style={{ width: 32, height: 18, borderRadius: 9, background: item.value ? c.accent : c.border, position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
                            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: item.value ? 16 : 2, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                          </div>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, lineHeight: 1 }}>Lasya</div>
                  <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 2 }}>Super Admin</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3b6ef6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>A</div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div style={{ flex: 1 }}>{children}</div>

          {/* Footer */}
          <footer style={{ borderTop: `1px solid ${c.border}`, background: c.surface, padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: c.textPrimary }}>Pavdhan Organizations <span style={{ fontWeight: 400, color: c.textMuted }}>© 2026</span></div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: c.red }}>Restricted — Authorized Admins Only</div>
          </footer>
        </div>
      </div>
      </PartnersProvider>
      </PartnershipFormProvider>
    </ThemeContext.Provider>
  )
}
