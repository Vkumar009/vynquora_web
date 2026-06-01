import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '1rem 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,11,36,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo.png" alt="Vynquora" style={{
          width: 38, height: 38, borderRadius: '50%',
          border: '1.5px solid rgba(77,108,255,0.5)',
          objectFit: 'cover'
        }} />
        <span style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.25rem',
          letterSpacing: '0.02em'
        }}>
          Vyn<span style={{ color: 'var(--accent)' }}>quora</span>
        </span>
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2.2rem', listStyle: 'none' }} className="desktop-nav">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} style={{
              color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 400,
              letterSpacing: '0.03em', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={{
        background: 'var(--blue)', color: '#fff',
        padding: '0.52rem 1.4rem', borderRadius: 100,
        fontSize: '0.88rem', fontWeight: 500,
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.target.style.background = 'var(--blue2)'}
        onMouseLeave={e => e.target.style.background = 'var(--blue)'}
      >
        Get in Touch
      </a>
    </motion.nav>
  )
}
