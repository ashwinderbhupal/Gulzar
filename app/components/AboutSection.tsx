"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#8B5E3C";

const stats = [
  { target: 150, suffix: "+", label: "Projects Completed" },
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 200, suffix: "+", label: "Happy Clients" },
  { target: 100, suffix: "%", label: "Quality Guaranteed" },
];

const badges = ["Licensed", "Insured", "Australian Owned", "Free Quotes"];

function Counter({
  target,
  suffix,
  run,
}: {
  target: number;
  suffix: string;
  run: boolean;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 7rem)",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          marginBottom: "clamp(3rem, 7vh, 5rem)",
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
          Who We Are
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
            marginBottom: "1.6rem",
          }}
        >
          Crafting quality spaces across Australia.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "var(--font-opensans)",
            fontWeight: 300,
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "#E5E5E5",
          }}
        >
          Gulzar Construction is a proudly Australian-owned company delivering
          high-quality carpentry, construction, renovation, and fit-out services
          to homeowners and businesses nationwide. With over a decade of hands-on
          experience, we pair traditional craftsmanship with modern building
          practice — from precision joinery to full-scale commercial fit-outs —
          delivered on time and on budget, every project.
        </motion.p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "1.5rem",
          marginBottom: "clamp(2.5rem, 6vh, 4rem)",
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2 + i * 0.1,
              ease: [0.25, 0, 0, 1],
            }}
            style={{
              borderTop: "1px solid rgba(139,94,60,0.2)",
              paddingTop: "1.4rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                color: ACCENT,
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              <Counter target={s.target} suffix={s.suffix} run={inView} />
            </div>
            <div
              style={{
                fontFamily: "var(--font-opensans)",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "#E5E5E5",
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0, 0, 1] }}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}
      >
        {badges.map((b) => (
          <span
            key={b}
            style={{
              fontFamily: "var(--font-opensans)",
              fontWeight: 500,
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#E5E5E5",
              border: "1px solid rgba(139,94,60,0.4)",
              borderRadius: 999,
              padding: "0.55rem 1.3rem",
            }}
          >
            {b}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
