import AnimatedSection from '../components/AnimatedSection'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setErrMsg(data.message || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrMsg('Could not connect to server. Please try again.')
      setStatus('error')
    }
  }

  const inputStyle = {
    width:'100%', background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(255,255,255,0.1)', borderRadius:10,
    padding:'0.85rem 1rem', color:'#fff', fontSize:'0.9rem',
    outline:'none', fontFamily:'DM Sans, sans-serif', transition:'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding:'7rem 5%' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'4rem', alignItems:'start' }}>

        <AnimatedSection>
          <div style={{ fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'var(--accent)', fontWeight:500, marginBottom:'0.7rem' }}>Get in Touch</div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'clamp(1.9rem, 3.5vw, 2.6rem)', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:'1.2rem' }}>Let's Start a<br/>Conversation</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:1.8, fontWeight:300, marginBottom:'2.5rem' }}>Have a data project? Need ongoing support? We'll get back to you within 24 hours.</p>
          {[
            { icon:'📧', label:'Email', value:'vynquora@gmail.com' },
            { icon:'🌐', label:'Website', value:'www.vynquora.com' },
            { icon:'📍', label:'Location', value:'bengaluru India' },
          ].map(c => (
            <div key={c.label} style={{ display:'flex', gap:'1rem', alignItems:'center', marginBottom:'1.2rem' }}>
              <div style={{ width:42, height:42, borderRadius:10, background:'rgba(26,58,255,0.15)', border:'1px solid rgba(77,108,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize:'0.72rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{c.label}</div>
                <div style={{ fontSize:'0.93rem', fontWeight:500 }}>{c.value}</div>
              </div>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, padding:'2.5rem' }}>
            {status === 'success' ? (
              <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
                <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
                <h3 style={{ fontFamily:'Syne', fontSize:'1.4rem', fontWeight:700, marginBottom:'0.5rem' }}>Message Sent!</h3>
                <p style={{ color:'var(--muted)', fontWeight:300 }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:'1rem' }}>
                  <div>
                    <label style={{ fontSize:'0.75rem', color:'var(--muted)', display:'block', marginBottom:'0.4rem' }}>Full Name *</label>
                    <input name="name" placeholder="Your name" required style={inputStyle} value={form.name} onChange={handle}
                      onFocus={e => e.target.style.borderColor='rgba(77,108,255,0.5)'}
                      onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize:'0.75rem', color:'var(--muted)', display:'block', marginBottom:'0.4rem' }}>Email *</label>
                    <input name="email" type="email" placeholder="you@company.com" required style={inputStyle} value={form.email} onChange={handle}
                      onFocus={e => e.target.style.borderColor='rgba(77,108,255,0.5)'}
                      onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize:'0.75rem', color:'var(--muted)', display:'block', marginBottom:'0.4rem' }}>Company</label>
                  <input name="company" placeholder="Company name (optional)" style={inputStyle} value={form.company} onChange={handle}
                    onFocus={e => e.target.style.borderColor='rgba(77,108,255,0.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize:'0.75rem', color:'var(--muted)', display:'block', marginBottom:'0.4rem' }}>Message *</label>
                  <textarea name="message" placeholder="Tell us about your project..." required rows={5}
                    style={{ ...inputStyle, resize:'vertical', lineHeight:1.6 }}
                    value={form.message} onChange={handle}
                    onFocus={e => e.target.style.borderColor='rgba(77,108,255,0.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                  />
                </div>
                {status === 'error' && (
                  <p style={{ color:'#ff6b6b', fontSize:'0.83rem', margin:0 }}>{errMsg}</p>
                )}
                <button type="submit" disabled={status==='loading'} style={{
                  background: status==='loading' ? 'var(--blue3)' : 'var(--blue)',
                  color:'#fff', border:'none', padding:'0.9rem', borderRadius:10,
                  fontFamily:'DM Sans, sans-serif', fontSize:'0.93rem', fontWeight:500,
                  cursor: status==='loading' ? 'not-allowed' : 'pointer', transition:'all 0.25s', marginTop:'0.4rem'
                }}
                  onMouseEnter={e => { if(status!=='loading'){ e.currentTarget.style.background='var(--blue2)'; e.currentTarget.style.transform='translateY(-2px)' }}}
                  onMouseLeave={e => { e.currentTarget.style.background='var(--blue)'; e.currentTarget.style.transform='none' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
