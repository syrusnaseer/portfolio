# Technical Design Specification
## Syrus Naseer — Personal Portfolio Website

**Version:** 1.3
**Date:** October 1, 2026
**Visual Direction:** Editorial Black & White — bold compressed type, stark contrast, scroll-driven animations, interactive selection states

---

## 1. Visual Direction & Mood

Inspired by high-end creative studios (e.g., Cosmos Studio reference). The aesthetic is:

- **Pure black** base (`#080808`) with **stark white** display type as the hero element
- **Mid-grey** for secondary/utility text — no neon, no colour accents
- Contrast and typography carry the entire visual weight
- Thin viewport **border frame** gives a contained, premium gallery feel
- Scattered **corner metadata** (coordinates, live clock, semester, availability)
- Large **ultra-compressed display font** bleeding close to viewport edges
- Subtle grain/noise texture overlay for depth
- **Scroll is the primary interaction** — everything animates in/out based on scroll position
- Interactive selection states on nav links, filter pills, skill chips, project cards

---

## 2. Technology Stack

| Concern | Choice | Reason |
|---|---|---|
| Markup | **HTML5** | Static, zero cost, Vercel-native |
| Styling | **CSS3** (custom properties, Grid, Flexbox) | No framework overhead; full control |
| Scripting | **Vanilla JavaScript** (ES Modules) | No build step; deploys as-is to Vercel |
| Scroll animations | **GSAP + ScrollTrigger (CDN, free)** | Industry-standard scroll-driven animation |
| Smooth scroll | **Lenis (CDN, free)** | Buttery momentum scrolling between sections |
| Typewriter | **Typed.js (CDN, free)** | Lightweight cycling text with cursor |
| 3D / Canvas | **Three.js (CDN, free)** | Animated hero background geometry |
| Contact form | **EmailJS (free tier)** | No backend; sends from browser directly |
| Fonts | **Google Fonts CDN** | Zero cost |
| Deployment | **Vercel** (static, free hobby plan) | Zero cost, auto-deploys from GitHub |

**Zero-cost guarantee:** Every dependency is free. No servers, no databases, no paid tiers.

---

## 3. Colour Palette

```
--color-bg:        #080808    /* near-black base */
--color-bg-soft:   #111111    /* card / section surfaces */
--color-border:    #1f1f1f    /* dividers, frame, card edges */
--color-white:     #f0f0f0    /* primary text, hero display type */
--color-grey-hi:   #aaaaaa    /* subheadings, labels */
--color-grey-mid:  #666666    /* secondary / utility text, metadata */
--color-grey-lo:   #2a2a2a    /* disabled, muted backgrounds */
--color-accent:    #ffffff    /* pure white for max-contrast moments */
```

Hover and selection states use **white ↔ grey** transitions and **opacity shifts** — never colour changes.

---

## 4. Typography

| Role | Font | Weight |
|---|---|---|
| Display / Hero name | **Bebas Neue** | 400 — uppercase, compressed, massive |
| Section headings | **Inter** | 700–900 — tight tracking |
| Body / descriptions | **Inter** | 400–500 |
| Utility / metadata / tags | **JetBrains Mono** | 400 — coordinates, clock, chips |

### Type Scale
```
--text-display:  clamp(5rem, 13vw, 12rem)    /* Hero name — bleeds edge to edge */
--text-h2:       clamp(2rem, 5vw, 4rem)      /* Section titles */
--text-h3:       1.5rem
--text-body:     1rem (16px base)
--text-small:    0.75rem                     /* Metadata, corner text */
```

---

## 5. Smooth Scroll Architecture

**Lenis** wraps the entire page scroll. This gives:
- Momentum-based easing on all scroll events
- Consistent scroll speed across OS/browser
- GSAP ScrollTrigger integrates directly with Lenis via the `ScrollTrigger.normalizeScroll()` bridge

### Section Scroll Behaviour
- Clicking a nav link calls `lenis.scrollTo('#section-id', { duration: 1.4, easing: easeInOutCubic })`
- The scroll eases smoothly to the target section — not an instant jump
- Active nav link updates in real time as the user scrolls past each section's trigger point
- A progress indicator (thin white line on the left or top edge) tracks scroll depth

---

## 6. Scroll-Driven Animation Map

Every section has defined scroll entrance and (optionally) pinned / parallax behaviour.
All animations use **GSAP ScrollTrigger** with `trigger`, `start`, `end`, and `scrub` or `toggleActions`.

| Section | Animation | GSAP Config |
|---|---|---|
| **Hero — name** | Clip-path wipe up from masked container | `from: clipPath 'inset(100% 0 0 0)'` on page load (not scroll) |
| **Hero — subtitle** | Fade + slide up, 0.3 s delay after name | `from: { y: 30, opacity: 0 }` |
| **Hero — metadata corners** | Fade in staggered, 0.1 s apart | `stagger: 0.1` |
| **Hero — Three.js bg** | Parallax: mesh moves at 0.3× scroll speed | `scrub: true`, `y` mapped to scroll offset |
| **Stats row** | Each counter counts 0 → target as row enters view | `onEnter` callback, GSAP counter tween |
| **About — heading** | Text lines split and wipe up one by one | GSAP SplitText (or manual spans) |
| **About — education nodes** | Timeline line draws from top to bottom | `scaleY: 0 → 1` on the `::before` line pseudo |
| **Skills — category labels** | Slide in from left | `from: { x: -40, opacity: 0 }` per label |
| **Skills — chips** | Stagger cascade: left to right, row by row | `stagger: { each: 0.05, from: 'start' }` |
| **Projects — section title** | Large text scrubs across horizontally (marquee-like) while pinned briefly | `scrub: 1`, `pin: true`, `x` offset |
| **Projects — cards** | Cards fade + scale in from below, staggered | `from: { y: 60, opacity: 0, scale: 0.95 }` |
| **Contact — heading** | Character-by-character reveal on scroll | Manual span split + stagger opacity |
| **Contact — form fields** | Slide up one by one | `stagger: 0.1, from: { y: 30, opacity: 0 }` |
| **Footer** | Fade in as page bottoms out | Simple `toggleActions: 'play none none reverse'` |

### Scrub vs Snap
- **Scrub animations** (`scrub: true`): hero parallax, projects marquee title — tied directly to scroll position, feel physical
- **Snap animations** (`toggleActions`): section entrances — fire once when scrolled into view, do not reverse on scroll-back (keeps it clean)

---

## 7. Interactive Selection States

Every interactive element has a defined **default → hover → active/selected** state.

### Nav Links
```
default:   colour: var(--color-grey-hi);  no underline
hover:     colour: var(--color-white);    underline fades in (0.2s)
active:    colour: var(--color-white);    small white dot below link (position: absolute)
```

### Resume Button (Nav)
```
default:   border: 1px solid #fff;  background: transparent;  color: #fff
hover:     background: #fff;  color: #080808;  transition: 0.25s
```

### CTA Buttons (Hero)
```
"View Projects"  default:  background: #fff; color: #080808
                 hover:    background: transparent; color: #fff; border: 1px solid #fff
"Get In Touch"   default:  background: transparent; border: 1px solid #fff; color: #fff
                 hover:    background: #fff; color: #080808
```
Both buttons have a `::after` pseudo-element that creates a slide-fill effect on hover.

### Project Filter Pills
```
default:   border: 1px solid var(--color-border);  color: var(--color-grey-mid)
hover:     border-color: var(--color-grey-hi);     color: var(--color-grey-hi)
selected:  background: var(--color-white);         color: var(--color-bg);  border-color: #fff
```
Clicking a filter pill:
1. Pill animates to selected state
2. Non-matching cards GSAP fade + scale out (`opacity: 0, scale: 0.9, duration: 0.3`)
3. Matching cards fade + scale in (`opacity: 1, scale: 1, duration: 0.3`)

### Skill Chips
```
default:   border: 1px solid var(--color-border);  color: var(--color-grey-hi);  background: transparent
hover:     background: var(--color-white);         color: var(--color-bg);       border-color: #fff
           transform: translateY(-2px);            box-shadow: 0 4px 20px rgba(255,255,255,0.1)
```

### Project Cards
```
default:   border: 1px solid var(--color-border);  background: var(--color-bg-soft)
hover:     border-color: var(--color-white);
           transform: translateY(-6px);
           box-shadow: 0 12px 40px rgba(255,255,255,0.05)
           transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Form Fields
```
default:   background: transparent;  border-bottom: 1px solid var(--color-grey-lo);  color: #fff
focus:     border-bottom-color: var(--color-white);  outline: none
           label floats up (transforms above the input)
invalid:   border-bottom-color: #ff4444;  error message fades in below
```

---

## 8. Layout & Page Sections

Single-page design with a thin inner **frame border** (`1px solid var(--color-border)`) inset from viewport edges, giving the contained editorial look.

```
┌─────────────────────────────────────────────────────┐
│  [NAV]  <Syrus/>    About  Skills  Projects  Contact │
├─────────────────────────────────────────────────────┤
│  [HERO]  100dvh                                      │
│   Corner metadata  |  SYRUS NASEER (Bebas Neue)     │
│   Typewriter role  |  Bio + CTAs + Social icons      │
│   Three.js animated bg mesh                          │
├─────────────────────────────────────────────────────┤
│  [STATS ROW]  4 animated counters                    │
├─────────────────────────────────────────────────────┤
│  [ABOUT]  Text left  |  Education timeline right     │
├─────────────────────────────────────────────────────┤
│  [SKILLS]  Grouped chip grid with stagger reveal     │
├─────────────────────────────────────────────────────┤
│  [PROJECTS]  Filter pills  +  Card grid  +  Modal    │
├─────────────────────────────────────────────────────┤
│  [CONTACT]  Static info left  |  Form right          │
├─────────────────────────────────────────────────────┤
│  [FOOTER]  Logo · Links · Copyright · Back to top   │
└─────────────────────────────────────────────────────┘
```

---

## 9. Component Breakdown

### 9.1 Navbar
- Fixed top, `backdrop-filter: blur(12px)`, subtle bottom border
- Left: `<Syrus/>` in JetBrains Mono
- Right: nav links + Resume button
- **Scroll spy**: JS IntersectionObserver sets `.active` class as sections enter viewport
- Mobile: hamburger → full-screen overlay with large nav links that animate in staggered

### 9.2 Hero
- Full viewport (`100dvh`), overflow hidden
- Three.js `<canvas>` as absolute background — slow wireframe geometry, very subtle
- Absolute-positioned corner metadata (coordinates, live clock, CGPA, semester)
- Content stack: badge → greeting → name → typewriter → bio → CTAs → social icons
- Scroll hint: small `↓ Scroll` text + bouncing arrow at bottom centre

### 9.3 Stats Row
- 4-column grid
- Counters animate with GSAP when row enters viewport
- Values: `4+ Projects` · `6+ Technologies` · `6th Semester` · `2+ Years Coding`

### 9.4 About
- Left: bio text with word-by-word scroll reveal
- Right: education timeline — vertical line draws down, nodes pop in as line reaches them

### 9.5 Skills
- 6 category rows, each with a label and a flex-wrap row of chips
- Entire section staggers in left-to-right as user scrolls through

### 9.6 Projects Gallery
- Filter pills at top — clicking one filters cards with GSAP transitions
- Cards in CSS Grid — 2 columns desktop, 1 mobile
- Each card: category tag → project name → description → tech chips → links
- Modal: GSAP scale-in from card position, dark overlay, full description, close on Escape/overlay

### 9.7 Contact
- Underline-style inputs with floating labels
- EmailJS sends on submit; button shows spinner → success tick or error state
- Static details shown alongside form

### 9.8 Footer
- Single row layout
- Fixed circular back-to-top button (bottom-right) fades in after first scroll

---

## 10. Responsive Breakpoints

| Label | Width | Key changes |
|---|---|---|
| `xs` | < 480px | Hero name shrinks; single column throughout; nav overlay |
| `sm` | 480–767px | Stats 2×2; about stacked |
| `md` | 768–1023px | 2-col hero content; 2-col projects |
| `lg` | 1024–1279px | Full desktop layout |
| `xl` | ≥ 1280px | Max-width 1400px, centred |

---

## 11. File & Folder Structure

```
Syrus Portfolio/
├── index.html
├── requirements.md
├── design.md
├── assets/
│   ├── css/
│   │   ├── reset.css          # Normalise, box-sizing
│   │   ├── variables.css      # All CSS custom properties
│   │   ├── base.css           # Body, typography, frame border
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── stats.css
│   │   ├── about.css
│   │   ├── skills.css
│   │   ├── projects.css
│   │   ├── modal.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   └── animations.css     # Keyframes, utility transitions
│   └── js/
│       ├── main.js            # Lenis init, GSAP registration, imports
│       ├── nav.js             # Scroll spy, hamburger, smooth scroll-to
│       ├── hero.js            # Three.js canvas
│       ├── clock.js           # Live clock update (setInterval)
│       ├── typed.js           # Typed.js configuration
│       ├── animations.js      # All GSAP ScrollTrigger declarations
│       ├── counter.js         # Stats counter tween
│       ├── projects.js        # Filter logic + modal
│       └── contact.js         # EmailJS submit handler
├── vercel.json                # Optional static routing config
└── .gitignore
```

---

## 12. Deployment — Vercel (Zero Cost)

1. Push all files to a **public GitHub repo**
2. Import repo into **Vercel** (vercel.com → New Project)
3. Build settings: **no build command**, output = `/` (root)
4. Vercel serves `index.html` as the entry point automatically
5. Free `*.vercel.app` subdomain provided instantly; custom domain optional

**EmailJS (free tier — 200 emails/month):**
1. Sign up at emailjs.com, connect Gmail service, create template
2. Load `emailjs.min.js` via CDN in `index.html`
3. Store Service ID, Template ID, Public Key as JS constants in `contact.js`

---

## 13. Accessibility

- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Skip-to-content link as first focusable element
- All `<section>` elements have `aria-labelledby`
- Modal: `role="dialog"`, `aria-modal="true"`, focus trap, Escape to close
- Typewriter: static `aria-label` listing all roles for screen readers
- Animated counters: `aria-live="polite"` announces final value
- `prefers-reduced-motion`: Lenis disabled, GSAP durations set to 0, Three.js loop paused
- Contrast: white `#f0f0f0` on `#080808` = 18.1:1 ✓ | grey `#aaaaaa` on `#080808` = 5.7:1 ✓

---

## 14. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.5 s |
| Total page weight | < 2 MB |
| Three.js FPS | ≥ 50 on mid-range hardware |
| Own JS (unminified) | < 40 KB |

**Strategies:**
- All CDN scripts loaded with `defer` or at end of `<body>`
- Three.js scene kept minimal (low poly, no textures)
- No images in hero — canvas replaces background image
- Google Fonts loaded with `display=swap`
- Lazy-load any project thumbnail images with `loading="lazy"`
