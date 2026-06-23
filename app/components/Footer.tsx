"use client";

const ACCENT = "#8B5E3C";

const columns = [
  {
    title: "Quick Links",
    items: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Our Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Flooring", href: "#services" },
      { label: "Carpentry", href: "#services" },
      { label: "Construction", href: "#services" },
      { label: "Renovation", href: "#services" },
      { label: "Fit-Outs", href: "#services" },
    ],
  },
];

const contact = [
  "(00) 0000 0000",
  "info@gulzarconstruction.com.au",
  "Based in Australia",
  "Mon–Fri 7:00am – 5:00pm AEST",
];

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-opensans)",
    fontWeight: 300,
    fontSize: "0.9rem",
    color: "#8A8A8A",
    textDecoration: "none",
  };

  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(139,94,60,0.2)",
        padding: "clamp(3.5rem, 8vh, 6rem) clamp(1.5rem, 6vw, 7rem) 2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "2.5rem",
          maxWidth: 1200,
          marginBottom: "3rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.16em",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            GULZAR <span style={{ color: ACCENT }}>CONSTRUCTION</span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-opensans)",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "#8A8A8A",
              maxWidth: 300,
            }}
          >
            Premium construction, renovation and fit-out services. Australian-owned
            and trusted across the country.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: "var(--font-opensans)",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: "1.1rem",
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {col.items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E5E5E5")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4
            style={{
              fontFamily: "var(--font-opensans)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "1.1rem",
            }}
          >
            Contact Info
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {contact.map((c) => (
              <li
                key={c}
                style={{
                  fontFamily: "var(--font-opensans)",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "#8A8A8A",
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "1.6rem",
          fontFamily: "var(--font-opensans)",
          fontWeight: 300,
          fontSize: "0.8rem",
          color: "#8A8A8A",
        }}
      >
        © 2026 Gulzar Construction. All Rights Reserved. ABN: XX XXX XXX XXX
      </div>
    </footer>
  );
}
