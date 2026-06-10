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
          { title:'Services', links:[{name:'Data Entry', url:'#'},{name:'Data Verification', url:'#'},{name:'Document Processing', url:'#'},{name:'Medical Data', url:'#'},{name:'Reporting', url:'#'}] },
          { title:'Company', links:[{name:'About Us', url:'#'},{name:'Our Process', url:'#'},{name:'Careers', url:'/careers'},{name:'Contact', url:'#contact'}] },
          { 
            title:'Connect', 
            links:[
              { name:'LinkedIn', url:'https://linkedin.com/company/vynquora' },
              { name:'Instagram', url:'https://www.instagram.com/vynquora_official/' },
              { name:'Twitter / X', url:'https://x.com/vynquora' },
              { name:'Email Us', url:'mailto:info@vynquora.com' } 
            ] 
          },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily:'Syne', fontSize:'0.78rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.2rem', color:'var(--off)' }}>{col.title}</h4>
            <ul style={{ listStyle:'none' }}>
              {col.links.map(l => (
                <li key={l.name} style={{ marginBottom:'0.6rem' }}>
                  <a href={l.url} target={l.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ color:'var(--muted)', fontSize:'0.87rem', fontWeight:300, transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='#fff'}
                    onMouseLeave={e => e.target.style.color='var(--muted)'}
                  >{l.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', color:'var(--muted)', fontSize:'0.8rem', fontWeight:300 }}>
        <span>© {year} Vynquora. All rights reserved.</span>
        <div style={{ display:'flex', gap:'0.6rem' }}>
          {[
            { label: 'LinkedIn', display: 'in', url: 'https://linkedin.com/company/vynquora' },
            { label: 'Twitter', display: 'tw', url: 'https://x.com/vynquora' },
            { label: 'Instagram', display: 'ig', url: 'https://www.instagram.com/vynquora_official/' }
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} style={{ width:34, height:34, border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'0.78rem', fontWeight:500, transition:'all 0.2s', textDecoration:'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--blue3)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(26,58,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='transparent' }}
            >{s.display}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
