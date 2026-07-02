'use client'

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const PARTICLE_COLORS = [
  "#0066cc", "#00a8a8", "#00b050", "#8cc63f", "#f4b400",
  "#ff7a00", "#ff5e5b", "#d63384", "#7b61ff", "#0cc0df"
]

function GlobeIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let frameId: number
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const count = Math.min(60, Math.floor((w * h) / 18000))
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2.5 + 1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
      angle: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const bg = ctx.createLinearGradient(0, 0, w, h)
      bg.addColorStop(0, "#080b11")
      bg.addColorStop(0.5, "#0f172a")
      bg.addColorStop(1, "#03060a")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      dots.forEach((dot, i) => {
        dot.x += dot.vx
        dot.y += dot.vy
        dot.angle += 0.015
        dot.y += Math.sin(dot.angle) * 0.1

        if (dot.x < -10) dot.x = w + 10
        if (dot.x > w + 10) dot.x = -10
        if (dot.y < -10) dot.y = h + 10
        if (dot.y > h + 10) dot.y = -10

        ctx.fillStyle = dot.color
        ctx.globalAlpha = dot.alpha
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j]
          const dist = Math.hypot(dot.x - other.x, dot.y - other.y)
          if (dist < 130) {
            ctx.strokeStyle = dot.color
            ctx.globalAlpha = ((130 - dist) / 130) * 0.2
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      frameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    alert("Account created! Please sign in.")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      <div className="container relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 grid md:grid-cols-12 min-h-120">

          {/* left side */}
          <div
            className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border-r border-white/20"
            style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a8a8 50%, #1d5948 100%)' }}
          >
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/20 border border-white/30 text-white font-semibold text-xs">
                <GlobeIcon />
                <span>UN-SDG Monitoring Hub</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img src="/SDG_LOGO-removebg-preview.png" alt="StepUp for SDG" className="w-20 h-20 object-contain shrink-0" style={{ filter: 'brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.4))' }} />
                  <h1 className="text-2xl font-bold text-white">StepUp SDG</h1>
                </div>
                <p className="text-white/80 text-xs leading-relaxed max-w-sm">
                  Tracking and aligning local actions to the UN Sustainable Development Goals.
                </p>
                <div className="mt-3 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img src="/SDG illustration.png" alt="SDG Illustration" className="w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="relative z-10 pt-4 border-t border-white/20">
              <p className="text-[11px] text-white/60 text-center font-semibold tracking-widest uppercase">
                Empowering Change · SDG 2030
              </p>
            </div>
          </div>

          {/* right side */}
          <div
            className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center"
            style={{ background: 'linear-gradient(160deg, #fefefe 0%, #f0fdf4 40%, #eff6ff 100%)' }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm mx-auto space-y-4"
            >
              <div className="space-y-1">
                <img src="/SDG_LOGO-removebg-preview.png" alt="StepUp for SDG" className="w-14 h-14 object-contain" />
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create an Account</h2>
                <p className="text-xs text-slate-500 font-medium">Join the SDG movement today.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all"
                >
                  Register
                </button>

                <div className="text-center pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/admin/login")}
                    className="text-blue-600 hover:text-blue-700 hover:underline font-bold ml-1 bg-transparent border-0 cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
