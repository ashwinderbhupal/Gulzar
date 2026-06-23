"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ACCENT = "#8B5E3C";

const reviews = [
  {
    text: "Gulzar Construction transformed our 1970s home into a modern dream. The craftsmanship is incredible and the team kept us informed every single day. Highly recommend.",
    initials: "SM",
    name: "Sarah Mitchell",
    location: "Sydney, NSW",
  },
  {
    text: "We engaged Gulzar for our café fit-out and they delivered ahead of schedule. Brilliant attention to detail and a genuinely professional crew from start to finish.",
    initials: "JT",
    name: "James Thompson",
    location: "Melbourne, VIC",
  },
  {
    text: "Best builders we've worked with — transparent pricing, beautiful carpentry, and they finished our extension on budget. Five stars all the way.",
    initials: "EW",
    name: "Emily Walker",
    location: "Brisbane, QLD",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
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
        Testimonials
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
        What our clients say.
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {reviews.map((r, i) => (
          <motion.article
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.1,
              ease: [0.25, 0, 0, 1],
            }}
            style={{
              border: "1px solid rgba(139,94,60,0.2)",
              padding: "2rem 1.8rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              aria-label="5 out of 5 stars"
              style={{
                color: ACCENT,
                fontSize: "0.95rem",
                letterSpacing: "0.15em",
                marginBottom: "1.2rem",
              }}
            >
              ★★★★★
            </div>
            <p
              style={{
                fontFamily: "var(--font-opensans)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "#E5E5E5",
                marginBottom: "1.8rem",
                flexGrow: 1,
              }}
            >
              “{r.text}”
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(139,94,60,0.18)",
                  border: "1px solid rgba(139,94,60,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: ACCENT,
                }}
              >
                {r.initials}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#fff",
                  }}
                >
                  {r.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-opensans)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "#8A8A8A",
                  }}
                >
                  {r.location}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
