"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ACCENT = "#8B5E3C";

export default function ClosingCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background: "#000",
        textAlign: "center",
        padding: "clamp(6rem, 16vh, 11rem) clamp(1.5rem, 6vw, 7rem)",
        overflow: "hidden",
      }}
    >
      {/* Radial glow behind button */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "8%",
          width: "min(900px, 90vw)",
          height: "min(900px, 90vw)",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(139,94,60,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
          style={{
            display: "block",
            fontFamily: "var(--font-opensans)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: "1.4rem",
          }}
        >
          Build With Gulzar
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 600,
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
            marginBottom: "1.6rem",
          }}
        >
          A foundation of trust.{" "}
          <span style={{ fontStyle: "italic", color: "#E5E5E5" }}>
            Built into every project.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "var(--font-opensans)",
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            lineHeight: 1.6,
            color: "#E5E5E5",
            maxWidth: 480,
            margin: "0 auto 2.4rem",
          }}
        >
          Tell us what you want built. We'll bring the craftsmanship, the
          compliance, and the single point of accountability to make it real.
        </motion.p>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0, 0, 1] }}
          whileHover={{ scale: 1.03 }}
          style={{
            display: "inline-block",
            background: ACCENT,
            color: "#000",
            border: `1px solid ${ACCENT}`,
            fontFamily: "var(--font-opensans)",
            fontWeight: 500,
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "0.9rem clamp(1.6rem, 4vw, 2.6rem)",
            transition: "background 0.25s ease, color 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#000";
            e.currentTarget.style.color = ACCENT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = ACCENT;
            e.currentTarget.style.color = "#000";
          }}
        >
          Request a Consultation
        </motion.a>
      </div>
    </section>
  );
}
