---
name: Vato Labs
description: Open-source calibration for $200 robot arms, presented as a black and white parts catalog.
colors:
  paper: "#fdfdfc"
  ink: "#141414"
  ink-secondary: "#45464a"
  rule: "#d4d4d0"
  panel: "#f2f2ef"
  markup-red: "#c3161c"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 4vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 82"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 88"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
  display-portfolio:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
  figure-value:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
  list-title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
  ui:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
  compact:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
  chart-axis:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 3vw, 48px)"
  section: "clamp(64px, 8vw, 112px)"
  rail: "236px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  option-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
  option-button-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Vato Labs

## Overview

**Creative North Star: "The Parts Catalog"**

The lab reads like a page from the engineering parts catalog every mechanical engineer knows by heart: an index rail on the left, a presentation drawing, spec tables with option buttons, listing tables with thumbnails, photos as numbered figure plates. Dense where the data is dense, quiet where the letter speaks. Black ink on white stock; the only colour is the red markup on measured or simulated data.

**Key Characteristics:**
- Index rail navigation, sticky on desktop, a top bar with a scrolling index on phones.
- Every number sits in a table row with its label, status or source.
- Square corners, 1px rules, 3px black heading bars.
- One authored motion: the servo trace draws when the move time changes.

## Colors

Black and white with one data colour.

### Primary
- **Catalog Ink** (#141414): text, heading bars, buttons, selected options, table head rules.

### Tertiary
- **Markup Red** (#c3161c): only the servo trace, its lag band (12% wash) and the live peak-lag value. Never on chrome, links or buttons.

### Neutral
- **Catalog Stock** (#fdfdfc): page ground.
- **Secondary Ink** (#45464a): captions, table secondary columns, nav at rest (8.9:1 on stock).
- **Hairline** (#d4d4d0): row rules, rail divider, link underline at rest.
- **Table Head** (#f2f2ef): table header band and row hover.

### Named Rules
**The Data Colour Rule.** Red appears only on data. If it is not a trace or a measured value, it is black.

## Typography

**Body and display:** Archivo variable (self-hosted, `/fonts/archivo-var.woff2`), width axis 82 to 100.
**Logo only:** Styro lettering, as the inline SVG wordmark. Never set text in it.

**Character:** an industrial grotesque. Condensed and heavy for headings, normal width for reading.

### Hierarchy
- **Display** (800, wdth 82, up to 5.25rem): the one h1 per page.
- **Headline** (700, wdth 88, up to 2.25rem): section heads under a 3px bar.
- **Title** (700, 1.375rem): step and entry subheads.
- **Body** (400, 17 to 19px, 1.55): prose capped at 62 to 64ch.
- **Label** (600, 0.875rem): table heads, captions, figure numbers.

Tabular figures on every table and chart label.

## Layout

Two-column shell: 236px index rail plus fluid main column with a clamp gutter. Hero is headline, offer, then a presentation block split 1.6 : 1 (drawing | spec). Below 1100px the presentation stacks and the spec splits in two; below 760px the rail becomes a top bar and tables reflow into stacked rows. Sections start 64 to 112px apart under a heading bar.

## Elevation & Depth

Flat. No shadows. Depth is rules and the table-head band.

## Shapes

Square corners everywhere. Borders are 1px hairline or 1px ink; heading bars 3px ink. Status tags are boxed: solid ink for confirmed, outline for priors, dashed outline for pending or to-fit.

## Components

### Buttons
- **Primary:** solid ink, paper text, 44px high, square. Hover inverts to outline.

### Option buttons (move-time filter)
- Joined row of bordered cells; selected cell is solid ink. aria-pressed carries state.

### Tables
- Head band in Table Head with ink rules above and below; rows separated by hairlines; numeric columns right-aligned; row hover in Table Head.

### Listing
- Thumbnail table, whole row clickable, name underlines on hover. Phone: thumb left, name and area right.

### Navigation
- Index rail, secondary ink at rest, ink and 2px underline for hover and the section in view.

### Drawing (chart)
- Inline SVG in viewBox units, never stretched. Command dashed ink, servo solid red, lag as red wash. Always carries the "Simulated" tag while the data is simulated.

## Do's and Don'ts

### Do:
- **Do** put every new number in a table row with its source or status.
- **Do** caption photos as "Fig. n".
- **Do** keep headings as heading bars, never pills or cards.

### Don't:
- **Don't** use red outside data.
- **Don't** add rounded cards, shadows or gradients.
- **Don't** put a label above a heading.
- **Don't** set any text in the Styro logo face.
