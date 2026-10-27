---
name: Vato Labs
description: Open-source servo calibration for $200 robot arms, shown as one film still above an engineering drawing sheet.
colors:
  film: "#020202"
  film-ink: "#f2f2f0"
  film-ink-secondary: "#b4b4b0"
  sheet: "#fcfcfb"
  ink: "#111214"
  ink-secondary: "#4a4d52"
  hairline: "#cbced2"
  band: "#eff0f1"
  redline: "#c2112e"
  sheet-dark: "#131518"
  ink-dark: "#e8eaed"
  ink-secondary-dark: "#a3a8af"
  hairline-dark: "#30343a"
  band-dark: "#1b1e22"
  redline-dark: "#ff5c66"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 1.1rem + 4vw, 5rem)"
    fontWeight: 750
    lineHeight: 0.97
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.15rem + 1.3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.04em"
  figure:
    fontFamily: "Overpass Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.9375rem"
    fontWeight: 500
    fontFeature: "'tnum'"
  field-label:
    fontFamily: "Overpass Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  balloon: "50%"
spacing:
  edge: "clamp(6px, 1.1vw, 16px)"
  gutter: "clamp(16px, 3.2vw, 48px)"
  section: "clamp(56px, 7vw, 104px)"
  ruler: "30px"
components:
  button-film:
    backgroundColor: "{colors.film-ink}"
    textColor: "{colors.film}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-film-outline:
    textColor: "{colors.film-ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  segment:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
  segment-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
  status-confirmed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    padding: "3px 7px"
  item-balloon:
    textColor: "{colors.ink}"
    rounded: "{rounded.balloon}"
    size: "30px"
---

# Design System: Vato Labs

## Overview

**Creative North Star: "The Drawing Sheet Under the Film Still"**

Every page has two materials and a hard cut between them. On top, atoms: one low-key, grainy black-and-white film still of real hardware, full bleed, with the headline set in its empty dark space. Below, bits: a mechanical engineering drawing sheet, framed by a 2px border with a zone-numbered ruler at the top and bottom and an ISO-style title block as the footer. The sheet is where everything is drawn, dimensioned, tabulated and revision-dated.

Light theme is a drawing print: near-white stock, black linework in two weights. Dark theme is CAD model space: graphite ground, pale linework, same geometry. In both, the film still keeps its own deeper black and grain, so the cut stays visible. The only colour is redline red, and it only marks data: the servo trace, its lag band and the lag dimension.

**Key Characteristics:**
- A full-bleed film still above, a framed sheet below, a zone ruler as the seam.
- Two line weights: 1px for rules and hairlines, 2px for the frame, view-title underlines and step heads.
- Every number sits in a table, a spec list, a dimension or a figure cell, set in Overpass Mono with tabular figures.
- Square corners everywhere except the item balloons.
- One authored motion: the servo trace redraws and the lag re-dimensions when the move time changes.

## Colors

Black and white with one data colour; the theme swaps the sheet, never the film.

### Primary
- **Redline** (#c2112e light, #ff5c66 dark): the simulated servo trace, the lag wash (9% / 15%), the dimension line, arrowheads and value, and the live peak-lag readout. Nothing else.

### Neutral
- **Film Black** (#020202): the still's ground, matched to the photograph's own black so its edges disappear.
- **Film Ink** (#f2f2f0) and **Film Ink Secondary** (#b4b4b0): headline, offer, nav and caption over the still, in both themes.
- **Print Stock** (#fcfcfb) / **Model Space** (#131518): the sheet ground.
- **Linework** (#111214 / #e8eaed): text, frame, ruler, table head rules, solid status tags, selected segment.
- **Secondary Linework** (#4a4d52 / #a3a8af): notes, captions, field labels, dates, axis labels.
- **Hairline** (#cbced2 / #30343a): row rules, view separators, link underline at rest.
- **Table Band** (#eff0f1 / #1b1e22): table head band and row hover.

### Named Rules
**The Redline Rule.** Red marks data, never chrome. If it is not a trace, a lag or a dimension, it is linework.

**The Two Blacks Rule.** The film black and the sheet ground are never the same value; in dark mode a 2px pale ruler line marks where film ends.

## Typography

**Display and Body Font:** Overpass (variable, self-hosted, with Helvetica Neue, Arial)
**Figure Font:** Overpass Mono (variable, self-hosted, with ui-monospace)
**Logo only:** the Styro "VATO LABS" wordmark as inline SVG. Never set text in it.

**Character:** Overpass descends from Highway Gothic, the lettering of road signs and engineering drawings; heavy and tight for headlines, open for reading. The mono is for measured values only.

### Hierarchy
- **Display** (750, clamp 2.75 to 5rem, 0.97): the one headline per page, over the film still.
- **Headline** (700, clamp 1.5 to 2.25rem, 1.12): view titles, always underlined at 2px like a drawing view title.
- **Title** (700, 1.3125rem, 1.2): process step heads and sub-views.
- **Body** (400, 17 to 19px, 1.55): prose capped at 52 to 62ch; the letter runs larger (18 to 21px).
- **Label** (600, 0.8125rem, 0.04em, uppercase): table head cells only.
- **Field label** (Mono 500, 0.75rem, 0.06em, uppercase): title block field names and the ruler numerals.
- **Figure** (Mono, tabular): every numeric cell, dimension, spec value, date and figure number.

### Named Rules
**The Measured Mono Rule.** Mono only for things that were measured, counted or dated. Prose and headings never go mono.

## Layout

Hero: 100svh minus the ruler height, so the first ruler shows at the bottom of the first viewport. Headline top-left in the still's empty field, offer and primary action bottom-right, caption bottom-left. Below 700px the portrait crop runs at full width, the headline overlaps its dark lower half, and offer, action and caption follow on the same black.

Sheet: inset from the viewport by a 6 to 16px edge, 2px frame left and right, ruler (8 zones, 4 on phones) at top and bottom, title block last. Views are separated by hairlines and padded 56 to 104px with a 16 to 48px gutter. Desktop views split notes from drawing roughly 1 : 2; process steps sit on a two-column grid. Breakpoints: 1100px (lag view and evidence stack), 860px (all two-column views stack), 700px (phone: tables reflow into stacked rows, title block goes two-up).

## Elevation & Depth

Flat. No shadows anywhere. Depth comes from the two materials (photograph above, linework below), the table band and the 1px / 2px line weights.

## Shapes

Square corners on every frame, button, tag, table and figure. The only curve is the item balloon (a 30px circle with a mono numeral), borrowed from parts-list callouts. Status is carried by border style: solid fill for confirmed, outline for priors and defaults, dashed outline for pending or to-fit, dashed for the Simulated tag.

## Components

### Buttons
- **Shape:** square (0px), 44px high, 18px side padding, 1px border.
- **Film primary:** Film Ink fill, Film Black text; hover drops to outline.
- **Film outline:** Film Ink border and text; hover fills.
- Buttons only live on the film; on the sheet, actions are underlined links.

### Segmented control (move time)
- Joined 44px cells in a 1px Linework box, mono labels. Selected cell is solid Linework with sheet-coloured text; `aria-pressed` carries the state.

### Tables
- Head band in Table Band between two Linework rules; hairline row rules; numeric columns right-aligned in mono. On phones the parts list becomes balloon / name and area / thumbnail rows, and the log and CV tables become date-over-entry stacks.

### Parts list
- Item balloon, project link (the whole row is the hit area), area, year, a grayscale thumbnail that regains colour on hover.

### Navigation
- Over the film only: wordmark left, text links in Film Ink Secondary, theme toggle (44px square, half-filled circle icon, `aria-pressed`) and a GitHub or Email outline button. Phones keep wordmark, toggle and button.

### Lag drawing (signature)
- Inline SVG redrawn at the box's pixel size. Command dashed Linework, servo solid Redline, lag as Redline wash. At the peak, dotted extension lines run from both curves to a dimension line with arrowheads and the value in Redline mono, haloed in the sheet colour. Arrowheads flip outside when the gap is under 22px. Always carries the dashed Simulated tag while the data is simulated.

### Title block
- The footer: a grid of Linework-ruled cells, each a mono field label over a value (lab wordmark, drawn by, place, year, sheet n of 2, elsewhere links).

## Do's and Don'ts

### Do:
- **Do** put every new number in a table row, a spec list or a dimension, with its source or status beside it.
- **Do** underline every view title at 2px.
- **Do** number figures ("Fig. n") with a CSS counter in mono.
- **Do** keep the film still a real photograph of real hardware, graded low-key black and white, with text only in its empty space.

### Don't:
- **Don't** use red outside data (The Redline Rule).
- **Don't** add rounded cards, shadows or gradients to the sheet.
- **Don't** put a label above a heading.
- **Don't** set any text in the Styro logo face.
- **Don't** let the sheet ground match the film black in dark mode.
