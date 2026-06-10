import AnimatedSection from '../components/AnimatedSection'
import { useState } from 'react'

const services = [
  { icon:'📋', title:'Data Entry Services', desc:'Accurate, fast, structured data entry for medical records, business databases, and forms — with strict quality checks at every step.', tags:['Medical Data','Forms','Databases'] },
  { icon:'🔍', title:'Data Verification & QC', desc:'Every record verified against source documents. We catch errors before they become problems — ensuring your data is trustworthy.', tags:['Error Checking','Validation','QC Reports'] },
  { icon:'📁', title:'Document Processing', desc:'Digitisation, indexing, and organisation of physical and digital documents into structured formats your team can actually use.', tags:['Digitisation','Indexing','Archiving'] },
  { icon:'🏥', title:'Medical Data Management', desc:'Specialised handling of medical records and patient data — with full attention to accuracy, confidentiality, and compliance.', tags:['Patient Records','Healthcare','Confidential'] },
  { icon:'📊', title:'Data Reporting', desc:'Structured reports and summaries from raw data — giving stakeholders clear, actionable insight without the noise.', tags:['Reports','Summaries','Analysis'] },
  { icon:'🔒', title:'Secure Data Handling', desc:'End-to-end secure data workflows. Your business data and client credentials are handled with the highest standards of privacy.', tags:['Privacy','Security','Compliance'] },
]

function ServiceCard({ svc, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <AnimatedSection delay={index * 0.07}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
        background: hovered ? 'rgba(26,58,255,0.1)' : 'var(--card)',
        border: `1px solid ${hovered ? 'rgba(77,108,255,0.4)' : 'var(--border)'}`,
        borderRadius:16, padding:'2rem 1.8rem', transition:'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(26,58,255,0.15)' : 'none',
        height:'100%', cursor:'default'
      }}>
        <div style={{ width:50, height:50, background:'rgba(26,58,255,0.18)', border:'1px solid rgba(77,108,255,0.3)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', marginBottom:'1.3rem' }}>{svc.icon}</div>
        <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:600, fontSize:'1.08rem', marginBottom:'0.65rem' }}>{svc.title}</h3>
        <p style={{ color:'var(--muted)', fontSize:'0.87rem', lineHeight:1.7, fontWeight:300, marginBottom:'1.2rem' }}>{svc.desc}</p>
        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
          {svc.tags.map(t => (
            <span key={t} style={{ background:'rgba(26,58,255,0.15)', border:'1px solid rgba(77,108,255,0.2)', color:'var(--off)', fontSize:'0.7rem', padding:'0.22rem 0.7rem', borderRadius:100 }}>{t}</span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding:'7rem 5%', background:'var(--navy2)' }}>
      <AnimatedSection>
        <div style={{ marginBottom:'3.5rem' }}>
          <div style={{ fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'var(--accent)', fontWeight:500, marginBottom:'0.7rem' }}>What We Do</div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'clamp(1.9rem, 4vw, 2.8rem)', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:'1rem' }}>Services Built on<br/>Precision & Trust</h2>
          <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:500, fontWeight:300, lineHeight:1.7 }}>From medical data entry to document management — we handle the details so your business can focus on what matters.</p>
        </div>
      </AnimatedSection>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.2rem' }}>
        {services.map((svc, i) => <ServiceCard key={svc.title} svc={svc} index={i} />)}
      </div>
    </section>
  )
}
