import { motion } from 'framer-motion'

const items = [
  'Data Entry','Data Management','Document Processing','Medical Data',
  'Digital Solutions','Quality Control','Data Verification','Record Keeping',
  'Data Entry','Data Management','Document Processing','Medical Data',
  'Digital Solutions','Quality Control','Data Verification','Record Keeping',
]

export default function Marquee() {
  return (
    <div style={{
      overflow:'hidden', padding:'1.2rem 0',
      background:'rgba(26,58,255,0.07)',
      borderTop:'1px solid rgba(77,108,255,0.12)',
      borderBottom:'1px solid rgba(77,108,255,0.12)',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration:28, repeat:Infinity, ease:'linear' }}
        style={{ display:'flex', gap:'2.5rem', whiteSpace:'nowrap', width:'max-content' }}
      >
        {items.map((t, i) => (
          <span key={i} style={{
            fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.12em',
            color: i%2===0 ? 'rgba(255,255,255,0.3)' : 'var(--accent)',
            fontWeight: i%2===0 ? 400 : 500, flexShrink:0
          }}>
            {i%2===0 ? t : '◆'}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
