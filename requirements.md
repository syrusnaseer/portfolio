# Requirements Specification
## Syrus Naseer — Personal Portfolio Website

**Version:** 1.1  
**Date:** October 1, 2026  
**Author:** Syrus Naseer  

---

## 1. Project Overview & Goals

Build a dark-themed, animated personal portfolio website for **Syrus Naseer**, a Software Engineering student (6th Semester) at Capital University of Science & Technology (CUST), Islamabad, Pakistan. The site showcases his technical breadth across full-stack web development, AI/ML, game development, and IoT systems.

### Primary Goals
- Create a strong first impression for recruiters, collaborators, and clients
- Showcase 4 real projects with descriptions and GitHub links
- Communicate a wide, multi-domain skillset clearly and visually
- Provide an easy way for visitors to get in touch
- Deploy for free on Vercel with zero ongoing cost

### Target Audience
| Audience | Primary Need |
|---|---|
| Recruiters / HR | Quick scan of skills, projects, availability |
| Potential clients | Evidence of capability and contact path |
| Peer developers | Technical depth, GitHub link |
| University faculty | Academic context + project work |

---

## 2. Functional Requirements

### 2.1 Navigation
- FR-01: A sticky top navigation bar must display the logo `<Syrus/>` in code-tag style on the left.
- FR-02: Nav links must include: About, Skills, Projects, Experience, Contact, and a "Resume" CTA button (outlined style).
- FR-03: Clicking a nav link must smoothly scroll to the corresponding section.
- FR-04: The active section must be highlighted in the nav as the user scrolls.
- FR-05: On mobile, the nav must collapse into a hamburger menu.

### 2.2 Hero Section
- FR-06: Display greeting text "Hello, I'm" followed by the large name **Syrus Naseer**.
- FR-07: A typewriter/cycling animation must cycle through role labels: `Full-Stack Developer`, `AI/ML Engineer`, `Game Developer`, `IoT Engineer`.
- FR-08: Display a short bio paragraph drawn from the resume summary.
- FR-09: Display two CTA buttons: "View Projects" (filled/primary) and "Get In Touch" (outlined/secondary).
- FR-10: Display social icon links for GitHub (`github.com/syrusnaseer`) and LinkedIn (`linkedin.com/in/syrus-naseer-9b3253334`), plus the email `Syrus7083@gmail.com`.
- FR-11: Display a **Profile Info card** on the right side of the hero containing:
  - Location: Soan Garden, Islamabad, Pakistan
  - CGPA: 2.8 / 4.00
  - Available for work: Yes
  - Semester: 6th Semester — SE
  - Status badge: ACTIVE
- FR-12: A live animated background (particle network or subtle matrix/grid effect) must fill the hero section.
- FR-13: An "Available for opportunities" pill/badge must be visible near the top of the hero.

### 2.3 Stats / Counter Row
- FR-14: A horizontal stats row must appear below the hero displaying animated counters for key figures (e.g., projects built, technologies known, semesters completed). Exact numbers to be determined by content.

### 2.4 About Section
- FR-15: A brief "About Me" section summarising Syrus's background, interests, and goals.
- FR-16: Must include education timeline:
  - BS Software Engineering — Capital University of Science & Technology (2024–2028)
  - ICS — Punjab Group of Colleges (2021–2023)

### 2.5 Skills Section
- FR-17: Skills must be grouped by category:
  - **Languages:** C++, Python, JavaScript, TypeScript, C
  - **Frontend:** React.js, Next.js, Tailwind CSS, HTML5, CSS3
  - **Backend:** Node.js, Express.js, REST APIs
  - **AI / ML:** Gemini API, RAG pipelines, LLM integration
  - **Databases:** MongoDB, MySQL, PostgreSQL
  - **Game Dev / IoT:** Unity, C#, ESP32, Arduino, Sensors
- FR-18: Each skill category must animate into view on scroll (stagger entrance animation).
- FR-19: Individual skill tags must have a hover glow/highlight effect.
- FR-20: Skill tags or bars must visually reflect relative proficiency where appropriate.

### 2.6 Projects Gallery
- FR-21: Display all 4 projects as cards in a filterable grid:
  1. **TimeCapsule Application** — Stores and preserves data (messages, memories, files) for future access. Structured data handling and logical storage techniques. [GitHub]
  2. **Vortex Ranger** — Futuristic 3D action shooter built in Unity with custom player movement, physics-based collision, and animation states. [GitHub]
  3. **ESP32 EV Monitoring System** — IoT electric-vehicle monitor with real-time sensor data collection for smart-mobility use cases. [GitHub]
  4. **Machine Learning Capstone** — End-to-end ML solution using Python and Scikit-learn; trained and evaluated multiple models using performance metrics. [GitHub]
- FR-22: Each project card must show: project name, short description, tech tags, and a GitHub link button.
- FR-23: Cards must have a hover effect (lift/glow/border highlight).
- FR-24: A filter bar must allow filtering projects by category: All, Web, Game Dev, IoT, AI/ML.
- FR-25: Clicking a card must open a modal/drawer with the full project description.

### 2.7 Contact Section
- FR-26: A contact form must include: Name, Email, Subject, Message fields.
- FR-27: Client-side validation must run before submission (required fields, valid email format).
- FR-28: On submit, the form must send the message via a free email service (e.g., EmailJS) — no backend server required.
- FR-29: The form must display a success or error state after submission.
- FR-30: Contact details must also be shown statically: email `Syrus7083@gmail.com`, phone `+92-320-0535245`, location `Islamabad, Pakistan`.

### 2.8 Footer
- FR-31: Footer must display the `<Syrus/>` logo, nav links, social icons, and a copyright line.
- FR-32: A "Back to top" button must be present and functional.

---

## 3. Non-Functional Requirements

### 3.1 Performance
- NFR-01: First Contentful Paint (FCP) < 1.5 s on a 4G connection.
- NFR-02: Total page weight < 2 MB (images optimised, WebP preferred).
- NFR-03: Lighthouse Performance score ≥ 90.
- NFR-04: Particle/canvas animation must not drop below 50 fps on a mid-range laptop.

### 3.2 Accessibility
- NFR-05: Must meet WCAG 2.1 Level AA.
- NFR-06: All interactive elements must be keyboard-focusable with a visible focus ring.
- NFR-07: Modals must trap focus and be dismissible via Escape key.
- NFR-08: `prefers-reduced-motion` media query must disable or reduce all animations.
- NFR-09: All images must have descriptive `alt` text. Decorative elements must have `alt=""`.
- NFR-10: Colour contrast ratio must be ≥ 4.5:1 for normal text, ≥ 3:1 for large text.

### 3.3 Responsiveness
- NFR-11: Layout must be fully functional and visually correct on screens from 320 px to 2560 px wide.
- NFR-12: Touch targets must be ≥ 44 × 44 px on mobile.

### 3.4 Browser Support
- NFR-13: Must work in the latest two versions of Chrome, Firefox, Edge, and Safari.

### 3.5 Deployment
- NFR-14: Must deploy to **Vercel** using only static files (HTML, CSS, JS) — **zero cost**.
- NFR-15: No server-side runtime, no paid add-ons, no database required.
- NFR-16: Contact form must use a free tier service (EmailJS free plan) so no backend is needed.

### 3.6 Code Quality
- NFR-17: All files must be well-commented and logically organised.
- NFR-18: No external CSS frameworks (Tailwind, Bootstrap) to keep bundle size minimal.
- NFR-19: JavaScript must be modular (ES modules or clearly separated script files).

---

## 4. User Stories

| ID | As a… | I want to… | So that… |
|---|---|---|---|
| US-01 | Recruiter | See Syrus's name, role, and availability at a glance | I can quickly assess fit |
| US-02 | Recruiter | Download or view the resume | I can share it internally |
| US-03 | Client | Browse project descriptions and tech stacks | I can evaluate if Syrus can solve my problem |
| US-04 | Peer developer | Click through to GitHub projects | I can review actual code |
| US-05 | Mobile user | Navigate and read the site comfortably on my phone | I don't miss any content |
| US-06 | Visitor | See animated skill tags scroll into view | The page feels alive and engaging |
| US-07 | Visitor | Use the contact form to send a message | I can reach Syrus without opening my email client |
| US-08 | Keyboard user | Tab through all interactive elements in logical order | I can use the site without a mouse |
| US-09 | Screen reader user | Hear meaningful descriptions for all sections and images | I get full context of the content |
| US-10 | Visitor with reduced motion | See a calm, animation-free version of the page | I don't experience discomfort |

---

## 5. Out of Scope (v1)

| Item | Reason |
|---|---|
| CMS / admin panel | Static site; content edited via code |
| User authentication | No login functionality needed |
| Blog / articles section | Deferred to v2 |
| Dark/light mode toggle | Dark mode only for v1 |
| Multi-language support | English only |
| Analytics dashboard | Can add Vercel Analytics (free) post-launch |
| Backend API | EmailJS handles contact with no server |
| Paid hosting / CDN | Vercel free tier is sufficient |
| E-commerce / payments | Not applicable |
| Comment system | Not applicable |
