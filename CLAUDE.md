# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a multi-page static HTML portfolio for Juan Silva (mobile engineer). The site consists of a main index page showcasing a case log, with clickable rows linking to individual project detail pages hosted on GitHub Pages.

**Key facts:**
- Multi-page architecture: `index.html` (main) + `about.html` + `contact.html` + 9 case pages in `cases/` directory (8 professional + 1 personal shipped)
- Shared CSS extracted to `css/styles.css` for consistency
- Pure CSS Grid layout with responsive design
- Design system uses CSS variables for consistent theming
- Font stack: JetBrains Mono (primary), Instrument Serif (accents)
- Responsive breakpoint: 860px (mobile)
- `.nojekyll` file prevents GitHub Pages from running Jekyll processing

## File Structure

```
Website/
├── index.html              # Main page (hero, case log, covers, footer)
├── about.html              # About page (bio, career, skills, availability)
├── contact.html            # Contact page (direct contact, platforms, availability)
├── css/
│   └── styles.css          # Shared stylesheet (all pages)
├── cases/
│   ├── ding.html           # CASE 01 — First professional role (2015–2017)
│   ├── athlon.html         # CASE 02 — Fleet management (2017–2018)
│   ├── wipro.html          # CASE 03 — MVVM migration (2019–2020)
│   ├── virgin-money.html   # CASE 04 — Banking, Java→Kotlin (2020–2021)
│   ├── hsbc.html           # CASE 05 — Transaction enrichment (2021–2023)
│   ├── ustwo-ft.html       # CASE 06 — KMP analytics library (2023–2024)
│   ├── vanguard.html       # CASE 07 — Auth platform (2023–2025)
│   ├── sitka.html          # CASE 08 — Lead Android (2025 → current)
│   └── cityscape.html      # CASE 09 — Personal KMP game (2026)
├── .nojekyll               # Tells GitHub Pages to skip Jekyll
└── CLAUDE.md               # This file
```

## Design System

**CSS Variables** (defined in `css/styles.css` `:root`):
- `--bg`: Background (#0a0a0a)
- `--surface`: Primary surface (#0e0e0e)
- `--surface-2`: Secondary surface (#141414)
- `--rule`: Borders light (#222)
- `--rule-2`: Borders secondary (#2a2a2a)
- `--ink`: Primary text (#eee)
- `--ink-2`: Secondary text (#ccc)
- `--muted`: Tertiary text (#888)
- `--dim`: Quaternary text (#666)
- `--accent`: Gold highlight (#b88a2e)

**Fonts:**
- Headings/text: "JetBrains Mono" (300–700 weights)
- Italic accents: "Instrument Serif" (loaded from Google Fonts)

## Page Sections (All Pages Share These Components)

### Index.html Only
1. **Header (.chrome)** — Sticky nav with branding, nav links (Log, About, 08 · Sitka, Contact), ticker
2. **Hero (.hero)** — Main intro with h1, 4-column stats grid
3. **Case Log (.log)** — 8 grid-column case rows (num, title, role, stack, year, arrow) — each row is an `<a>` tag linking to case pages
4. **Cover Cards (.covers)** — 3-column preview cards, each wrapped in `<a>` tag linking to case page
5. **Footer** — Contact info, branding

### About & Contact Pages (about.html, contact.html)
Both pages use the same `.section.detail` layout as case pages:
1. **Header (.chrome)** — Identical nav (Log, About, 08 · Sitka, Contact)
2. **Detail Section (.detail)**
   - `.crumbs` — Breadcrumb (← HOME)
   - `.title-block` — Heading + lede
   - `.body-grid` — Two-column narrative/description
   - `.stats` — Key metrics (About) or availability (Contact)
   - `.features` — 6 capability areas (About only)
   - `.meta-grid` — Availability + Stack + Links (About) or Direct + Platforms + Availability (Contact)
3. **Footer** — Identical to index

### Case Detail Pages (cases/*.html)
Each case page contains:
1. **Header (.chrome)** — Identical to index, nav points back to index
2. **Detail Section (.detail)**
   - `.crumbs` — Breadcrumb with back link to index, case number/dates
   - `.title-block` — Case number, h2 title (with `.acc` and `.serif` spans), `.lede` paragraph
   - `.meta-strip` — 6-cell grid (CLIENT, ROLE, LOCATION, DATES, DURATION, STATUS)
   - `.body-grid` — 3-column layout (label, body col 1, body col 2) with brief text
   - `.shot` — 16:8 placeholder for screenshots
   - `.stats` — 4-cell stat grid (value, label)
   - `.features` — 6-item feature list (number, h4 title, description)
   - `.meta-grid` — 3-column panels (Project info, Stack tags, Links)
3. **Footer** — Identical to index

## Common Tasks

### Editing a Case Detail Page

1. Open `cases/[case-name].html`
2. Update the crumbs breadcrumb (case number, title, dates)
3. Update `.title-block` h2, lede text
4. Update `.meta-strip` 6 cells with correct metadata
5. Update `.body-grid` with brief and stack details
6. Update `.shot` corner text (fig number, capture year, etc.)
7. Update `.stats` with relevant numbers and labels
8. Update `.features` 6 items with feature titles and descriptions
9. Update `.meta-grid` 3 sections (Project details, stack tags, reference links)

### Adding a New Case to the Log

1. Create a new HTML file in `cases/[slug].html` (copy from skeleton template)
2. Update `index.html` log section: add new `<a class="log-row" href="cases/[slug].html">` with correct metadata
3. Update cover cards section: add new `<a href="cases/[slug].html"><div class="cover">...</div></a>`
4. Update case count if needed ("06 PROJECTS" → "07 PROJECTS")

### Making Log Rows / Cover Cards Clickable

**Log rows:** Already implemented as `<a class="log-row" href="...">` with CSS rule `a.log-row { display: grid; }` in styles.css.

**Cover cards:** Already implemented as `<a href="..."><div class="cover">...</div></a>` with CSS rule `a:has(.cover) { display: block; }` in styles.css.

## Styling & Color

- Use `var(--accent)` class on text to highlight in gold
- Use `<span class="serif">` for italic serif accents
- Dashed borders use `1px dashed var(--rule)` or `--rule-2`
- Grid gaps: 20px, 32px, or 40px

## Responsive Behavior

Mobile breakpoint at **860px**:
- Hero `.sub` → 2 columns
- Detail `.meta-strip` → 2 columns
- Detail `.body-grid` → 1 column
- Stats → 2 columns
- Features → 1 column
- Covers → 1 column
- Log rows → 3 columns (hiding role/stack labels)

## Important Implementation Details

### Relative Paths

From `index.html`:
```html
<a href="about.html">About</a>
<a href="contact.html">Contact</a>
<a href="cases/sitka.html">08 · Sitka</a>
<link rel="stylesheet" href="css/styles.css">
```

From `cases/*.html`, `about.html`, `contact.html`:
```html
<a href="../index.html#log">Log</a>
<a href="../about.html">About</a>
<a href="../cases/sitka.html">08 · Sitka</a>
<a href="../contact.html">Contact</a>
<link rel="stylesheet" href="../css/styles.css">
```

### Shared CSS Rules for Multi-Page Behavior

In `css/styles.css`:
- `a.log-row { display: grid; text-decoration: none; }` — Makes rows clickable while maintaining grid layout
- `a:has(.cover) { display: block; }` — Makes cover cards clickable (wrapping `<a>` tags)
- `.detail .crumbs .back { text-decoration: none; }` — Styles back links without underline

### GitHub Pages Configuration

- `.nojekyll` file at root prevents Jekyll processing (preserves `_` prefixes in URLs, if needed)
- All relative URLs use `../` from case pages, direct refs from index
- No absolute URLs or `/` leading slashes — ensures portability

## Kotlin Multiplatform (KMP) Thread

Juan's KMP journey spans personal exploration and professional delivery:

- **Oct 2022**: Personal KMP study begins. Explores cross-platform architecture (Android, iOS, Web shared codebase)
- **2022–23**: Personal KMP projects (incl. Mozzy — AI privacy-focused web navigator, unshipped)
- **Oct 2023 – Jan 2024**: First professional KMP at UsTwo × FT — built shared analytics library
- **2026**: Shipped Cityscape City Puzzles via Light Scout — iOS + Android game via KMP, App Store + Google Play live

KMP is highlighted in:
- `cases/ustwo-ft.html` — analytics library, first professional engagement
- `cases/cityscape.html` — Light Scout shipping, cross-platform IAP
- `about.html` — KMP in stack + narrative context + Light Scout founding

## Deployment to GitHub Pages

1. Commit all files to a Git repository
2. Push to GitHub
3. Enable GitHub Pages in repo settings (branch: main, folder: root)
4. Site will be available at `https://username.github.io/repo-name`

## Performance

- ~15KB CSS file (shared across all 12 pages)
- ~3-5KB per HTML file (semantic, minimal markup)
- Fonts: 2 Google Font families preconnected
- No images in main layout (`.shot` divs are placeholders)
- Mobile responsive, works on all modern browsers

## Future Enhancements

- Add real image assets in `.shot` divs on case pages (16:8 hero photos)
- Link out reference links in `.meta-grid .links` sections to real case materials / references (incl. App Store + Google Play links for Cityscape)
- Update nav "current" indicator based on active page (highlight which case page is currently open)
