import AnimatedSection from '../components/AnimatedSection'

const steps = [
  { n:'01', title:'Requirement Intake', desc:'We understand scope — data type, volume, format, deadlines — before any work begins.' },
  { n:'02', title:'Secure Setup', desc:'Data is shared through secure channels. Credentials and access are handled with full confidentiality.' },
  { n:'03', title:'Processing & QC', desc:'Operators process data with simultaneous quality checks. Every entry verified before submission.' },
  { n:'04', title:'Delivery & Review', desc:'Clean, structured data delivered on time. Revisions handled immediately if anything needs adjustment.' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding:'7rem 5%', background:'var(--navy2)' }}>
      <AnimatedSection>
        <div style={{ textAlign:'center', marginBottom:'4rem' }}>
          <div style={{ fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'var(--accent)', fontWeight:500, marginBottom:'0.7rem' }}>How We Work</div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'clamp(1.9rem, 4vw, 2.8rem)', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:'1rem' }}>A Process You Can Trust</h2>
          <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:460, margin:'0 auto', fontWeight:300, lineHeight:1.7 }}>Four clear stages from kickoff to delivery — no guesswork, no surprises.</p>
        </div>
      </AnimatedSection>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'2rem', position:'relative' }}>
        {steps.map((s, i) => (
          <AnimatedSection key={s.n} delay={i * 0.1}>
            <div style={{ textAlign:'center', padding:'0 0.5rem' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--navy)', border:'2px solid var(--blue3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.4rem', fontFamily:'Syne', fontSize:'1rem', fontWeight:700, color:'var(--accent)' }}>{s.n}</div>
              <h3 style={{ fontFamily:'Syne', fontSize:'1rem', fontWeight:600, marginBottom:'0.55rem' }}>{s.title}</h3>
              <p style={{ color:'var(--muted)', fontSize:'0.84rem', lineHeight:1.65, fontWeight:300 }}>{s.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
