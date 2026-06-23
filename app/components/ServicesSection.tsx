"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ACCENT = "#8B5E3C";

type Service = {
  title: string;
  body: string;
  icon: ReactNode;
  tag?: string;
};

const icon = (paths: ReactNode) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke={ACCENT}
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

const services: Service[] = [
  {
    title: "Premium Flooring",
    tag: "Signature Service",
    body: "The trade we're best known for. Engineered and solid-timber floors, Australian hardwood, herringbone and parquetry, floating floors and polished finishes — supplied, laid, sanded, and sealed to a flawless, hard-wearing result.",
    icon: icon(
      <>
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
        <path d="M8 6v6" />
        <path d="M15 12v6" />
      </>
    ),
  },
  {
    title: "Master Carpentry",
    body: "Hand-finished framing, staircases, and bespoke timber detailing executed by qualified carpenters who treat every joint as a finished surface.",
    icon: icon(
      <>
        <path d="M3 21l6-6" />
        <path d="M14 4l6 6-3 3-6-6z" />
        <path d="M11 7l-7 7 3 3 7-7" />
      </>
    ),
  },
  {
    title: "Custom Renovations",
    body: "Full-scope home transformations — from structural reconfiguration to final fit-off — delivered with minimal disruption and a fixed, transparent scope.",
    icon: icon(
      <>
        <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 21V12h6v9" />
      </>
    ),
  },
  {
    title: "Premium Fit-Outs",
    body: "Commercial and residential interiors built to architectural drawings, with cabinetry, joinery, and surfaces aligned to the millimetre.",
    icon: icon(
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </>
    ),
  },
  {
    title: "Structural Builds",
    body: "New builds, extensions, and load-bearing works engineered to plan and certified to the National Construction Code at every inspection stage.",
    icon: icon(
      <>
        <path d="M12 2L2 7v13h20V7z" />
        <path d="M7 20V11h10v9" />
        <path d="M12 11v9" />
      </>
    ),
  },
  {
    title: "Australian Hardwood Joinery",
    body: "Locally sourced spotted gum, blackbutt, and Tasmanian oak crafted into doors, frames, and feature joinery built for the Australian climate.",
    icon: icon(
      <>
        <path d="M12 2v20" />
        <path d="M12 6c3-2 6-1 8 1-2 2-5 3-8 1" />
        <path d="M12 11c-3-2-6-1-8 1 2 2 5 3 8 1" />
      </>
    ),
  },
  {
    title: "Turnkey Project Delivery",
    body: "A single point of accountability from first consultation to handover — design coordination, trades, compliance, and finish managed end to end.",
    icon: icon(
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="M11.5 11.5L21 21" />
        <path d="M16 16l-2 2 3 3 2-2z" />
      </>
    ),
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 7rem)",
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
        Crafted Without Compromise
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
        Every trade under one disciplined roof.
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.1,
              ease: [0.25, 0, 0, 1],
            }}
            style={{
              borderTop: s.tag
                ? "2px solid #8B5E3C"
                : "1px solid rgba(139,94,60,0.2)",
              paddingTop: "1.6rem",
            }}
          >
            {s.tag && (
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-opensans)",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#000",
                  background: ACCENT,
                  padding: "0.3rem 0.7rem",
                  marginBottom: "1.2rem",
                }}
              >
                {s.tag}
              </span>
            )}
            <div style={{ marginBottom: "1.4rem" }}>{s.icon}</div>
            <h3
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 600,
                fontSize: "1.2rem",
                color: "#FFFFFF",
                marginBottom: "0.7rem",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-opensans)",
                fontWeight: 300,
                fontSize: "0.98rem",
                lineHeight: 1.6,
                color: "#E5E5E5",
              }}
            >
              {s.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
