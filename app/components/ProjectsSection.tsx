"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ACCENT = "#8B5E3C";

type Project = {
  img: string;
  category: string;
  name: string;
  location: string;
};

const projects: Project[] = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    category: "Renovation",
    name: "Modern Coastal Home",
    location: "Bondi, NSW",
  },
  {
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    category: "Carpentry",
    name: "Bespoke Kitchen Joinery",
    location: "Melbourne, VIC",
  },
  {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    category: "Construction",
    name: "Mixed-Use Development",
    location: "Brisbane, QLD",
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    category: "Fit-Out",
    name: "Boutique Café Fit-Out",
    location: "Surry Hills, NSW",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    category: "Renovation",
    name: "Luxury Ensuite Remodel",
    location: "Perth, WA",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    category: "Construction",
    name: "Contemporary Family Home",
    location: "Adelaide, SA",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="work"
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
        Portfolio
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
        Recent work, delivered across Australia.
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((p, i) => (
          <motion.figure
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.1,
              ease: [0.25, 0, 0, 1],
            }}
            className="proj-card"
            style={{
              position: "relative",
              margin: 0,
              overflow: "hidden",
              aspectRatio: "4 / 3",
              border: "1px solid rgba(139,94,60,0.2)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="proj-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(0.25) brightness(0.85)",
                transition: "transform 0.6s ease, filter 0.4s ease",
              }}
            />
            <figcaption
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1.4rem",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-opensans)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: "0.5rem",
                }}
              >
                {p.category}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: "#fff",
                  marginBottom: "0.25rem",
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-opensans)",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: "#E5E5E5",
                }}
              >
                {p.location}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <style>{`
        .proj-card:hover .proj-img {
          transform: scale(1.06);
          filter: grayscale(0) brightness(1);
        }
      `}</style>
    </section>
  );
}
