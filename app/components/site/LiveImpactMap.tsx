"use client"

import React, { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { Search, School, ClipboardList, Users, X, MapPin } from "lucide-react"
import { Reveal } from "@/app/components/reveal"
import { useTheme } from "@/app/components/ThemeProvider"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

type ProjectDot = { name: string; lat: number; lng: number; schools: number; students: string }

const projectDots: ProjectDot[] = [
  { name: "India", lat: 22.0, lng: 78.0, schools: 420, students: "85,000+" },
  { name: "Nepal", lat: 28.0, lng: 84.0, schools: 62, students: "12,500+" },
  { name: "Bangladesh", lat: 23.7, lng: 90.4, schools: 54, students: "11,500+" },
  { name: "Pakistan", lat: 30.0, lng: 70.0, schools: 54, students: "11,500+" },
  { name: "Sri Lanka", lat: 7.9, lng: 80.7, schools: 16, students: "3,200+" },
  { name: "Kenya", lat: -0.5, lng: 37.5, schools: 115, students: "23,300+" },
  { name: "Uganda", lat: 1.4, lng: 32.3, schools: 26, students: "5,400+" },
  { name: "Tanzania", lat: -6.4, lng: 35.0, schools: 22, students: "4,600+" },
  { name: "Rwanda", lat: -2.0, lng: 29.9, schools: 18, students: "3,700+" },
  { name: "Ethiopia", lat: 9.1, lng: 40.5, schools: 29, students: "6,100+" },
  { name: "Nigeria", lat: 9.0, lng: 8.7, schools: 54, students: "11,100+" },
  { name: "Ghana", lat: 7.9, lng: -1.0, schools: 21, students: "4,400+" },
  { name: "Philippines", lat: 12.9, lng: 122.0, schools: 23, students: "4,800+" },
  { name: "Indonesia", lat: -3.5, lng: 117.0, schools: 27, students: "5,700+" },
  { name: "Myanmar", lat: 19.0, lng: 96.5, schools: 18, students: "3,800+" },
  { name: "Cambodia", lat: 12.6, lng: 104.9, schools: 15, students: "3,100+" },
  { name: "USA", lat: 39.5, lng: -98.4, schools: 43, students: "12,300+" },
  { name: "Brazil", lat: -14.0, lng: -51.9, schools: 34, students: "7,300+" },
  { name: "Mexico", lat: 23.6, lng: -102.5, schools: 17, students: "3,800+" },
  { name: "UK", lat: 54.0, lng: -2.5, schools: 12, students: "2,800+" },
  { name: "Germany", lat: 51.2, lng: 10.5, schools: 9, students: "2,100+" },
  { name: "Australia", lat: -27.0, lng: 133.8, schools: 18, students: "4,300+" },
]

type Region = { level: "high" | "medium" | "low"; schools: number; projects: number; students: string; ngos?: number }

const regionData: Record<string, Region> = {
  "356": { level: "high", schools: 420, projects: 120, students: "85,000+", ngos: 35 },
  "840": { level: "low", schools: 80, projects: 25, students: "12,000+", ngos: 10 },
  "404": { level: "medium", schools: 150, projects: 45, students: "25,000+", ngos: 18 },
  "524": { level: "medium", schools: 95, projects: 30, students: "14,000+", ngos: 12 },
}

const countryNames: Record<string, string> = {
  "356": "India", "840": "United States", "404": "Kenya", "524": "Nepal",
}

const levelMeta = {
  high:   { color: "#06B6D4", label: "High Impact" },
  medium: { color: "#22C55E", label: "Medium Impact" },
  low:    { color: "#F97316", label: "Low Impact" },
}

const stats = [
  { icon: School,        value: "1,240+", label: "Schools Supported",  accent: "#06B6D4" },
  { icon: ClipboardList, value: "560+",   label: "Projects Completed", accent: "#22C55E" },
  { icon: Users,         value: "380K+",  label: "Students Enrolled",  accent: "#F97316" },
  { icon: MapPin,        value: "320+",   label: "NGO Partners",       accent: "#A78BFA" },
]

export function LiveImpactMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [hoveredDot, setHoveredDot]   = useState<ProjectDot | null>(null)
  const [search, setSearch]           = useState("")
  const [suggestions, setSuggestions] = useState<{ id: string; name: string }[]>([])
  const [selected, setSelected]       = useState<string | null>(null)

  const countryList = Object.entries(countryNames).map(([id, name]) => ({ id, name }))

  const onSearchChange = (value: string) => {
    setSearch(value)
    if (!value) return setSuggestions([])
    const q = value.toLowerCase()
    setSuggestions(countryList.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6))
  }

  const clearAll = () => { setSelected(null); setSearch(""); setSuggestions([]) }

  const selectedData    = selected ? regionData[selected] : null
  const selectedCountry = selected ? countryNames[selected] : null

  const mapBg       = isDark ? "#0B1120" : "#EEF2FF"
  const defaultFill = isDark ? "#1E2A45" : "#C7D2F0"
  const dimFill     = isDark ? "#111827" : "#D9E0F5"
  const strokeColor = isDark ? "#2D3F60" : "#A8B8E8"
  const tooltipBg   = isDark ? "#0f172a" : "#1e293b"

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Impact across the world
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted-text)" }}>
            Track education impact across schools, NGOs and partner regions.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-text)" }} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search country…"
              className="w-full pl-11 pr-10 py-2.5 rounded-xl text-sm outline-none transition"
              style={{
                background: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            />
            {(search || selected) && (
              <button onClick={clearAll} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition"
                style={{ color: "var(--muted-text)" }}>
                <X className="w-4 h-4" />
              </button>
            )}
            {suggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1.5 rounded-xl overflow-hidden shadow-xl"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                {suggestions.map((s) => (
                  <button key={s.id}
                    onClick={() => { setSelected(s.id); setSearch(s.name); setSuggestions([]) }}
                    className="w-full text-left px-4 py-2.5 text-sm transition"
                    style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#1E2A45" : "#EEF2FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main map card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          {/* Map */}
          <div className="relative w-full h-[420px] md:h-[580px] lg:h-[680px]" style={{ background: mapBg }}>
            <ComposableMap projectionConfig={{ scale: 155, center: [10, 5] }} width={800} height={500}
              className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) => (
                  <>
                    {geographies.map((geo) => {
                      const id   = String(geo.id)
                      const data = regionData[id]
                      const isSel = selected === id
                      const fill = isSel
                        ? "#06B6D4"
                        : selected
                          ? dimFill
                          : data
                            ? levelMeta[data.level].color
                            : defaultFill
                      return (
                        <Geography key={geo.rsmKey} geography={geo}
                          onClick={() => { setSelected(id); setSearch(countryNames[id] || ""); setSuggestions([]) }}
                          style={{
                            default: {
                              fill, stroke: strokeColor, strokeWidth: isSel ? 1.0 : 0.3,
                              outline: "none", transition: "fill 0.15s ease",
                              opacity: selected && !isSel ? 0.35 : 1,
                            },
                            hover:   { fill: "#0EA5E9", outline: "none", cursor: "pointer" },
                            pressed: { outline: "none" },
                          }}
                        />
                      )
                    })}
                    {projectDots.map((dot) => (
                      <Marker key={dot.name} coordinates={[dot.lng, dot.lat]}
                        onMouseEnter={() => setHoveredDot(dot)}
                        onMouseLeave={() => setHoveredDot(null)}>
                        <circle r={9} fill="#F59E0B" opacity={0.15}>
                          <animate attributeName="r" values="5;13" dur="1.8s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0" dur="1.8s" repeatCount="indefinite" />
                        </circle>
                        <circle r={4} fill="#F59E0B" stroke="#fff" strokeWidth={1.5} style={{ cursor: "pointer" }} />
                        {hoveredDot?.name === dot.name && (
                          <g transform="translate(7, -40)">
                            <rect rx={6} ry={6} width={162} height={38} fill={tooltipBg} opacity={0.96} />
                            <text x={9} y={15} fill="#fbbf24" fontSize={9} fontWeight={700}>{dot.name}</text>
                            <text x={9} y={28} fill="#94a3b8" fontSize={7.5}>{dot.schools} schools · {dot.students} students</text>
                          </g>
                        )}
                      </Marker>
                    ))}
                  </>
                )}
              </Geographies>
            </ComposableMap>
          </div>


        </div>

        {/* Selected country detail */}
        {selected && selectedData && (
          <div className="mt-4 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            {[
              { label: "Schools", value: String(selectedData.schools) },
              { label: "Projects", value: String(selectedData.projects) },
              { label: "Students", value: selectedData.students },
              { label: "NGOs", value: String(selectedData.ngos ?? "—") },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-lg font-bold" style={{ color: "#06B6D4" }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{label}</div>
              </div>
            ))}
          </div>
        )}
        {selected && !selectedData && (
          <div className="mt-4 rounded-xl p-3 text-sm text-center"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-text)" }}>
            No impact data available yet for this country.
          </div>
        )}

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, accent }) => (
            <div key={label} className="rounded-xl p-4 flex items-center gap-3 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <div>
                <div className="text-xl font-bold leading-tight" style={{ color: "var(--foreground)" }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </Reveal>
  )
}
