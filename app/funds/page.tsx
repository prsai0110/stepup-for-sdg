'use client'

import { useState } from 'react'
import { addDonation } from '@/app/lib/adminStore'

export default function FundsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [payTab, setPayTab] = useState<'upi'|'card'|'netbanking'>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNo, setCardNo] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [paying, setPaying] = useState(false)

  const presetAmounts = [500, 1000, 2500, 5000]
  const finalAmount = customAmount || amount

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!finalAmount) return; setShowPayModal(true) }
  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      addDonation({
        name,
        email,
        phone,
        amount: Number(finalAmount),
        message,
        method: payTab,
      })
      setPaying(false); setShowPayModal(false); setSubmitted(true)
    }, 2000)
  }

  const inp: React.CSSProperties = {
    width: '100%', border: '1.5px solid var(--border)', borderRadius: 8,
    padding: '7px 10px', fontSize: 12, outline: 'none',
    color: 'var(--foreground)', background: 'var(--card)', boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--muted-text)',
    letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5,
  }

  if (submitted) return (
    <div style={{ height: '100vh', background: 'linear-gradient(135deg, #0f3460 0%, #00b8d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: 24, padding: '40px 36px', textAlign: 'center', maxWidth: 400, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 26, color: 'white' }}>✓</div>
        <div style={{ display: 'inline-block', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#16a34a', fontWeight: 700, marginBottom: 12 }}>DONATION SUCCESSFUL</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Thank You, {name}!</h2>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#0f3460', marginBottom: 10 }}>₹{Number(finalAmount).toLocaleString()}</div>
        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 20 }}>Confirmation will be sent to <strong style={{ color: '#0f3460' }}>{email}</strong>.</p>
        <button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setPhone(''); setAmount(''); setCustomAmount(''); setMessage('') }}
          style={{ background: 'linear-gradient(135deg, #0f3460, #00b8d4)', color: 'white', border: 'none', borderRadius: 10, padding: '11px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Make Another Donation
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: 'var(--background)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '5%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,93,252,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,255,0.10) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f3460 0%, #0e6fa3 60%, #00b8d4 100%)', borderBottom: '1px solid rgba(0,194,255,0.15)', padding: '40px 28px 54px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 14px', fontSize: 11, color: 'white', fontWeight: 700, marginBottom: 8, border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
          🌍 Support the Unite 2030 Mission
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4, lineHeight: 1.2, letterSpacing: '-0.5px' }}>Fund the Change You Want to See</h1>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.5 }}>Your contribution directly supports SDG-aligned student projects, events, and community initiatives across India.</p>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', marginTop: '-40px', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'var(--card)', backdropFilter: 'blur(16px)', borderRadius: 18, boxShadow: '0 8px 40px rgba(0,0,0,0.15)', overflow: 'hidden', border: '1px solid var(--border)', width: '100%', maxWidth: 660 }}>

          {/* Form Header */}
          <div style={{ background: 'linear-gradient(135deg, #0f3460 0%, #0e6fa3 60%, #00b8d4 100%)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: 'white', fontSize: 16, fontWeight: 800 }}>Make a Donation</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>100% goes directly to SDG projects</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Secured by</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>Razorpay</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '16px 20px 14px' }}>

            {/* Personal Info */}
            <div style={{ marginBottom: 10 }}>
              <label style={lbl}>Your Details</label>
              <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={{ ...inp, flex: 1 }} onFocus={e => e.target.style.borderColor='#00C2FF'} onBlur={e => e.target.style.borderColor='rgba(170,182,200,0.2)'} />
                <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" type="tel" style={{ ...inp, flex: 1 }} onFocus={e => e.target.style.borderColor='#00C2FF'} onBlur={e => e.target.style.borderColor='rgba(170,182,200,0.2)'} />
              </div>
              <input required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" type="email" style={inp} onFocus={e => e.target.style.borderColor='#00C2FF'} onBlur={e => e.target.style.borderColor='rgba(170,182,200,0.2)'} />
            </div>

            {/* Amount */}
            <div style={{ marginBottom: 10 }}>
              <label style={lbl}>Donation Amount (₹)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 8 }}>
                {presetAmounts.map(a => (
                  <div key={a} style={{ position: 'relative' }}>
                    {a === 1000 && <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: '#0f3460', color: 'white', fontSize: 8, fontWeight: 700, borderRadius: 5, padding: '2px 6px', whiteSpace: 'nowrap', zIndex: 1 }}>POPULAR</div>}
                    <button type="button" onClick={() => { setAmount(String(a)); setCustomAmount('') }} style={{ width: '100%', padding: '8px 0', borderRadius: 8, border: amount === String(a) && !customAmount ? '2px solid #00C2FF' : '1.5px solid var(--border)', background: amount === String(a) && !customAmount ? 'linear-gradient(135deg, #155DFC, #00C2FF)' : 'var(--background)', color: amount === String(a) && !customAmount ? 'white' : 'var(--muted-text)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      ₹{a.toLocaleString()}
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 700, color: 'var(--muted-text)', pointerEvents: 'none' }}>₹</span>
                <input value={customAmount} onChange={e => { setCustomAmount(e.target.value); setAmount('') }} placeholder="Enter custom amount" type="number" min="1" style={{ ...inp, paddingLeft: 22 }} onFocus={e => e.target.style.borderColor='#00C2FF'} onBlur={e => e.target.style.borderColor='rgba(170,182,200,0.2)'} />
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: 10 }}>
              <label style={lbl}>Message <span style={{ color: '#cbd5e1', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Why are you donating? Leave a message..." rows={2} style={{ ...inp, resize: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }} onFocus={e => e.target.style.borderColor='#00C2FF'} onBlur={e => e.target.style.borderColor='rgba(170,182,200,0.2)'} />
            </div>

            {/* Summary */}
            {finalAmount && (
              <div style={{ background: 'rgba(0,176,80,0.12)', border: '1.5px solid rgba(0,176,80,0.4)', borderRadius: 10, padding: '8px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#16a34a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</span>
                <p style={{ fontSize: 12, color: '#4ade80', fontWeight: 600, margin: 0 }}>Donating <span style={{ fontSize: 14, fontWeight: 800 }}>₹{Number(finalAmount).toLocaleString()}</span> to SDG projects</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={!finalAmount || !name || !email || !phone}
              style={{ width: '100%', border: 'none', borderRadius: 10, padding: '12px', fontSize: 13.5, fontWeight: 800, color: 'white', cursor: !finalAmount || !name || !email || !phone ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #155DFC, #00C2FF)', opacity: (!finalAmount || !name || !email || !phone) ? 0.45 : 1, boxShadow: (!finalAmount || !name || !email || !phone) ? 'none' : '0 6px 20px rgba(0,194,255,0.35)' }}>
              {`Donate ₹${finalAmount ? Number(finalAmount).toLocaleString() : '—'} via Razorpay →`}
            </button>
          </form>
        </div>
      </div>


      {/* Payment Modal */}
      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 16, width: '100%', maxWidth: 420, boxShadow: '0 24px 60px rgba(0,0,0,0.3)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f3460, #0e6fa3)', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💙</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>StepUp for SDG</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>Amount: ₹{Number(finalAmount).toLocaleString()}</div>
                </div>
              </div>
              <button onClick={() => setShowPayModal(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              {([['upi', '📱 UPI'], ['card', '💳 Card'], ['netbanking', '🏦 Net Banking']] as const).map(([id, label]) => (
                <button key={id} type="button" onClick={() => setPayTab(id)} style={{ flex: 1, padding: '10px 8px', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, background: payTab === id ? 'white' : '#f8fafc', color: payTab === id ? '#0f3460' : '#94a3b8', borderBottom: payTab === id ? '2.5px solid #0f3460' : '2.5px solid transparent' }}>{label}</button>
              ))}
            </div>
            <div style={{ padding: '16px' }}>
              {payTab === 'upi' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f3460' }}>Scan QR Code</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>Use any UPI app to scan and pay</div>
                  </div>
                  <div style={{ width: 120, height: 120, margin: '0 auto', background: 'white', borderRadius: 8, padding: 6, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
                      <rect x="4" y="4" width="34" height="34" rx="3" fill="#0f3460"/><rect x="11" y="11" width="20" height="20" rx="1.5" fill="white"/><rect x="15" y="15" width="12" height="12" rx="1" fill="#0f3460"/>
                      <rect x="82" y="4" width="34" height="34" rx="3" fill="#0f3460"/><rect x="89" y="11" width="20" height="20" rx="1.5" fill="white"/><rect x="93" y="15" width="12" height="12" rx="1" fill="#0f3460"/>
                      <rect x="4" y="82" width="34" height="34" rx="3" fill="#0f3460"/><rect x="11" y="89" width="20" height="20" rx="1.5" fill="white"/><rect x="15" y="93" width="12" height="12" rx="1" fill="#0f3460"/>
                      {[46,54,62,70,46,62,70,50,58,66,50,66].map((x,i)=>(<rect key={i} x={x} y={[4,4,4,4,14,14,14,24,24,24,34,34][i]} width="6" height="6" rx="1" fill="#0f3460"/>))}
                      {[46,54,62,70,46,54,62,70,46,54,62,70].map((x,i)=>(<rect key={i+20} x={x} y={[46,46,46,46,56,56,56,56,66,66,66,66][i]} width="6" height="6" rx="1" fill="#0f3460"/>))}
                    </svg>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" style={{ ...inp, flex: 1, color: '#000', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} onFocus={e => e.target.style.borderColor='#0f3460'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                    <button type="button" onClick={handlePay} style={{ background: '#0f3460', color: 'white', border: 'none', borderRadius: 8, padding: '0 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Verify</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                      <button key={app} type="button" onClick={handlePay} style={{ fontSize: 10, fontWeight: 700, color: '#0f3460', background: '#eef2ff', border: '1px solid #c7d7fc', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}>{app}</button>
                    ))}
                  </div>
                </div>
              )}
              {payTab === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on Card" style={{ ...inp, color: '#000', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} onFocus={e => e.target.style.borderColor='#0f3460'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                  <input value={cardNo} onChange={e => setCardNo(e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})/g,'$1 ').trim())} placeholder="Card Number" style={{ ...inp, color: '#000', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} onFocus={e => e.target.style.borderColor='#0f3460'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input value={cardExp} onChange={e => setCardExp(e.target.value)} placeholder="MM / YY" style={{ ...inp, flex: 1, color: '#000', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} onFocus={e => e.target.style.borderColor='#0f3460'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                    <input value={cardCvv} onChange={e => setCardCvv(e.target.value.slice(0,3))} placeholder="CVV" type="password" style={{ ...inp, flex: 1, color: '#000', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} onFocus={e => e.target.style.borderColor='#0f3460'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                  </div>
                </div>
              )}
              {payTab === 'netbanking' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[{name:'SBI',color:'#1a3a8f'},{name:'HDFC',color:'#004c8f'},{name:'ICICI',color:'#b5261e'},{name:'Axis',color:'#97144d'},{name:'Kotak',color:'#e8222b'},{name:'Others',color:'#475569'}].map(b => (
                    <button key={b.name} type="button" onClick={() => setSelectedBank(b.name)} style={{ padding: '12px 8px', borderRadius: 8, cursor: 'pointer', border: selectedBank === b.name ? `2px solid ${b.color}` : `1.5px solid ${b.color}30`, background: selectedBank === b.name ? `${b.color}15` : `${b.color}08`, color: b.color, fontWeight: 700, fontSize: 12 }}>{b.name}</button>
                  ))}
                </div>
              )}
              <button type="button" onClick={handlePay} disabled={paying} style={{ width: '100%', marginTop: 14, border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 800, color: 'white', background: 'linear-gradient(135deg, #0f3460, #00b8d4)', cursor: paying ? 'not-allowed' : 'pointer', opacity: paying ? 0.7 : 1 }}>
                {paying ? '⏳ Processing...' : `Pay ₹${Number(finalAmount).toLocaleString()}`}
              </button>
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>🔒 Secured by </span>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#0f3460' }}>Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
