"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ACCENT = "#8B5E3C";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meedlrwp";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(139,94,60,0.25)",
  color: "#fff",
  fontFamily: "var(--font-opensans)",
  fontSize: "0.95rem",
  padding: "0.85rem 1rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-opensans)",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#8A8A8A",
  marginBottom: "0.5rem",
};

const details = [
  { label: "Phone", value: "(00) 0000 0000" },
  { label: "Email", value: "info@gulzarconstruction.com.au" },
  { label: "Location", value: "Australia" },
  { label: "Hours", value: "Mon–Fri 7:00am – 5:00pm AEST" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 7rem)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(2.5rem, 6vw, 5rem)",
          maxWidth: 1100,
        }}
      >
        {/* Left: details */}
        <div>
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
            Get In Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0, 0, 1] }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: "1.4rem",
            }}
          >
            Let's talk about your project.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0, 0, 1] }}
            style={{
              fontFamily: "var(--font-opensans)",
              fontWeight: 300,
              fontSize: "1.02rem",
              lineHeight: 1.7,
              color: "#E5E5E5",
              maxWidth: 420,
              marginBottom: "2.4rem",
            }}
          >
            Have a project in mind, or just a question? Drop us a line and our
            team will respond within 24 hours with honest advice — no obligation.
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.08,
                  ease: [0.25, 0, 0, 1],
                }}
              >
                <div style={labelStyle}>{d.label}</div>
                <div
                  style={{
                    fontFamily: "var(--font-opensans)",
                    fontSize: "1rem",
                    color: "#fff",
                  }}
                >
                  {d.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
              gap: "1.1rem",
            }}
          >
            <div>
              <label style={labelStyle} htmlFor="name">
                Full Name *
              </label>
              <input id="name" name="name" required style={inputStyle} placeholder="John Smith" />
            </div>
            <div>
              <label style={labelStyle} htmlFor="email">
                Email *
              </label>
              <input id="email" name="email" type="email" required style={inputStyle} placeholder="john@example.com" />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
              gap: "1.1rem",
            }}
          >
            <div>
              <label style={labelStyle} htmlFor="phone">
                Phone *
              </label>
              <input id="phone" name="phone" type="tel" required style={inputStyle} placeholder="04XX XXX XXX" />
            </div>
            <div>
              <label style={labelStyle} htmlFor="service">
                Service *
              </label>
              <select id="service" name="service" required style={inputStyle} defaultValue="">
                <option value="" disabled style={{ color: "#000" }}>
                  Select a service…
                </option>
                {["Flooring", "Carpentry", "Construction", "Renovation", "Fit-Outs", "Other"].map(
                  (s) => (
                    <option key={s} value={s} style={{ color: "#000" }}>
                      {s}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle} htmlFor="location">
              Project Location *
            </label>
            <input id="location" name="location" required style={inputStyle} placeholder="Suburb / City, State (e.g. Bondi, NSW)" />
          </div>

          <div>
            <label style={labelStyle} htmlFor="description">
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Tell us about your project — size, timeline, goals, budget range…"
            />
          </div>

          {/* honeypot */}
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              alignSelf: "flex-start",
              background: ACCENT,
              color: "#000",
              fontFamily: "var(--font-opensans)",
              fontWeight: 500,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              border: "none",
              padding: "0.95rem clamp(1.6rem, 4vw, 2.6rem)",
              cursor: status === "sending" ? "default" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#B07C50")}
            onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT)}
          >
            {status === "sending" ? "Sending…" : "Send My Enquiry"}
          </button>

          {status === "ok" && (
            <p style={{ fontFamily: "var(--font-opensans)", fontSize: "0.9rem", color: ACCENT }}>
              Thanks — your enquiry is on its way. We'll be in touch within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p style={{ fontFamily: "var(--font-opensans)", fontSize: "0.9rem", color: "#c97b6a" }}>
              Something went wrong. Please email us directly at info@gulzarconstruction.com.au.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
