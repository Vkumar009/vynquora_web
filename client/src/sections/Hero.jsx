import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const stagger = { animate: { transition: { staggerChildren: 0.11 } } }
const item = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16,1,0.3,1] } }
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: isMobile ? '6rem 6% 4rem' : '8rem 5% 5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width: isMobile?'80vw':'50vw', height: isMobile?'80vw':'50vw', maxWidth:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(26,58,255,0.2) 0%, transparent 65%)', filter:'blur(80px)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:0, left:'-5%', width: isMobile?'60vw':'35vw', maxWidth:500, height: isMobile?'60vw':'35vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,207,255,0.09) 0%, transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }}/>

      {/* Grid bg */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize:'60px 60px' }}/>

      {/* Layout: text + logo */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', position:'relative', zIndex:1, gap:'2rem' }}>

        {/* TEXT */}
        <motion.div variants={stagger} initial="initial" animate="animate"
          style={{ flex:1, maxWidth: isMobile ? '100%' : 620 }}>

          <motion.div variants={item} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(26,58,255,0.15)', border:'1px solid rgba(77,108,255,0.3)',
            padding:'0.38rem 1rem', borderRadius:100, marginBottom:'1.6rem',
            fontSize:'0.72rem', color:'var(--accent)', letterSpacing:'0.1em',
            textTransform:'uppercase', fontWeight:500
          }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent)', animation:'pulse 2s ease-in-out infinite' }}/>
            Professional Data & Digital Solutions
          </motion.div>

          <motion.h1 variants={item} style={{
            fontFamily:'Syne, sans-serif', fontWeight:800,
            fontSize: isMobile ? 'clamp(2.2rem, 9vw, 3rem)' : 'clamp(2.8rem, 4.5vw, 4.4rem)',
            lineHeight:1.07, letterSpacing:'-0.025em', marginBottom:'1.4rem'
          }}>
            Accurate Data.<br/>
            Reliable Systems.<br/>
            <span style={{ background:'linear-gradient(120deg, var(--accent) 0%, var(--blue3) 55%, #fff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Real Results.
            </span>
          </motion.h1>

          <motion.p variants={item} style={{
            color:'var(--muted)', fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight:1.8, maxWidth:520, marginBottom:'2.2rem', fontWeight:300
          }}>
            Vynquora delivers precise, efficient data management and operational support —
            helping businesses stay organised, accurate, and ready to scale.
          </motion.p>

          <motion.div variants={item} style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap' }}>
            <a href="#services" style={{
              background:'var(--blue)', color:'#fff',
              padding: isMobile ? '0.75rem 1.6rem' : '0.85rem 2rem',
              borderRadius:100, fontWeight:500, fontSize:'0.92rem',
              display:'inline-flex', alignItems:'center', gap:8, transition:'all 0.25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--blue2)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(26,58,255,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--blue)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
            >Explore Services →</a>
            <a href="#contact" style={{
              border:'1px solid rgba(255,255,255,0.15)', color:'var(--off)',
              padding: isMobile ? '0.75rem 1.6rem' : '0.85rem 2rem',
              borderRadius:100, fontWeight:500, fontSize:'0.92rem',
              display:'inline-flex', alignItems:'center', gap:8, transition:'all 0.25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'; e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.background='transparent' }}
            >Let's Talk</a>
          </motion.div>

          <motion.div variants={item} style={{
            display:'flex', gap: isMobile ? '1.5rem' : '3rem',
            marginTop:'3rem', paddingTop:'2rem',
            borderTop:'1px solid rgba(255,255,255,0.07)', flexWrap:'wrap'
          }}>
            {[['100%','Data Accuracy'],['Fast','Turnaround'],['Secure','Data Handling']].map(([num,lbl]) => (
              <div key={lbl}>
                <span style={{ fontFamily:'Syne', fontSize: isMobile ? '1.6rem' : '1.9rem', fontWeight:700, display:'block' }}>{num}</span>
                <span style={{ fontSize:'0.75rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{lbl}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* LOGO — hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity:0, scale:0.85 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1, delay:0.3, ease:[0.16,1,0.3,1] }}
            style={{ flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <motion.div
              animate={{ y:[0,-18,0] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'relative' }}
            >
              {[320,400].map((size,i) => (
                <motion.div key={i} animate={{ rotate:360 }}
                  transition={{ duration:i===0?22:35, repeat:Infinity, ease:'linear' }}
                  style={{
                    position:'absolute', borderRadius:'50%', width:size, height:size,
                    top:-(size-240)/2, left:-(size-240)/2,
                    border:`1px ${i===0?'solid':'dashed'} rgba(77,108,255,${i===0?0.2:0.1})`
                  }}
                />
              ))}
              <img src="/logo.png" alt="Vynquora" style={{
                width:240, height:240, borderRadius:'50%', objectFit:'cover',
                filter:'drop-shadow(0 0 50px rgba(26,58,255,0.45))', position:'relative', zIndex:1
              }}/>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.75)}}`}</style>
    </section>
  )
}
