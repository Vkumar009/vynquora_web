import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// Rate limit: max 10 contact form submissions per IP per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests. Please try again later.' }
})

// ── Email transporter (configure in .env) ──────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',            // change to your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // use App Password for Gmail
  },
})

// ── Routes ─────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'Vynquora' })
})

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, company, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' })
  }

  try {
    // Mail to Vynquora team
    await transporter.sendMail({
      from: `"Vynquora Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
      subject: `New Enquiry from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9f9f9;border-radius:8px">
          <h2 style="color:#1a3aff;margin-bottom:20px">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0">${company}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="padding:8px 0">${message.replace(/\n/g,'<br/>')}</td></tr>
          </table>
        </div>
      `,
    })

// Auto-reply to sender (Is code ko server.js me replace karein)
await transporter.sendMail({
  from: `"Vynquora" <${process.env.EMAIL_USER}>`,
  to: email,
  replyTo: process.env.CONTACT_RECEIVER, 
  subject: 'We received your message – Vynquora',
  html: `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#060b24;border-radius:12px;color:#e8ecff">
      <!-- Logo image directly from live site -->
      <img src="https://vynquora.com" alt="Vynquora" style="width:60px;height:60px;border-radius:50%;margin-bottom:20px;border:2px solid #1a3aff"/>
      <h2 style="color:#00cfff;margin-bottom:12px">Thanks, ${name}!</h2>
      <p style="color:#8b9bc5;line-height:1.7;margin-bottom:16px">
        We've received your message and will get back to you within <strong style="color:#e8ecff">24 hours</strong>.
      </p>
      <p style="color:#8b9bc5;line-height:1.7;margin-bottom:24px">— The Vynquora Team</p>
      <hr style="border:0;border-top:1px solid rgba(255,255,255,0.1);margin-bottom:16px" />
      <p style="font-size:12px;color:#667cb3;margin:0">This is an automated response. Please do not reply directly to this email.</p>
    </div>
  `,
})


    res.json({ success: true, message: 'Message sent successfully!' })
  } catch (err) {
    console.error('Email error:', err.message)
    // Still return success to user (don't expose email config errors)
    // Log internally and handle separately
    res.json({ success: true, message: 'Message received. We will be in touch soon.' })
  }
})

// ── Start ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Vynquora backend running on http://localhost:${PORT}`)
})
