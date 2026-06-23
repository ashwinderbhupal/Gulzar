"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Scroll-driven hero — canvas frame scrub.
 *
 * Scrubs through the real Veo 3.1 hero render (generated in Google Flow from the
 * two Higgsfield reference frames) as the user scrolls: the home assembles itself
 * from exploded structure to finished build. Frames live at
 * /hero-seq/frame_0001.jpg … frame_0192.jpg (watermark removed, 1920px wide).
 *
 * No <video> element, no scroll listener — a requestAnimationFrame loop reading
 * getBoundingClientRect, per the brief.
 */
const FRAME_COUNT = 192;
const BASE = process.env.NODE_ENV === 'production' ? "/Gulzar" : "";

const framePath = (i: number) =>
  `${BASE}/hero2-frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let currentIdx = -1;
    let rafId = 0;

    // Cover-fit (desktop/landscape) or contain-fit (portrait/mobile) draw.
    const draw = (index: number) => {
      const img = images[index];
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cw, ch);

      if (!img || !img.complete || img.naturalWidth === 0) {
        // Frame not loaded yet — leave currentIdx unset so the rAF loop
        // retries and repaints this frame as soon as it finishes loading.
        currentIdx = -1;
        return;
      }

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // Portrait viewport → contain (show full frame); landscape → cover (fill)
      const isPortrait = cw < ch;
      const scale = isPortrait
        ? Math.min(cw / iw, ch / ih)
        : Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = isPortrait ? (ch - dh) / 3 : (ch - dh) / 2; // bias upward on portrait
      ctx.drawImage(img, dx, dy, dw, dh);
      currentIdx = index;
    };

    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    sizeCanvas();

    // Preload every frame; draw frame 0 as soon as the first one is ready.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      if (i === 0) {
        img.onload = () => {
          if (currentIdx === -1) draw(0);
        };
      }
      images[i] = img;
    }

    // rAF loop — no scroll event listener.
    const tick = () => {
      const top = container.getBoundingClientRect().top;
      const progress = Math.max(
        0,
        Math.min(1, -top / (container.offsetHeight - window.innerHeight))
      );
      const target = Math.round(progress * (FRAME_COUNT - 1));
      if (target !== currentIdx) draw(target);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      sizeCanvas();
      draw(currentIdx < 0 ? 0 : currentIdx);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
          }}
        >
          <div
            style={{
              padding: "0 clamp(1.5rem, 6vw, 7rem) clamp(3rem, 9vh, 7rem)",
              maxWidth: 760,
            }}
          >
            <motion.span
              {...fade(0.8)}
              style={{
                display: "block",
                fontFamily: "var(--font-opensans)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#8B5E3C",
                marginBottom: "1.1rem",
              }}
            >
              Australian-Owned Craftsmanship
            </motion.span>

            <motion.h1
              {...fade(0.95)}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 600,
                fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
              }}
            >
              Gulzar Construction
            </motion.h1>

            <motion.p
              {...fade(1.1)}
              style={{
                fontFamily: "var(--font-opensans)",
                fontWeight: 300,
                fontSize: "clamp(1rem, 1.4vw, 1.18rem)",
                lineHeight: 1.6,
                color: "#E5E5E5",
                maxWidth: 460,
                marginBottom: "2rem",
              }}
            >
              Premium carpentry, construction, and fit-outs, built to last across
              Australia.
            </motion.p>

            <motion.a
              {...fade(1.25)}
              href="#services"
              style={{
                pointerEvents: "auto",
                display: "inline-block",
                background: "#8B5E3C",
                color: "#000",
                fontFamily: "var(--font-opensans)",
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.9rem clamp(1.6rem, 4vw, 2.6rem)",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#B07C50")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8B5E3C")}
            >
              View Our Work
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
