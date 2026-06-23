"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ACCENT = "#8B5E3C";

const rows: [string, string][] = [
  ["Service Range", "Flooring, carpentry, renovations, fit-outs, structural builds & extensions"],
  ["Project Types", "Residential, commercial interiors, heritage & new construction"],
  ["Materials", "Australian hardwoods, engineered timber, steel, glass, stone"],
  ["Build Standard", "National Construction Code (NCC) 2022, AS 1684 timber framing"],
  ["Compliance", "Licensed & insured builders, certified at each inspection stage"],
  ["Coverage", "Metro & regional Australia — VIC, NSW, QLD on request"],
  ["Typical Timeline", "Fit-outs 3–6 weeks · renovations 8–16 weeks · new builds 6–10 months"],
  ["Warranty", "Structural workmanship guarantee plus statutory builder's warranty"],
  ["Consultation", "On-site scope, fixed written quote, no-obligation first meeting"],
  ["Ownership", "Australian-owned & operated, directly accountable management"],
];

export default function SpecsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(4rem, 10vh, 8rem) clamp(1.5rem, 6vw, 7rem)",
      }}
    >
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
          marginBottom: "1rem",
        }}
      >
        How We Build
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0, 0, 1] }}
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 600,
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
          maxWidth: 720,
          marginBottom: "clamp(2.5rem, 6vh, 4rem)",
        }}
      >
        The architecture of precision.
      </motion.h2>

      <div style={{ maxWidth: 920 }}>
        {rows.map(([label, value], i) => (
          <motion.div
            className="spec-row"
            key={label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2 + i * 0.1,
              ease: [0.25, 0, 0, 1],
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(140px, 1fr) minmax(0, 2fr)",
              gap: "1.5rem",
              alignItems: "baseline",
              padding: "1.1rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-opensans)",
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-opensans)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.5,
                color: "#E5E5E5",
              }}
            >
              {value}
            </span>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width: 520px) {
          .spec-row {
            grid-template-columns: 1fr !important;
            gap: 0.3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
