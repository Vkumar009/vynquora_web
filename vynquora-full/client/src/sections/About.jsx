import AnimatedSection from '../components/AnimatedSection'

const pillars = [
  { num:'01', title:'Accuracy First', body:'We treat every record as critical. Our operators are trained to verify data at every step — no shortcuts.' },
  { num:'02', title:'Confidentiality Guaranteed', body:'Client data, credentials, and business records are handled with strict security and full discretion.' },
  { num:'03', title:'Fast Turnaround', body:'Deadlines matter. We structure our workflow so your data is ready when you need it.' },
  { num:'04', title:'Scalable Operations', body:'Start small and grow. As your data volumes increase, our team scales to match your needs.' },
]

export default function About() {
  return (
    <section id="about" style={{ padding:'7rem 5%' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'4rem', alignItems:'center' }}>
        <AnimatedSection>
          <div style={{ fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'var(--accent)', fontWeight:500, marginBottom:'0.7rem' }}>About Vynquora</div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'clamp(1.9rem, 3.5vw, 2.6rem)', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:'1.2rem' }}>A New Kind of<br/>Data Partner</h2>
          <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:1.8, fontWeight:300, marginBottom:'1.1rem' }}>Vynquora was built with a clear purpose: give businesses access to reliable, accurate data operations — without the overhead of building an in-house team.</p>
          <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:1.8, fontWeight:300, marginBottom:'2.5rem' }}>We're a growing company, which means every client gets personal attention. No massive corporate queues — just dedicated professionals who care about getting it right.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>
            {pillars.map((p, i) => (
              <AnimatedSection key={p.num} delay={i * 0.1}>
                <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1.2rem 1.3rem', background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, transition:'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='rgba(77,108,255,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                >
                  <span style={{ fontFamily:'Syne', fontSize:'1.6rem', fontWeight:800, color:'rgba(77,108,255,0.3)', minWidth:36, lineHeight:1 }}>{p.num}</span>
                  <div>
                    <strong style={{ display:'block', fontWeight:500, fontSize:'0.93rem', marginBottom:'0.25rem' }}>{p.title}</strong>
                    <p style={{ fontSize:'0.83rem', color:'var(--muted)', fontWeight:300, lineHeight:1.6 }}>{p.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div style={{ background:'var(--navy2)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'2.5rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle, rgba(26,58,255,0.18) 0%, transparent 70%)', pointerEvents:'none' }}/>
            <img src="/logo.png" alt="Vynquora" style={{ width:120, height:120, borderRadius:'50%', objectFit:'cover', marginBottom:'1.4rem', filter:'drop-shadow(0 0 24px rgba(26,58,255,0.35))', position:'relative', zIndex:1 }}/>
            <h3 style={{ fontFamily:'Syne', fontSize:'1.4rem', fontWeight:700, marginBottom:'0.5rem' }}>Vynquora</h3>
            <p style={{ color:'var(--muted)', fontSize:'0.88rem', fontWeight:300, lineHeight:1.65 }}>Connecting precision data management with businesses that need it most.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem', marginTop:'1.4rem', justifyContent:'center' }}>
              {['Data Entry','Medical Records','QC Verified','Secure','Reliable'].map(t => (
                <span key={t} style={{ background:'rgba(26,58,255,0.15)', border:'1px solid rgba(77,108,255,0.25)', color:'var(--off)', fontSize:'0.7rem', padding:'0.25rem 0.75rem', borderRadius:100 }}>{t}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
