

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import AnimatedSection from "../components/AnimatedSection";

/* ─────────────────────── SHARED CONSTANTS ─────────────────────── */

const EASE = [0.16, 1, 0.3, 1];

const TAG_STYLE = {
  background: "rgba(26,58,255,0.15)",
  border: "1px solid rgba(77,108,255,0.2)",
  color: "var(--off)",
  fontSize: "0.7rem",
  padding: "0.22rem 0.72rem",
  borderRadius: 100,
  fontWeight: 400,
  letterSpacing: "0.03em",
  whiteSpace: "nowrap",
};

const SECTION_LABEL = {
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "var(--accent)",
  fontWeight: 500,
  marginBottom: "0.7rem",
};

const SECTION_TITLE = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  marginBottom: "1rem",
};

const SECTION_MUTED = {
  color: "var(--muted)",
  fontSize: "1rem",
  fontWeight: 300,
  lineHeight: 1.7,
};

/* ─────────────────────── DATA ─────────────────────── */

const WHY_CARDS = [
  {
    icon: "🏛️",
    title: "Ownership",
    desc: "Every team member owns their work end-to-end. No micromanagement — just clear goals, real responsibility, and genuine impact.",
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "We ship things that haven't been built before. New ideas are welcomed, tested fast, and refined with purpose.",
  },
  {
    icon: "📚",
    title: "Continuous Learning",
    desc: "Dedicated budgets, time for R&D, and a culture that treats learning as a core part of the job — not a bonus.",
  },
  {
    icon: "🎯",
    title: "Impact Driven",
    desc: "Our work reaches real users and real businesses. What you build here matters — you will see and feel the difference.",
  },
];

const LIFE_BLOCKS = [
  {
    icon: "🤝",
    title: "Collaborative Environment",
    desc: "Flat hierarchy. Open feedback. Everyone's voice is heard — from interns to senior engineers. Great ideas can come from anywhere.",
    accent: "rgba(26,58,255,0.15)",
  },
  {
    icon: "🏢",
    title: "Professional Workplace",
    desc: "Work in a structured and professional office environment where collaboration, productivity, and growth are encouraged every day.",
    accent: "rgba(0,207,255,0.08)",
  },
  {
    icon: "📋",
    title: "Quality-Focused Work",
    desc: "Accuracy and attention to detail are at the core of everything we do. Every task is reviewed to ensure high-quality results for our clients.",
    accent: "rgba(26,58,255,0.15)",
  },
  {
    icon: "📈",
    title: "Fast Growth Opportunities",
    desc: "A lean team means you grow fast. Take on broader scope, lead projects, and advance your career — not just your title.",
    accent: "rgba(0,207,255,0.08)",
  },
];

const BENEFITS = [
  {
    icon: "🕐",
    title: "Flexible Work",
    desc: "Set your own hours. We care about output, not when you log on.",
  },
  {
    icon: "🌴",
    title: "Paid Leave",
    desc: "Generous PTO with a minimum you're expected to actually take.",
  },
  {
    icon: "🏥",
    title: "Health Support",
    desc: "Comprehensive health coverage for you and your family.",
  },
  {
    icon: "💰",
    title: "Performance Bonuses",
    desc: "Quarterly performance bonuses tied to real impact.",
  },
  {
    icon: "🚀",
    title: "Career Growth",
    desc: "Clear promotion tracks. Your growth is our investment.",
  },
];

const HIRING_STEPS = [
  {
    n: "01",
    title: "Application",
    desc: "Submit your resume and a short note about what excites you about this role.",
  },
  {
    n: "02",
    title: "Resume Review",
    desc: "Our team reviews every application within 3 business days. No ghosting.",
  },
  {
    n: "03",
    title: "Interview",
    desc: "A professional interview to assess your skills, experience, knowledge, and suitability for the position.",
  },
  {
    n: "04",
    title: "HR Round",
    desc: "Final discussion regarding compensation, company policies, joining date, and employment-related formalities.",
  },
  {
    n: "05",
    title: "Offer",
    desc: "We move fast once we've decided. Offers come with full clarity on comp and scope.",
  },
];

const POSITIONS = [
  {
    dept: "Data Operations",
    type: "Full-time",
    location: "On-Site",
    // pos: "Open",
    exp: "Fresher",
    title: "Data Entry Specialist",
    tags: ["Typing", "MS Excel", "Computer Skills"],
  },
  {
    dept: "Data Operations",
    type: "Part-time",
    location: "On-Site",
    // pos: "Open",
    exp: "Fresher",
    title: "Part-Time Data Entry Operator",
    tags: ["Typing", "Data Entry", "Flexible Hours"],
  },
  {
    dept: "Data Operations",
    type: "Full-time",
    location: "On-Site",
    // pos: "Open",
    exp: "1-2 Years",
    title: "Senior Data Entry Operator",
    tags: ["Advanced Excel", "Data Management", "Reporting"],
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Senior Data Entry Operator",
    avatar: "AM",
    quote:
      "Vynquora provided me with the opportunity to grow professionally while working on real projects. The structured workflow and supportive management make it a great place to build a long-term career.",
  },
  {
    name: "Priya Sharma",
    role: "Junior Data Entry Operator",
    avatar: "PS",
    quote:
      "As a fresher, I was given proper guidance and training from day one. The team helped me adapt quickly and develop the skills needed to perform confidently.",
  },
  {
    name: "Shweta",
    role: "Data Entry Operator",
    avatar: "RD",
    quote:
      "The work environment is professional, organized, and growth-oriented. I enjoy being part of a team that values accuracy, teamwork, and continuous improvement.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How long does the hiring process take?",
    a: "Our full process typically takes 10–14 business days from application to offer. We review applications within 1 day and move quickly once we've found the right fit.",
  },
  {
    q: "Is this an in-office or remote position?",
    a: "Our positions are office-based and on-site. We believe in-person collaboration drives better results — faster feedback, stronger team bonding, and clearer communication. You will be working directly with the team at our office.",
  },
  {
    q: "What kind of work will I be doing day-to-day?",
    a: "Depending on your role, you will work on real client projects involving data management, digital operations, and business process solutions. Every project is different — you will handle varied tasks, collaborate with clients, and directly see the impact of your work.",
  },
  {
    q: "Can interns or freshers apply?",
    a: "Absolutely!! We value potential as much as experience. If you're eager to learn, have strong fundamentals, and can show us how you think — we want to hear from you.",
  },
];

/* ─────────────────────── REUSABLE CARD COMPONENTS ─────────────────────── */

function WhyCard({ card, index }) {
  const [hov, setHov] = useState(false);
  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(26,58,255,0.1)" : "var(--card)",
          border: `1px solid ${hov ? "rgba(77,108,255,0.4)" : "var(--border)"}`,
          borderRadius: 16,
          padding: "2rem 1.8rem",
          transition: "all 0.3s ease",
          transform: hov ? "translateY(-6px)" : "none",
          boxShadow: hov ? "0 20px 60px rgba(26,58,255,0.15)" : "none",
          height: "100%",
          cursor: "default",
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            background: "rgba(26,58,255,0.18)",
            border: "1px solid rgba(77,108,255,0.3)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            marginBottom: "1.3rem",
          }}
        >
          {card.icon}
        </div>
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "1.08rem",
            marginBottom: "0.65rem",
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.87rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {card.desc}
        </p>
      </div>
    </AnimatedSection>
  );
}

function BenefitCard({ b, index }) {
  const [hov, setHov] = useState(false);
  return (
    <AnimatedSection delay={index * 0.06}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(26,58,255,0.1)" : "var(--card)",
          border: `1px solid ${hov ? "rgba(77,108,255,0.4)" : "var(--border)"}`,
          borderRadius: 14,
          padding: "1.6rem 1.5rem",
          transition: "all 0.3s ease",
          transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? "0 16px 48px rgba(26,58,255,0.12)" : "none",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            background: "rgba(26,58,255,0.15)",
            border: "1px solid rgba(77,108,255,0.25)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            marginBottom: "1rem",
          }}
        >
          {b.icon}
        </div>
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "0.97rem",
            marginBottom: "0.45rem",
          }}
        >
          {b.title}
        </h3>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.83rem",
            lineHeight: 1.65,
            fontWeight: 300,
          }}
        >
          {b.desc}
        </p>
      </div>
    </AnimatedSection>
  );
}

function JobCard({ job, index, onApply }) {
  const [hov, setHov] = useState(false);
  const isClosed = job.pos === "Closed";
  return (
    <AnimatedSection delay={index * 0.07}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(26,58,255,0.08)" : "var(--card)",
          border: `1px solid ${hov ? "rgba(77,108,255,0.4)" : "var(--border)"}`,
          borderRadius: 16,
          padding: "1.8rem",
          transition: "all 0.3s ease",
          transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? "0 16px 48px rgba(26,58,255,0.12)" : "none",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.6rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--accent)",
                fontWeight: 500,
                marginBottom: "0.4rem",
              }}
            >
              {job.dept}
            </div>
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "1.05rem",
                lineHeight: 1.3,
              }}
            >
              {job.title}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                background: isClosed
                  ? "rgba(255,80,80,0.1)"
                  : "rgba(0,207,255,0.12)",
                border: `1px solid ${isClosed ? "rgba(255,80,80,0.25)" : "rgba(0,207,255,0.25)"}`,
                color: isClosed ? "#ff6b6b" : "var(--accent)",
                fontSize: "0.65rem",
                padding: "0.22rem 0.65rem",
                borderRadius: 100,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {job.pos}
            </span>
            <span
              style={{
                background: "rgba(77,108,255,0.12)",
                border: "1px solid rgba(77,108,255,0.2)",
                color: "var(--off)",
                fontSize: "0.65rem",
                padding: "0.22rem 0.65rem",
                borderRadius: 100,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {job.exp}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { icon: "💼", val: job.type },
            { icon: "📍", val: job.location },
          ].map((m) => (
            <span
              key={m.val}
              style={{
                color: "var(--muted)",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {m.icon} {m.val}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {job.tags.map((t) => (
            <span key={t} style={TAG_STYLE}>
              {t}
            </span>
          ))}
        </div>

        {/* Apply */}
        <button
          onClick={() => !isClosed && onApply(job.title)}
          aria-label={`Apply for ${job.title}`}
          disabled={isClosed}
          style={{
            background: isClosed
              ? "transparent"
              : hov
                ? "var(--blue)"
                : "transparent",
            border: `1px solid ${
              isClosed
                ? "rgba(255,255,255,0.1)"
                : hov
                  ? "var(--blue)"
                  : "rgba(77,108,255,0.4)"
            }`,
            color: isClosed ? "var(--muted)" : hov ? "#fff" : "var(--off)",
            padding: "0.62rem 1.4rem",
            borderRadius: 100,
            fontSize: "0.85rem",
            marginTop: "auto",
            fontWeight: 500,
            cursor: isClosed ? "not-allowed" : "pointer",
            transition: "all 0.25s ease",
            fontFamily: "DM Sans, sans-serif",
            alignSelf: "flex-start",
            boxShadow:
              !isClosed && hov ? "0 6px 24px rgba(26,58,255,0.25)" : "none",
            opacity: isClosed ? 0.5 : 1,
          }}
        >
          {isClosed ? "Position Closed" : "Apply Now →"}
        </button>
      </div>
    </AnimatedSection>
  );
}

function TestimonialCard({ t, index }) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "2rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.4rem",
          transition: "border-color 0.25s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "rgba(77,108,255,0.35)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "3rem",
            lineHeight: 1,
            color: "var(--blue3)",
            opacity: 0.5,
            marginBottom: "-0.5rem",
          }}
        >
          "
        </div>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            fontWeight: 300,
            flex: 1,
            fontStyle: "italic",
          }}
        >
          {t.quote}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "rgba(26,58,255,0.25)",
              border: "1.5px solid rgba(77,108,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Syne, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "var(--accent)",
              flexShrink: 0,
            }}
          >
            {t.avatar}
          </div>
          <div>
            <div style={{ fontSize: "0.88rem", fontWeight: 500 }}>{t.name}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
              {t.role}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{ borderBottom: "1px solid var(--border)", overflow: "hidden" }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.35rem 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.97rem",
          fontWeight: 500,
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span>{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "rgba(77,108,255,0.5)" : "rgba(255,255,255,0.15)"}`,
            background: isOpen ? "rgba(26,58,255,0.2)" : "transparent",
            fontSize: "1.1rem",
            color: isOpen ? "var(--accent)" : "var(--muted)",
            transition: "background 0.25s, border-color 0.25s, color 0.25s",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                fontWeight: 300,
                paddingBottom: "1.35rem",
                maxWidth: 600,
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────── APPLY MODAL ─────────────────────── */

function ApplyModal({ jobTitle, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "0.85rem 1rem",
    color: "#fff",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "DM Sans, sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(6,11,36,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${jobTitle}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          background: "var(--navy2)",
          border: "1px solid rgba(77,108,255,0.3)",
          borderRadius: 20,
          padding: "2rem",
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          ✕
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h3
              style={{
                fontFamily: "Syne",
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Application Sent!
            </h3>
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              We'll review your application for{" "}
              <strong style={{ color: "var(--off)" }}>{jobTitle}</strong> and
              get back to you within 3 business days.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "1.8rem",
                background: "var(--blue)",
                color: "#fff",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: 100,
                fontSize: "0.88rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={SECTION_LABEL}>Now Hiring</div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: "0.4rem",
              }}
            >
              {jobTitle}
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.87rem",
                fontWeight: 300,
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Fill in the details below. We read every application carefully.
            </p>
            <form
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Full Name *
                </label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  style={inputStyle}
                  value={form.name}
                  onChange={handle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(77,108,255,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  style={inputStyle}
                  value={form.email}
                  onChange={handle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(77,108,255,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  LinkedIn / Portfolio URL
                </label>
                <input
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/you"
                  style={inputStyle}
                  value={form.linkedin}
                  onChange={handle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(77,108,255,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Resume / CV *
                </label>
                <input
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  style={{
                    ...inputStyle,
                    padding: "0.65rem 1rem",
                    cursor: "pointer",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Why this role? *
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us what excites you about this opportunity..."
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  value={form.message}
                  onChange={handle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(77,108,255,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background:
                    status === "loading" ? "var(--blue3)" : "var(--blue)",
                  color: "#fff",
                  border: "none",
                  padding: "0.9rem",
                  borderRadius: 10,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.93rem",
                  fontWeight: 500,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "all 0.25s",
                  marginTop: "0.4rem",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading") {
                    e.currentTarget.style.background = "var(--blue2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    status === "loading" ? "var(--blue3)" : "var(--blue)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {status === "loading" ? "Submitting…" : "Submit Application →"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── MAIN CAREERS PAGE ─────────────────────── */

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleApply = useCallback((title) => setActiveJob(title), []);
  const handleClose = useCallback(() => setActiveJob(null), []);
  const toggleFaq = useCallback(
    (i) => setOpenFaq((prev) => (prev === i ? null : i)),
    [],
  );

  return (
    <>
      {/* ── SEO ── */}
      <Helmet>
        <title>Careers at Vynquora — Build What's Next</title>
        <meta
          name="description"
          content="Join Vynquora and become part of a team dedicated to delivering accurate data management, efficient business support, and reliable operational solutions for clients worldwide. Explore open roles in data entry and operations."
        />
        <meta
          name="keywords"
          content="Vynquora careers, data entry jobs, data operator jobs, jobs in India, on-site jobs, data management careers, fresher jobs, Vynquora hiring"
        />
        <meta
          property="og:title"
          content="Careers at Vynquora — Build What's Next"
        />
        <meta
          property="og:description"
          content="Join Vynquora — a professional data management and digital solutions company. On-site opportunities for freshers and experienced candidates."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.vynquora.com/careers" />
      </Helmet>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        #careers * { box-sizing: border-box; }

        /* Mobile: padding reduce */
        @media (max-width: 768px) {
          .careers-section-pad { padding: 4rem 5% !important; }
          .hero-content { max-width: 100% !important; }
        }

        /* Hiring steps: vertical on mobile */
        @media (max-width: 640px) {
          .hiring-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hiring-line { display: none !important; }
          .hiring-step { text-align: left !important; display: flex !important; gap: 1rem !important; align-items: flex-start !important; }
          .hiring-circle { margin: 0 !important; flex-shrink: 0; }
          .positions-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 900px) {
          .positions-grid { grid-template-columns: 1fr 1fr !important; }
        }

        /* Hero H1 responsive */
        @media (max-width: 480px) {
          .hero-h1 { white-space: normal !important; font-size: clamp(2.2rem, 10vw, 3.5rem) !important; }
        }

        /* Stats wrap on small screens */
        @media (max-width: 400px) {
          .hero-stats { gap: 1.2rem !important; }
        }
      `}</style>

      <main id="careers">
        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section
          aria-label="Careers hero"
          className="careers-section-pad"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "clamp(6rem, 10vw, 8rem) 5% clamp(4rem, 8vw, 5rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background orbs */}
          <div
            style={{
              position: "absolute",
              top: "-15%",
              right: "-5%",
              width: "min(55vw, 700px)",
              height: "min(55vw, 700px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(26,58,255,0.2) 0%, transparent 65%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "-5%",
              width: "min(40vw, 500px)",
              height: "min(40vw, 500px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,207,255,0.09) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <motion.div
            className="hero-content"
            variants={{ animate: { transition: { staggerChildren: 0.11 } } }}
            initial="initial"
            animate="animate"
            style={{
              maxWidth: 680,
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          >
            {/* Badge */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 28 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(26,58,255,0.15)",
                border: "1px solid rgba(77,108,255,0.3)",
                padding: "0.38rem 1rem",
                borderRadius: 100,
                marginBottom: "1.6rem",
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              We're Hiring — Join Vynquora
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="hero-h1"
              variants={{
                initial: { opacity: 0, y: 28 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 6.5vw, 5.6rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                marginBottom: "1.6rem",
                whiteSpace: "nowrap",
              }}
            >
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
              >
                Build What's{" "}
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                style={{
                  display: "inline-block",
                  marginLeft: "0.35em",
                  background:
                    "linear-gradient(120deg, var(--accent) 0%, var(--blue3) 55%, #fff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Next.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={{
                initial: { opacity: 0, y: 28 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              style={{
                fontSize: "clamp(0.95rem, 1.6vw, 1.12rem)",
                lineHeight: 1.85,
                fontWeight: 300,
                color: "var(--muted)",
                maxWidth: 560,
                marginBottom: "2.2rem",
              }}
            >
              Join Vynquora and be part of a team that delivers{" "}
              <span style={{ color: "var(--off)", fontWeight: 400 }}>
                accurate data solutions
              </span>
              ,{" "}
              <span
                style={{
                  color: "var(--accent)",
                  fontWeight: 400,
                  borderBottom: "1px solid rgba(0,207,255,0.4)",
                  paddingBottom: "1px",
                }}
              >
                reliable digital services
              </span>
              , and{" "}
              <span style={{ color: "var(--off)", fontWeight: 400 }}>
                real business impact
              </span>{" "}
              for clients across the globe.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 28 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}
            >
              <a
                href="#open-positions"
                style={{
                  background: "var(--blue)",
                  color: "#fff",
                  padding: "0.85rem 2rem",
                  borderRadius: 100,
                  fontWeight: 500,
                  fontSize: "0.92rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--blue2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(26,58,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--blue)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Open Positions →
              </a>
              <a
                href="#life-at-vynquora"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "var(--off)",
                  padding: "0.85rem 2rem",
                  borderRadius: 100,
                  fontWeight: 500,
                  fontSize: "0.92rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Learn About Our Culture
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              variants={{
                initial: { opacity: 0, y: 28 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              style={{
                display: "flex",
                gap: "clamp(1.2rem, 4vw, 3rem)",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                flexWrap: "wrap",
              }}
            >
              {[
                ["On-Site", "Opportunities"],
                ["Zero", "Open Roles"],
                ["Fast", "Hiring Process"],
              ].map(([num, lbl]) => (
                <div key={lbl}>
                  <span
                    style={{
                      fontFamily: "Syne",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                      fontWeight: 700,
                      display: "block",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {lbl}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            2. WHY WORK AT VYNQUORA
        ══════════════════════════════════════════ */}
        <section
          id="why-vynquora"
          aria-label="Why work at Vynquora"
          className="careers-section-pad"
          style={{ padding: "7rem 5%", background: "var(--navy2)" }}
        >
          <AnimatedSection>
            <div style={{ marginBottom: "3.5rem" }}>
              <div style={SECTION_LABEL}>Why Vynquora</div>
              <h2 style={SECTION_TITLE}>Why Work With Us</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 500 }}>
                We are a focused team with clear goals. Every person matters,
                every idea gets heard, and the work you do here creates real
                value for real clients.
              </p>
            </div>
          </AnimatedSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {WHY_CARDS.map((card, i) => (
              <WhyCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. LIFE AT VYNQUORA
        ══════════════════════════════════════════ */}
        <section
          id="life-at-vynquora"
          aria-label="Life at Vynquora"
          className="careers-section-pad"
          style={{ padding: "7rem 5%" }}
        >
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={SECTION_LABEL}>Our Culture</div>
              <h2 style={SECTION_TITLE}>Life at Vynquora</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 480, margin: "0 auto" }}>
                Professional, collaborative, and quality-focused. This is what
                working at Vynquora looks like every day.
              </p>
            </div>
          </AnimatedSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {LIFE_BLOCKS.map((lb, i) => (
              <AnimatedSection key={lb.title} delay={i * 0.08}>
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "2rem 1.8rem",
                    height: "100%",
                    transition: "border-color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(77,108,255,0.35)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      background: lb.accent,
                      border: "1px solid rgba(77,108,255,0.25)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      marginBottom: "1.3rem",
                    }}
                  >
                    {lb.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      marginBottom: "0.65rem",
                    }}
                  >
                    {lb.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.87rem",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {lb.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. EMPLOYEE BENEFITS
        ══════════════════════════════════════════ */}
        <section
          id="benefits"
          aria-label="Employee benefits"
          className="careers-section-pad"
          style={{ padding: "7rem 5%", background: "var(--navy2)" }}
        >
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={SECTION_LABEL}>Perks & Benefits</div>
              <h2 style={SECTION_TITLE}>What You Get</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 460, margin: "0 auto" }}>
                We invest in the people who make the work happen. Everything you
                need to do your best — and more.
              </p>
            </div>
          </AnimatedSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.1rem",
            }}
          >
            {BENEFITS.map((b, i) => (
              <BenefitCard key={b.title} b={b} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. HIRING PROCESS
        ══════════════════════════════════════════ */}
        <section
          id="hiring-process"
          aria-label="Hiring process"
          className="careers-section-pad"
          style={{ padding: "7rem 5%" }}
        >
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={SECTION_LABEL}>How We Hire</div>
              <h2 style={SECTION_TITLE}>The Hiring Process</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 460, margin: "0 auto" }}>
                Five clear steps. No black boxes, no surprise rounds. We respect
                your time.
              </p>
            </div>
          </AnimatedSection>
          <div style={{ position: "relative" }}>
            <div
              className="hiring-line"
              style={{
                position: "absolute",
                top: 28,
                left: "10%",
                right: "10%",
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(77,108,255,0.3) 20%, rgba(77,108,255,0.3) 80%, transparent)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <div
              className="hiring-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "2rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {HIRING_STEPS.map((s, i) => (
                <AnimatedSection key={s.n} delay={i * 0.1}>
                  <div
                    className="hiring-step"
                    style={{ textAlign: "center", padding: "0 0.5rem" }}
                  >
                    <div
                      className="hiring-circle"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "var(--navy)",
                        border: "2px solid var(--blue3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.4rem",
                        fontFamily: "Syne",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {s.n}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Syne",
                          fontSize: "0.97rem",
                          fontWeight: 600,
                          marginBottom: "0.55rem",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: "0.83rem",
                          lineHeight: 1.65,
                          fontWeight: 300,
                        }}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. OPEN POSITIONS
        ══════════════════════════════════════════ */}
        <section
          id="open-positions"
          aria-label="Open positions"
          className="careers-section-pad"
          style={{ padding: "7rem 5%", background: "var(--navy2)" }}
        >
          <AnimatedSection>
            <div style={{ marginBottom: "3.5rem" }}>
              <div style={SECTION_LABEL}>Open Roles</div>
              <h2 style={SECTION_TITLE}>Open Positions</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 500 }}>
                All roles are On-Site. We hire for potential as much as
                experience — if you're eager to contribute, we want to hear from
                you.
              </p>
            </div>
          </AnimatedSection>
          <div
            className="positions-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.2rem",
            }}
          >
            {POSITIONS.map((job, i) => (
              <JobCard
                key={job.title}
                job={job}
                index={i}
                onApply={handleApply}
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. EMPLOYEE TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section
          id="testimonials"
          aria-label="Employee testimonials"
          className="careers-section-pad"
          style={{ padding: "7rem 5%" }}
        >
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={SECTION_LABEL}>From The Team</div>
              <h2 style={SECTION_TITLE}>Hear From The People</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 460, margin: "0 auto" }}>
                Don't take our word for it — here's what the team has to say.
              </p>
            </div>
          </AnimatedSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. FAQ
        ══════════════════════════════════════════ */}
        <section
          id="faq"
          aria-label="Frequently asked questions"
          className="careers-section-pad"
          style={{ padding: "7rem 5%", background: "var(--navy2)" }}
        >
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={SECTION_LABEL}>FAQ</div>
              <h2 style={SECTION_TITLE}>Common Questions</h2>
              <p style={{ ...SECTION_MUTED, maxWidth: 460, margin: "0 auto" }}>
                Everything you need to know before applying. Still have a
                question? Email us directly.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => toggleFaq(i)}
                />
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ══════════════════════════════════════════
            9. FINAL CTA
        ══════════════════════════════════════════ */}
        <section
          id="careers-cta"
          aria-label="Apply now call to action"
          className="careers-section-pad"
          style={{
            padding: "7rem 5%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "min(60vw, 700px)",
              height: "min(60vw, 700px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(26,58,255,0.14) 0%, transparent 65%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
          <AnimatedSection>
            <div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                maxWidth: 640,
                margin: "0 auto",
              }}
            >
              <div style={SECTION_LABEL}>Let's Build Together</div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 5vw, 3.8rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  marginBottom: "1.2rem",
                }}
              >
                Ready To Build
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, var(--accent) 0%, var(--blue3) 55%, #fff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  The Future?
                </span>
              </h2>
              <p
                style={{
                  ...SECTION_MUTED,
                  maxWidth: 460,
                  margin: "0 auto 2.5rem",
                  fontSize: "1rem",
                }}
              >
                We're building something meaningful. If you want to own real
                work, grow fast, and be part of something that matters — the
                door is open.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#open-positions"
                  style={{
                    background: "var(--blue)",
                    color: "#fff",
                    padding: "0.92rem 2.2rem",
                    borderRadius: 100,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.25s",
                    boxShadow: "0 0 40px rgba(26,58,255,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--blue2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 40px rgba(26,58,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--blue)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(26,58,255,0.3)";
                  }}
                >
                  Apply Now →
                </a>
                <a
                  href="mailto:vynquora@gmail.com"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "var(--off)",
                    padding: "0.92rem 2.2rem",
                    borderRadius: 100,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.35)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.15)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Say Hello
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* ── APPLY MODAL ── */}
      <AnimatePresence>
        {activeJob && <ApplyModal jobTitle={activeJob} onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
}
