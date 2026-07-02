'use client'

import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Tooltip, Filler
} from 'chart.js'
import { useDashboardTheme } from './ThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAdminStats, getContactMessages, getPartnershipSubmissions, type AdminStats } from '@/app/lib/adminStore'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Filler)

export default function DashboardPage() {
  const { dark } = useDashboardTheme()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)

  useEffect(() => {
    const load = () => {
      const s = getAdminStats()
      const unread = getContactMessages().filter(m => m.unread).length
      const pending = getPartnershipSubmissions().length
      setStats({ ...s, pendingRequests: unread + pending })
    }
    load()
    const interval = setInterval(load, 2000)
    return () => clearInterval(interval)
  }, [])

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
    green:  '#10b981',
    red:    '#ef4444',
    shadow: dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const card = {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: 14,
    boxShadow: c.shadow,
  }

  return (
    <main style={{ flex: 1, padding: '24px 28px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Banner */}
      <div style={{ background: 'linear-gradient(120deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)', borderRadius: 14, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(37,99,235,.3)' }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', marginBottom: 4 }}>12 applications &amp; 4 reviews pending your approval</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Review partner requests and project submissions before the deadline.</div>
        </div>
        <button onClick={() => router.push('/admin/dashboard/partnership-review')} style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.25)', borderRadius: 9, padding: '9px 20px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Review Now →
        </button>
      </div>

      {/* SDG Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[
          { label: 'Total Partners',       value: stats ? stats.totalPartners.toLocaleString() : '…', change: '+12% this month', up: true,  color: '#3b6ef6' },
          { label: 'Total Projects',        value: stats ? stats.totalProjects.toLocaleString() : '…', change: '+6% this month',  up: true,  color: '#8b5cf6' },
          { label: 'Total SDGs',            value: '17/17', change: 'All active',      up: null,  color: '#10b981' },
          { label: 'Total Events',          value: stats ? stats.totalEvents.toLocaleString() : '…', change: '+18% this month', up: true,  color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
              {s.up === true ? '↑ ' : ''}{s.change}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { label: 'Student Contributions', value: stats ? stats.studentContributions.toLocaleString() : '…', change: '+24% this month',  up: true,  color: '#06b6d4' },
          { label: 'Pending Requests',       value: stats ? String(stats.pendingRequests) : '…',    change: 'Action required',  up: null,  color: '#ef4444' },
          { label: 'Active Campaigns',       value: stats ? String(stats.activeCampaigns) : '…',    change: '+3 this week',     up: true,  color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
              {s.up === true ? '↑ ' : ''}{s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[
          { label: 'Total Students',    value: stats ? stats.totalStudents.toLocaleString() : '…', change: '+12% this month', up: true,  color: '#3b6ef6' },
          { label: 'Schools Supported', value: stats ? String(stats.schoolsSupported) : '…',    change: '+5 new schools',  up: true,  color: '#8b5cf6' },
          { label: 'Projects Completed',value: '89',     change: 'Stable trend',    up: null,  color: '#f59e0b' },
          { label: 'Active Partners',   value: '56',     change: '+3 this week',    up: true,  color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '20px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '14px 14px 0 0' }} />
            <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.textPrimary, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: s.up === true ? c.green : s.up === false ? c.red : c.textMuted }}>
              {s.up === true ? '↑ ' : ''}{s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Partner Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          {
            title: 'Companies',
            desc: 'Channel CSR funding into transparent, measurable education programs and track impact in real time.',
            count: 25, active: 20, pending: 5,
            gradient: 'linear-gradient(135deg,#155DFC,#00C2FF)',
            glow: 'rgba(21,93,252,.18)', color: '#155DFC', icon: '🏢',
          },
          {
            title: 'Schools / Universities / Colleges',
            desc: 'Join our network to access resources, infrastructure support and quality learning programs.',
            count: 420, active: 390, pending: 30,
            gradient: 'linear-gradient(135deg,#00A8A8,#00B050)',
            glow: 'rgba(0,168,168,.18)', color: '#00A8A8', icon: '🎓',
          },
          {
            title: 'NGOs',
            desc: 'Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.',
            count: 87, active: 74, pending: 13,
            gradient: 'linear-gradient(135deg,#FF7A00,#FFB070)',
            glow: 'rgba(255,122,0,.18)', color: '#FF7A00', icon: '🤝',
          },
        ].map((p, i) => (
          <div key={i} className="card-hover fade-up" style={{ ...card, padding: '22px', animationDelay: `${i * .06}s`, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.gradient, borderRadius: '14px 14px 0 0' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: p.color, lineHeight: 1 }}>{p.count}</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: c.textPrimary, marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontSize: 11.5, color: c.textSecond, lineHeight: 1.5, marginBottom: 16 }}>{p.desc}</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>{p.active}</div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>Active</div>
              </div>
              <div style={{ flex: 1, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f59e0b' }}>{p.pending}</div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>Pending</div>
              </div>
            </div>
            <button onClick={() => router.push('/admin/dashboard/partnership-review')} style={{ width: '100%', background: p.glow, border: `1px solid ${p.color}40`, borderRadius: 9, padding: '9px', fontSize: 12, fontWeight: 600, color: p.color, cursor: 'pointer' }}>
              Manage {p.title.split(' ')[0]}s →
            </button>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* SDG Impact Points */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Impact Points Per Selected SDG</div>
              <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Ranked by student volunteer contribution</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: c.accentText, cursor: 'pointer', background: c.accentLight, padding: '4px 12px', borderRadius: 20 }}>Rankings</span>
          </div>
          <div style={{ padding: '16px 22px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { num: 1,  label: 'No Poverty',                pts: 1420, color: '#e5243b', pct: 15 },
                { num: 3,  label: 'Good Health and Well-being', pts: 3820, color: '#4c9f38', pct: 40 },
                { num: 4,  label: 'Quality Education',          pts: 9500, color: '#c5192d', pct: 100 },
                { num: 5,  label: 'Gender Equality',            pts: 2280, color: '#ff3a21', pct: 24 },
                { num: 6,  label: 'Clean Water & Sanitation',   pts: 4500, color: '#26bde2', pct: 47 },
                { num: 7,  label: 'Affordable & Clean Energy',  pts: 6280, color: '#fcc30b', pct: 66 },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary }}>SDG {s.num}: {s.label}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: c.textSecond, whiteSpace: 'nowrap', marginLeft: 12 }}>{s.pts.toLocaleString()} pts</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 4, background: c.surfaceAlt, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${c.border}`, textAlign: 'center' }}>
              <span onClick={() => router.push('/admin/dashboard/sdg-management')} style={{ fontSize: 12.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>Explore all SDG statistics pages →</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Recent Activity</div>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, cursor: 'pointer' }}>View all</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {[
              { tag: 'Partner',   title: 'New partner application',    desc: 'GreenEarth NGO submitted a request.',    time: '2h ago',    tagColor: '#3b6ef6', tagBg: 'rgba(59,110,246,.1)' },
              { tag: 'School',    title: 'New School Enrolled',         desc: 'Bright Futures Academy joined SDG 4.',   time: '5h ago',    tagColor: '#06b6d4', tagBg: 'rgba(6,182,212,.1)' },
              { tag: 'Milestone', title: 'Project Milestone Reached',   desc: 'Water Access Project reached 100%.',     time: 'Yesterday', tagColor: '#10b981', tagBg: 'rgba(16,185,129,.1)' },
              { tag: 'Report',    title: 'Report Submitted',            desc: 'EcoSolutions uploaded Q3 impact report.', time: '2d ago',   tagColor: '#f59e0b', tagBg: 'rgba(245,158,11,.1)' },
            ].map((a, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '13px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: a.tagColor, background: a.tagBg, borderRadius: 5, padding: '3px 7px', letterSpacing: '.4px', textTransform: 'uppercase', height: 'fit-content', marginTop: 1, flexShrink: 0 }}>{a.tag}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.textPrimary, lineHeight: 1.3 }}>{a.title}</div>
                  <div style={{ fontSize: 11.5, color: c.textSecond, marginTop: 2 }}>{a.desc}</div>
                  <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 4 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Student Growth */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Student Growth</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, marginBottom: 16 }}>Monthly trend — last 6 months</div>
            <div style={{ height: 120 }}>
              <Line
                data={{
                  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
                  datasets: [{
                    data: [3000,3200,4000,5500,8500,12450],
                    borderColor: c.accent,
                    backgroundColor: (ctx: any) => {
                      const g = ctx.chart.ctx.createLinearGradient(0,0,0,120)
                      g.addColorStop(0, 'rgba(59,110,246,.15)')
                      g.addColorStop(1, 'rgba(59,110,246,0)')
                      return g
                    },
                    fill: true, tension: .4, pointRadius: 3, pointBackgroundColor: c.accent, borderWidth: 2,
                  }]
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { size: 9.5 }, color: c.textMuted } } },
                }}
              />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.green, marginTop: 12 }}>↗ 24.5% overall increase</div>
          </div>
        </div>

        {/* Partner Ecosystem */}
        <div className="card-hover" style={card}>
          <div style={{ padding: '20px 22px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Partner Ecosystem</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3, marginBottom: 16 }}>Distribution by type</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 96, height: 96, position: 'relative', flexShrink: 0 }}>
                <Doughnut
                  data={{ labels: ['Schools','NGOs','Companies'], datasets: [{ data: [45,35,20], backgroundColor: [c.accent,'#06b6d4','#8b5cf6'], borderWidth: 0, hoverOffset: 4 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false } } }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: c.textPrimary, lineHeight: 1 }}>56</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: c.textMuted, letterSpacing: '.5px', marginTop: 2 }}>TOTAL</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Schools','45%',c.accent],['NGOs','35%','#06b6d4'],['Companies','20%','#8b5cf6']].map(([lbl,pct,col],i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: col }} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: c.textPrimary }}>{lbl}</span>
                      </div>
                      <span style={{ fontSize: 11.5, color: c.textMuted }}>{pct}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 4, background: c.surfaceAlt, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: pct, background: col, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Youth Initiatives */}
      <div className="card-hover" style={card}>
        <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Youth Initiatives</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Milestone percentage of approved community proposals</div>
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: c.textSecond, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 20, padding: '5px 14px' }}>4 Active</span>
        </div>
        <div style={{ padding: '16px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { sdg: 13, color: '#3f7e44', title: 'Urban Reforestation & Heat Audits',      lead: 'Oakridge Science High',       pct: 84, students: 400 },
            { sdg: 4,  color: '#c5192d', title: 'Rural Digital Literacy Labs',             lead: 'Youth Empowerment Initiative', pct: 68, students: 130 },
            { sdg: 6,  color: '#26bde2', title: 'Clean Reservoir Bio-plastic Filters',     lead: 'Green Horizon Alliance',      pct: 41, students: 64  },
            { sdg: 7,  color: '#fcc30b', title: 'Solar Rechargeable Reading Luminaires',   lead: 'Solaris Global Renewables',   pct: 92, students: 200 },
          ].map((item, i) => (
            <div key={i} style={{ border: `1px solid ${c.border}`, borderRadius: 11, padding: '16px', background: c.surfaceAlt }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: c.textMuted }}>{item.students} Students</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 11.5, color: c.accentText, marginBottom: 14 }}>Lead: {item.lead}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 500 }}>Audit Phase</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: c.textPrimary }}>{item.pct}% completed</span>
              </div>
              <div style={{ height: 5, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Request */}
      <div className="card-hover" style={card}>
        <div style={{ padding: '20px 22px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>Partnership Request</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>Approval of entities</div>
          </div>
          <span onClick={() => router.push('/admin/dashboard/partnership-review')} style={{ fontSize: 12, fontWeight: 600, color: c.accentText, cursor: 'pointer', whiteSpace: 'nowrap' }}>Open Review Center ›</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr 2fr 1.5fr', gap: 8, padding: '10px 22px', borderBottom: `1px solid ${c.border}`, background: c.surfaceAlt }}>
          {['Organization','Category','Registry Inquiry Date','Target SDGs','Actions'].map((h, i) => (
            <div key={i} style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.6px', textAlign: i === 4 ? 'right' : 'left' }}>{h}</div>
          ))}
        </div>
        {[
          { org: 'Apex Eco-Logistics Corp',       date: '2026-06-08', category: 'COMPANY', sdgs: [{n:7,c:'#fcc30b'},{n:13,c:'#3f7e44'}] },
          { org: 'Riverdale Eco-Secondary School', date: '2026-06-10', category: 'SCHOOL',  sdgs: [{n:4,c:'#c5192d'},{n:6,c:'#26bde2'},{n:13,c:'#3f7e44'},{n:15,c:'#56c02b'}] },
        ].map((row, i, arr) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr 2fr 1.5fr', gap: 8, padding: '15px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{row.org}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: c.textPrimary, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 6, padding: '4px 10px', letterSpacing: '.4px', width: 'fit-content' }}>{row.category}</span>
            <span style={{ fontSize: 12.5, color: c.textSecond, fontWeight: 500 }}>{row.date}</span>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {row.sdgs.map((s, j) => (
                <span key={j} style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: s.c, borderRadius: 5, padding: '3px 8px' }}>SDG {s.n}</span>
              ))}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => router.push('/admin/dashboard/partnership-review')} style={{ fontSize: 11.5, fontWeight: 600, color: c.accentText, background: c.accentLight, border: `1px solid ${c.accent}30`, borderRadius: 8, padding: '7px 16px', cursor: 'pointer' }}>
                Inspect Application
              </button>
            </div>
          </div>
        ))}
      </div>



    </main>
  )
}
