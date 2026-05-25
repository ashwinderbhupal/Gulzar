# Gulzar Construction

The official website for **Gulzar Construction** — an Australian-owned construction company delivering premium carpentry, construction, renovation, and fit-out services across Australia.

Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, no backend required.

## Live preview

Deploy this folder to any static host:

- **Vercel** — drag-and-drop at [vercel.com](https://vercel.com), or connect this GitHub repo for auto-deploy on every push
- **Netlify** — same idea, drag-and-drop or GitHub integration at [netlify.com](https://netlify.com)
- **GitHub Pages** — free, hosted directly from this repo (see below)

### Enable GitHub Pages

1. Go to this repo's **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Pick branch **`main`** and folder **`/ (root)`**, then **Save**
4. Your site goes live at `https://<your-username>.github.io/Gulzar/` within ~1 minute

## Project structure

```
├── index.html          # Home (hero, about, services, projects, why-us, testimonials, CTA)
├── projects.html       # Portfolio with 12 filterable project cards
├── contact.html        # Contact info + Formspree-powered enquiry form
├── css/
│   ├── style.css       # Global styles + design system (CSS variables)
│   └── animations.css  # Scroll-reveal animations
├── js/
│   ├── main.js         # Navbar, hamburger, scroll-reveal, counters, back-to-top
│   ├── gallery.js      # Project category filtering
│   └── form.js         # Form validation + Formspree submission
├── images/
│   └── logo.png        # Brand logo (transparent background)
└── README.md
```

## Design system

| Token | Value |
|---|---|
| Primary (deep black) | `#1a1a1a` |
| Accent (warm wood brown) | `#8B5E3C` |
| Background | `#f9f9f9` |
| Text | `#222222` |
| Heading font | Montserrat (Google Fonts) |
| Body font | Open Sans (Google Fonts) |
| Icons | Font Awesome 6 (CDN) |

All colors are defined as CSS variables in `css/style.css` — change them in one place to re-theme the entire site.

## Contact form

The form on `contact.html` is wired to [Formspree](https://formspree.io) (free tier, 50 submissions/month). Submissions are emailed straight to the account owner — no database, no backend.

To use your own form ID, edit `contact.html` and replace the value in the form's `action` attribute.

## Features

- Fully responsive (mobile-first, breakpoints at 480 / 768 / 1024px)
- Sticky navigation with scroll-triggered styling
- Scroll-reveal animations powered by `IntersectionObserver` (no jQuery)
- Animated stat counters
- Vanilla-JS project filtering with smooth transitions
- Client-side form validation with inline error messages
- Async form submission to Formspree (no page reload)
- Back-to-top floating button
- Full SEO meta tags + Open Graph on every page
- `prefers-reduced-motion` support

## Helper scripts

The `*.py` scripts in the project root are one-off helpers that were used to prepare the logo image (remove background, recolor the mark, trim whitespace). They're **not** used by the website at runtime and can be deleted without affecting anything.

## License

© Gulzar Construction. All rights reserved.
