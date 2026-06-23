"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#8B5E3C";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: solid ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: solid
          ? "1px solid rgba(139,94,60,0.2)"
          : "1px solid transparent",
        textShadow: "0 1px 8px rgba(0,0,0,0.5)",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Soft scrim that fades out well below the links — readable over any
          hero, with no hard bottom edge. Only when the bar is transparent. */}
      {!solid && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 170,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.08) 70%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      <nav
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "1.1rem clamp(1.5rem, 6vw, 7rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "0.18em",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          GULZAR <span style={{ color: ACCENT }}>CONSTRUCTION</span>
        </a>

        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-opensans)",
                fontWeight: 400,
                fontSize: "0.82rem",
                letterSpacing: "0.04em",
                color: "#E5E5E5",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#E5E5E5")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-opensans)",
              fontWeight: 500,
              fontSize: "0.68rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#000",
              background: ACCENT,
              padding: "0.6rem 1.4rem",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#B07C50")}
            onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT)}
          >
            Get Free Quote
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          <span style={{ width: 24, height: 2, background: "#fff" }} />
          <span style={{ width: 24, height: 2, background: "#fff" }} />
          <span style={{ width: 24, height: 2, background: "#fff" }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="nav-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "0.25rem",
            padding: "0 clamp(1.5rem, 6vw, 7rem) 1.2rem",
            background: "rgba(0,0,0,0.92)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-opensans)",
                fontSize: "0.95rem",
                color: "#E5E5E5",
                textDecoration: "none",
                padding: "0.6rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-opensans)",
              fontWeight: 500,
              fontSize: "0.7rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#000",
              background: ACCENT,
              padding: "0.7rem 1.4rem",
              textAlign: "center",
              textDecoration: "none",
              marginTop: "0.6rem",
            }}
          >
            Get Free Quote
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: flex !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
