export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background:'var(--navy)', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'4rem 5% 2rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'2.5rem', marginBottom:'3rem' }}>
        <div>
          <a href="#" style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1rem' }}>
            <img src="/logo.png" alt="Vynquora" style={{ width:36, height:36, borderRadius:'50%', objectFit:'cover', border:'1.5px solid rgba(77,108,255,0.5)' }}/>
            <span style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.2rem' }}>Vyn<span style={{ color:'var(--accent)' }}>quora</span></span>
          </a>
          <p style={{ color:'var(--muted)', fontSize:'0.86rem', lineHeight:1.75, fontWeight:300, maxWidth:260 }}>Professional data management and digital solutions. Accurate, secure, and reliable — every time.</p>
        </div>
        {[
          { title:'Services', links:['Data Entry','Data Verification','Document Processing','Medical Data','Reporting'] },
          { title:'Company', links:['About Us','Our Process','Careers','Contact'] },
          { title:'Connect', links:['LinkedIn','Instagram','Twitter / X','Email Us'] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily:'Syne', fontSize:'0.78rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.2rem', color:'var(--off)' }}>{col.title}</h4>
            <ul style={{ listStyle:'none' }}>
              {col.links.map(l => (
                <li key={l} style={{ marginBottom:'0.6rem' }}>
                  <a href="#" style={{ color:'var(--muted)', fontSize:'0.87rem', fontWeight:300, transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='#fff'}
                    onMouseLeave={e => e.target.style.color='var(--muted)'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', color:'var(--muted)', fontSize:'0.8rem', fontWeight:300 }}>
        <span>© {year} Vynquora. All rights reserved.</span>
        <div style={{ display:'flex', gap:'0.6rem' }}>
          {['in','tw','ig'].map(s => (
            <a key={s} href="#" style={{ width:34, height:34, border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'0.78rem', fontWeight:500, transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--blue3)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(26,58,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='transparent' }}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
