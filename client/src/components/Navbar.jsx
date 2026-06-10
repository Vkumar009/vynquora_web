import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'Carrers', href: '/careers' },
  { label: 'Contact', href: '/#contact' },
  
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
    <>
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

        {/* Desktop links — sirf bade screens pe */}
        <ul style={{
          display: 'flex', gap: '2.2rem', listStyle: 'none',
        }} className="desktop-nav">
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

        {/* Desktop CTA button */}
        <a href="#contact" className="desktop-nav" style={{
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

        {/* Hamburger button — sirf mobile pe */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            display: 'none', // CSS se override hoga mobile pe
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#fff', padding: 6,
          }}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 199,
              background: 'rgba(6,11,36,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '1.5rem 5%',
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
            }}
            className="mobile-menu"
          >
            {links.map(l => (
              <a key={l.label} href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  color: 'var(--muted)', fontSize: '1rem', fontWeight: 500,
                  letterSpacing: '0.03em', transition: 'color 0.2s',
                  borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem',
                }}
              >{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} style={{
              background: 'var(--blue)', color: '#fff',
              padding: '0.7rem 1.4rem', borderRadius: 100,
              fontSize: '0.9rem', fontWeight: 500,
              textAlign: 'center', marginTop: '0.4rem',
            }}>
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}