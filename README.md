# Gulzar Construction — Scroll Hero

A scroll-driven landing page where a luxury home assembles itself, foundation to
finished build, as you scroll. Built with **Next.js 15, React 19, Framer Motion,
TypeScript**. The hero scrub is a `<canvas>` driving preloaded JPEG frames (no
`<video>` element, no scroll listener — a `requestAnimationFrame` loop reading
`getBoundingClientRect`).

## Run it

```bash
# If a partial node_modules/ folder exists from an earlier attempt, delete it first.
npm install
npm run dev
# open http://localhost:3000
```

Verify:
- `http://localhost:3000` loads on a pure-black page
- `http://localhost:3000/frames/frame_0001.jpg` returns 200
- Scrolling the hero (first 300vh) scrubs the home from empty void to fully
  assembled, frame by frame
- Services, Specs, and CTA sections fade in on scroll

## The hero: scroll scrub through the Veo render (live)

The hero scrubs the real **Veo 3.1** video frame-by-frame as you scroll: the
home assembles itself from exploded structure to finished build. The video was
generated in **Google Flow** (Veo 3.1 Quality) by interpolating between the two
Higgsfield reference frames (exploded view → finished home), exported as
`hero.mp4`, then extracted to a 1920px JPEG sequence with the watermark removed.

Active frames: `public/hero-seq/frame_0001.jpg … frame_0192.jpg`
(`FRAME_COUNT = 192` in `app/components/ScrollHero.tsx`). Engine is exactly per
the brief: a `<canvas>`, no `<video>` element, no scroll listener — a
`requestAnimationFrame` loop reading `getBoundingClientRect`, cover-fit on black.

### Regenerating / replacing the hero video

Drop a new `hero.mp4` in the project root and re-extract (watermark-removal
`delogo` filter optional):

```bash
ffmpeg -i hero.mp4 -vf "fps=24,scale=1920:-1,delogo=x=1505:y=955:w=405:h=118" \
  -q:v 3 "public/hero-seq/frame_%04d.jpg"
```

Then set `FRAME_COUNT` in `ScrollHero.tsx` to the new frame count.

### Unused fallbacks (safe to ignore or delete)

- `public/hero/` — the two stills + an earlier free scroll-morph version.
- `public/frames/` + `gen_frames.py` — a synthetic 120-frame assembly used
  before the Veo render existed.

## Design tokens

Black `#000000` · text `#FFFFFF` / body `#E5E5E5` / dim `#8A8A8A` ·
accent `#8B5E3C`, hover `#B07C50` · subtle border `rgba(139,94,60,0.2)` ·
display **Montserrat 600**, body **Open Sans 300–500**.

## Structure

```
app/
  layout.tsx              Montserrat + Open Sans as CSS vars, page <title>
  globals.css             reset + black body
  page.tsx                <main> → Hero · Services · Specs · CTA
  components/
    Navbar.tsx            minimal sticky nav, solidifies on scroll, mobile menu
    ScrollHero.tsx        canvas scroll-morph between the two Higgsfield stills
    AboutSection.tsx      story + animated stat counters + trust badges
    ServicesSection.tsx   6 service cards, SVG icons, real copy
    ProjectsSection.tsx   6-piece portfolio gallery, hover reveal
    SpecsSection.tsx      "How We Build" spec table (AU construction details)
    TestimonialsSection.tsx  3 client reviews, 5-star, dark cards
    ClosingCTA.tsx        "A foundation of trust." + consultation CTA
    ContactSection.tsx    enquiry form wired to Formspree + contact details
    Footer.tsx            brand, quick links, services, contact, copyright
public/
  frames/                 frame_0001.jpg … frame_0120.jpg
  hero.mp4                reference video (built from frames)
gen_frames.py             placeholder frame generator (regenerate any time)
```

Verified: `npm run build` compiles cleanly (TypeScript checks pass, all routes
prerender). Mobile responsive — grids collapse to a single column on narrow
viewports via `auto-fill` / `minmax`.
