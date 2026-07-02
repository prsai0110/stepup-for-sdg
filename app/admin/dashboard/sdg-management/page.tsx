'use client'

import { useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'

// Add new project-related SDGs here — they auto-appear everywhere
const sdgs = [
  { num: 4,  name: 'Quality Education',         color: '#c5192d', campaigns: 12 },
  { num: 13, name: 'Climate Action',            color: '#3f7e44', campaigns: 15 },
  { num: 7,  name: 'Affordable & Clean Energy', color: '#fcc30b', campaigns: 7  },
  { num: 6,  name: 'Clean Water & Sanitation',  color: '#26bde2', campaigns: 5  },
  { num: 3,  name: 'Good Health and Well-being',color: '#4c9f38', campaigns: 6  },
  { num: 5,  name: 'Gender Equality',           color: '#ff3a21', campaigns: 3  },
]

function getDetail(num: number) {
  return {
    desc: `Support and accelerate progress on SDG ${num} through youth-led initiatives and community campaigns.`,
    pts: '2,400 pts', youths: '120 youths', awareCampaigns: '3 active', themeColor: sdgs.find(s => s.num === num)?.color ?? '#333',
    cases: [
      { id: 'COMMUNITY PROJECT • 2026', title: 'Community Impact Initiative', desc: 'Students collaborated on field research and data collection for measurable outcomes.', outcome: 'Outcome Secured: Successfully engaged 50+ volunteers with measurable community impact.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80' },
      { id: 'SCHOOL PROGRAM • 2025', title: 'Rural Digital Literacy Drive', desc: 'Youth volunteers trained 200+ rural students in basic digital skills across 5 government schools.', outcome: 'Outcome Secured: Digital literacy rate improved by 68% in target schools within one academic year.', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80' },
      { id: 'NGO PARTNERSHIP • 2025', title: 'Clean Energy Awareness Campaign', desc: 'Partnership with GreenEarth NGO to raise awareness about renewable energy among school students.', outcome: 'Outcome Secured: Reached 1,200 students across 8 districts with hands-on solar demonstration kits.', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80' },
      { id: 'CORPORATE COLLABORATION • 2026', title: 'Urban Reforestation with Tech Monitoring', desc: 'Students used IoT sensors to monitor soil and moisture during a large-scale tree plantation drive.', outcome: 'Outcome Secured: 3,000 saplings planted with 91% survival rate tracked over 6 months.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80' },
    ],
  }
}

export default function SDGManagementPage() {
  const { dark } = useDashboardTheme()
  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#eef0f2',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textSecond:  dark ? '#8891aa' : '#6b7888',
    textMuted:   dark ? '#4a5168' : '#9aa3ad',
  }
  const [activeTab, setActiveTab] = useState('info')
  const [selectedSDG] = useState(4)
  const sdgColor = sdgs.find(s => s.num === selectedSDG)?.color ?? '#333'

  // Modal state
  const [modal, setModal] = useState<null | { type: string, data?: any }>(null)
  const closeModal = () => setModal(null)

  // Info pages state (so edit/delete actually work)
  const [pages, setPages] = useState([
    { id: 1, type: 'Information', status: 'Active',   updated: '2026-05-02', title: 'Clean Water Awareness Page',    desc: 'Comprehensive information page covering access to clean water and sanitation across rural regions.',  img: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=600&q=80' },
    { id: 2, type: 'Activity',    status: 'Active',   updated: '2026-04-19', title: 'Tree Plantation Drive',          desc: 'Community activity mobilizing volunteers to plant 10,000 native saplings.',                           img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80' },
    { id: 3, type: 'Event',       status: 'Draft',    updated: '2026-05-10', title: 'Global Sustainability Summit',   desc: 'Annual flagship event bringing together partners and policymakers.',                                 img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
    { id: 4, type: 'Information', status: 'Active',   updated: '2026-05-01', title: 'SDG 4 Quality Education Hub',    desc: 'Resource hub for schools and educators aligned with quality education goals.',                       img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80' },
    { id: 5, type: 'Activity',    status: 'Active',   updated: '2026-04-28', title: 'Solar Energy Workshop Series',   desc: 'Hands-on workshops teaching students to build small solar panels.',                                  img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
    { id: 6, type: 'Event',       status: 'Inactive', updated: '2026-03-15', title: 'Zero Hunger Food Drive',         desc: 'Community food collection event supporting local shelters and food banks.',                           img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
    { id: 7, type: 'Information', status: 'Active',   updated: '2026-05-08', title: 'Gender Equality Awareness Page', desc: 'Educational content promoting gender equality in schools and workplaces.',                            img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80' },
    { id: 8, type: 'Activity',    status: 'Active',   updated: '2026-05-05', title: 'Ocean Cleanup Volunteer Drive',  desc: 'Coastal cleanup activity open to schools and community volunteers.',                                 img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
  ])
  const [editForm, setEditForm] = useState<any>(null)
  const [cases, setCases] = useState(getDetail(4).cases)
  const [caseForm, setCaseForm] = useState({ title: '', org: '', desc: '', outcome: '', img: '' })

  const tabs = [
    { id: 'info', label: 'SDG Info Pages' },
    { id: 'cases', label: 'Case Studies' },
    { id: 'impact', label: 'Impact Monitor' },
  ]

  const [infoView, setInfoView] = useState<'grid' | 'list'>('grid')
  const [infoSearch, setInfoSearch] = useState('')
  const [infoTypeFilter, setInfoTypeFilter] = useState('all')
  const [infoStatusFilter, setInfoStatusFilter] = useState('all')

  const filteredPages = pages.filter(p =>
    (infoTypeFilter === 'all' || p.type === infoTypeFilter) &&
    (infoStatusFilter === 'all' || p.status === infoStatusFilter) &&
    (p.title.toLowerCase().includes(infoSearch.toLowerCase()))
  )

  const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 7, border: `1px solid ${dark ? 'rgba(255,255,255,.12)' : '#e0e0e0'}`, fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, background: dark ? '#1f2335' : 'white', color: c.textPrimary }
  const labelStyle = { fontSize: 12, fontWeight: 600 as const, color: c.textSecond, marginBottom: 4, display: 'block' as const }

  return (
    <div style={{ padding: 24 }}>

      {/* MODAL OVERLAY */}
      {modal && (
        <div onClick={closeModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 16, padding: 28, width: 480, maxWidth: '95vw', boxShadow: '0 8px 40px rgba(0,0,0,.18)' }}>

            {/* Add Page Content */}
            {modal.type === 'add-page' && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 18 }}>Add Page Content</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div><label style={labelStyle}>Title</label><input style={inputStyle} placeholder="Page title" /></div>
                  <div><label style={labelStyle}>Type</label>
                    <select style={inputStyle}><option>Information</option><option>Activity</option><option>Event</option></select>
                  </div>
                  <div><label style={labelStyle}>Status</label>
                    <select style={inputStyle}><option>Active</option><option>Draft</option><option>Inactive</option></select>
                  </div>
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 80, resize: 'none' }} placeholder="Short description" /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8, border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={closeModal} style={{ fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0f3460', color: 'white', cursor: 'pointer' }}>Save</button>
                </div>
              </>
            )}

            {/* Edit Page */}
            {modal.type === 'edit-page' && editForm && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 18 }}>Edit Page Content</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div><label style={labelStyle}>Title</label><input style={inputStyle} value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} /></div>
                  <div><label style={labelStyle}>Type</label>
                    <select style={inputStyle} value={editForm.type} onChange={e => setEditForm({ ...editForm, type: e.target.value })}>
                      <option>Information</option><option>Activity</option><option>Event</option>
                    </select>
                  </div>
                  <div><label style={labelStyle}>Status</label>
                    <select style={inputStyle} value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                      <option>Active</option><option>Draft</option><option>Inactive</option>
                    </select>
                  </div>
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 80, resize: 'none' }} value={editForm.desc} onChange={e => setEditForm({ ...editForm, desc: e.target.value })} /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8, border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => { setPages(pages.map(p => p.id === editForm.id ? { ...p, ...editForm } : p)); closeModal() }} style={{ fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0f3460', color: 'white', cursor: 'pointer' }}>Save Changes</button>
                </div>
              </>
            )}

            {/* Delete Page */}
            {modal.type === 'delete-page' && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 10 }}>Delete Page?</div>
                <div style={{ fontSize: 13, color: '#6b7888', marginBottom: 20 }}>Are you sure you want to delete <b style={{ color: '#111827' }}>{modal.data?.title}</b>? This cannot be undone.</div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8, border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => { setPages(pages.filter(p => p.id !== modal.data?.id)); closeModal() }} style={{ fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer' }}>Delete</button>
                </div>
              </>
            )}

            {/* Sponsor Case Study */}
            {modal.type === 'sponsor-case' && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 18 }}>Sponsor a Case Study</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div><label style={labelStyle}>Case Study Title</label><input style={inputStyle} value={caseForm.title} onChange={e => setCaseForm({ ...caseForm, title: e.target.value })} placeholder="e.g. Solar Village Project" /></div>
                  <div><label style={labelStyle}>Organisation / Sponsor</label><input style={inputStyle} value={caseForm.org} onChange={e => setCaseForm({ ...caseForm, org: e.target.value })} placeholder="Organisation name" /></div>
                  <div>
                    <label style={labelStyle}>Image</label>
                    <input type="file" accept="image/*" style={{ ...inputStyle, padding: '6px 10px' }} onChange={e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = ev => setCaseForm({ ...caseForm, img: ev.target?.result as string })
                      reader.readAsDataURL(file)
                    }} />
                  </div>
                  {caseForm.img && <img src={caseForm.img} alt="preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, border: '1px solid #eef0f2' }} />}
                  <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, height: 72, resize: 'none' }} value={caseForm.desc} onChange={e => setCaseForm({ ...caseForm, desc: e.target.value })} placeholder="Brief description" /></div>
                  <div><label style={labelStyle}>Outcome</label><textarea style={{ ...inputStyle, height: 60, resize: 'none' }} value={caseForm.outcome} onChange={e => setCaseForm({ ...caseForm, outcome: e.target.value })} placeholder="Measurable outcome secured" /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                  <button onClick={closeModal} style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8, border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => {
                    if (!caseForm.title.trim()) return
                    setCases([...cases, { id: `${caseForm.org.toUpperCase()} • 2026`, title: caseForm.title, desc: caseForm.desc, outcome: `Outcome Secured: ${caseForm.outcome}`, img: caseForm.img || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80' }])
                    setCaseForm({ title: '', org: '', desc: '', outcome: '', img: '' })
                    closeModal()
                  }} style={{ fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0f3460', color: 'white', cursor: 'pointer' }}>Save</button>
                </div>
              </>
            )}

            {/* Export Report */}
            {modal.type === 'export' && (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 10 }}>Export Impact Report</div>
                <div style={{ fontSize: 13, color: '#6b7888', marginBottom: 20 }}>Choose a format to download the SDG impact breakdown report.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'CSV Data', mime: 'text/csv', ext: 'csv', content: 'SDG,Name,Impact Points,Volunteers,Projects,Progress\n4,Quality Education,9500,420,18,100%\n13,Climate Action,7200,380,15,76%\n7,Affordable & Clean Energy,6280,210,12,66%\n6,Clean Water & Sanitation,4500,160,9,47%\n3,Good Health & Well-being,3820,198,7,40%\n5,Gender Equality,2280,95,5,24%\n1,No Poverty,1420,74,4,15%' },
                    { label: 'JSON Data', mime: 'application/json', ext: 'json', content: JSON.stringify([{sdg:4,name:'Quality Education',pts:9500,volunteers:420,projects:18,pct:'100%'},{sdg:13,name:'Climate Action',pts:7200,volunteers:380,projects:15,pct:'76%'},{sdg:7,name:'Affordable & Clean Energy',pts:6280,volunteers:210,projects:12,pct:'66%'},{sdg:6,name:'Clean Water & Sanitation',pts:4500,volunteers:160,projects:9,pct:'47%'},{sdg:3,name:'Good Health & Well-being',pts:3820,volunteers:198,projects:7,pct:'40%'},{sdg:5,name:'Gender Equality',pts:2280,volunteers:95,projects:5,pct:'24%'},{sdg:1,name:'No Poverty',pts:1420,volunteers:74,projects:4,pct:'15%'}], null, 2) },
                  ].map(fmt => (
                    <button key={fmt.label} onClick={() => {
                      const blob = new Blob([fmt.content], { type: fmt.mime })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `sdg-impact-report.${fmt.ext}`
                      a.click()
                      URL.revokeObjectURL(url)
                      closeModal()
                    }} style={{ fontSize: 13, fontWeight: 500, padding: '10px 16px', borderRadius: 9, border: '1px solid #e0e0e0', background: '#f8f9fc', cursor: 'pointer', textAlign: 'left' }}>
                      ↓ {fmt.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                  <button onClick={closeModal} style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8, border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer' }}>Cancel</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* Page heading */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>SDG Management</h1>
        <p style={{ fontSize: 12, color: '#9aa3ad' }}>Configure goals, activities and impact</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 4, background: 'white', borderRadius: 12, padding: 6, border: '1px solid #eef0f2', marginBottom: 24, width: 'fit-content', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '9px 16px', borderRadius: 8, border: 'none',
            background: activeTab === tab.id ? '#0f3460' : 'transparent',
            color: activeTab === tab.id ? 'white' : '#6b7888',
            fontSize: 12.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
          }}>
            {tab.label}
          </button>
        ))}
      </div>


      {activeTab === 'info' && (
        <div>
          {/* Toolbar */}
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eef0f2', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, background: '#f8f9fc', border: '1px solid #eef0f2', borderRadius: 20, padding: '7px 14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa3ad" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={infoSearch} onChange={e => setInfoSearch(e.target.value)} placeholder="Search content..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#111827', width: '100%' }} />
            </div>
            <select value={infoTypeFilter} onChange={e => setInfoTypeFilter(e.target.value)} style={{ border: '1px solid #eef0f2', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, color: '#6b7888', background: 'white', cursor: 'pointer', outline: 'none' }}>
              <option value="all">all</option>
              <option value="Information">Information</option>
              <option value="Activity">Activity</option>
              <option value="Event">Event</option>
            </select>
            <select value={infoStatusFilter} onChange={e => setInfoStatusFilter(e.target.value)} style={{ border: '1px solid #eef0f2', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, color: '#6b7888', background: 'white', cursor: 'pointer', outline: 'none' }}>
              <option value="all">all</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setInfoView('grid')} style={{ width: 32, height: 32, borderRadius: 7, border: '1px solid #eef0f2', background: infoView === 'grid' ? '#0f3460' : 'white', color: infoView === 'grid' ? 'white' : '#6b7888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </button>
              <button onClick={() => setInfoView('list')} style={{ width: 32, height: 32, borderRadius: 7, border: '1px solid #eef0f2', background: infoView === 'list' ? '#0f3460' : 'white', color: infoView === 'list' ? 'white' : '#6b7888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#9aa3ad', marginBottom: 16 }}>Showing {filteredPages.length} of {pages.length} items</div>

          {/* Grid View */}
          {infoView === 'grid' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {filteredPages.map(page => (
                <div key={page.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,.05)' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <img src={page.img} alt={page.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute', top: 10, right: 10,
                      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                      background: page.status === 'Active' ? 'white' : page.status === 'Draft' ? 'white' : 'white',
                      color: page.status === 'Active' ? '#111827' : page.status === 'Draft' ? '#111827' : '#9aa3ad',
                      boxShadow: '0 1px 4px rgba(0,0,0,.15)'
                    }}>{page.status}</span>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#111827', background: '#f0f0f0', borderRadius: 5, padding: '3px 8px' }}>{page.type}</span>
                      <span style={{ fontSize: 11, color: '#9aa3ad' }}>Updated {page.updated}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 6 }}>{page.title}</div>
                    <div style={{ fontSize: 12, color: '#6b7888', lineHeight: 1.5, marginBottom: 14 }}>{page.desc}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => { setEditForm(page); setModal({ type: 'edit-page' }) }} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#111827', background: 'white', border: '1px solid #e0e0e0', borderRadius: 7, padding: '6px 12px', cursor: 'pointer' }}>✏️ Edit</button>
                      <button onClick={() => setModal({ type: 'delete-page', data: page })} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#ef4444', background: 'white', border: '1px solid #fecaca', borderRadius: 7, padding: '6px 12px', cursor: 'pointer' }}>🗑️ Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {infoView === 'list' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredPages.map(page => (
                <div key={page.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #eef0f2', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                  <img src={page.img} alt={page.title} style={{ width: 72, height: 52, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#111827', background: '#f0f0f0', borderRadius: 5, padding: '2px 7px' }}>{page.type}</span>
                      <span style={{ fontSize: 11, color: '#9aa3ad' }}>Updated {page.updated}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: page.status === 'Active' ? '#e6f7ec' : page.status === 'Draft' ? '#fff3e0' : '#f0f0f0', color: page.status === 'Active' ? '#00b050' : page.status === 'Draft' ? '#f4b400' : '#888' }}>{page.status}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 2 }}>{page.title}</div>
                    <div style={{ fontSize: 12, color: '#6b7888' }}>{page.desc}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => { setEditForm(page); setModal({ type: 'edit-page' }) }} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#111827', background: 'white', border: '1px solid #e0e0e0', borderRadius: 7, padding: '6px 12px', cursor: 'pointer' }}>✏️ Edit</button>
                    <button onClick={() => setModal({ type: 'delete-page', data: page })} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#ef4444', background: 'white', border: '1px solid #fecaca', borderRadius: 7, padding: '6px 12px', cursor: 'pointer' }}>🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cases' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Case Studies</div>
              <div style={{ fontSize: 11.5, color: '#9aa3ad', marginTop: 3 }}>Public success stories showing measurable NGO performance.</div>
            </div>
            <button onClick={() => setModal({ type: 'sponsor-case' })} style={{ fontSize: 12, fontWeight: 600, color: 'white', background: '#0f3460', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>+ Sponsor Case Study</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cases.map((c, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #e0e9ff', borderRadius: 12, overflow: 'hidden', display: 'flex' }}>
                <img src={c.img} alt={c.title} style={{ width: 200, flexShrink: 0, objectFit: 'cover' }} />
                <div style={{ padding: '18px 20px', flex: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#0066cc', background: '#e6f0ff', borderRadius: 5, padding: '3px 8px', letterSpacing: '0.5px' }}>{c.id}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 10, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7888', marginBottom: 10 }}>{c.desc}</div>
                  <div style={{ fontSize: 11.5, color: '#1a7a4a', background: '#e6f7ec', borderRadius: 7, padding: '8px 12px' }}>{c.outcome}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'impact' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>SDG Impact Monitor</div>
              <div style={{ fontSize: 12, color: '#9aa3ad', marginTop: 3 }}>Track real-time progress across all 17 goals</div>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Total Impact Points', value: '48,320', color: '#3b6ef6', sub: '+12% this month' },
              { label: 'Active Youth Volunteers', value: '2,140', color: '#10b981', sub: '+34 this week' },
              { label: 'Projects Completed', value: '89', color: '#f59e0b', sub: 'Across 17 SDGs' },
              { label: 'Schools Engaged', value: '142', color: '#8b5cf6', sub: '+5 new schools' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #eef0f2', boxShadow: '0 1px 4px rgba(0,0,0,.05)', borderTop: `3px solid ${s.color}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9aa3ad', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#111827', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>↑ {s.sub}</div>
              </div>
            ))}
          </div>

          {/* Per-SDG Impact Table */}
          <div style={{ background: 'white', borderRadius: 14, border: '1px solid #eef0f2', boxShadow: '0 1px 4px rgba(0,0,0,.05)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #eef0f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Impact Breakdown by SDG</div>
              <button onClick={() => setModal({ type: 'export' })} style={{ fontSize: 12, fontWeight: 600, color: '#0f3460', background: '#e6f0ff', border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }}>↓ Export Report</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 1.5fr', gap: 8, padding: '10px 22px', background: '#f8f9fc', borderBottom: '1px solid #eef0f2' }}>
              {['#', 'SDG GOAL', 'IMPACT PTS', 'VOLUNTEERS', 'PROJECTS', 'PROGRESS'].map((h, i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 700, color: '#9aa3ad', letterSpacing: '0.5px' }}>{h}</div>
              ))}
            </div>
            {[
              { num: 4,  name: 'Quality Education',         color: '#c5192d', pts: 9500,  volunteers: 420, projects: 18, pct: 100 },
              { num: 13, name: 'Climate Action',            color: '#3f7e44', pts: 7200,  volunteers: 380, projects: 15, pct: 76  },
              { num: 7,  name: 'Affordable & Clean Energy', color: '#fcc30b', pts: 6280,  volunteers: 210, projects: 12, pct: 66  },
              { num: 6,  name: 'Clean Water & Sanitation',  color: '#26bde2', pts: 4500,  volunteers: 160, projects: 9,  pct: 47  },
              { num: 3,  name: 'Good Health & Well-being',  color: '#4c9f38', pts: 3820,  volunteers: 198, projects: 7,  pct: 40  },
              { num: 5,  name: 'Gender Equality',           color: '#ff3a21', pts: 2280,  volunteers: 95,  projects: 5,  pct: 24  },
              { num: 1,  name: 'No Poverty',                color: '#e5243b', pts: 1420,  volunteers: 74,  projects: 4,  pct: 15  },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 1.5fr', gap: 8, padding: '14px 22px', borderBottom: '1px solid #f5f5f5', alignItems: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: row.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>{row.num}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{row.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{row.pts.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: '#6b7888' }}>{row.volunteers}</span>
                <span style={{ fontSize: 13, color: '#6b7888' }}>{row.projects}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 4, background: '#f0f0f0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#111827', minWidth: 32 }}>{row.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  )
}
