# Design notes: redesign-impeccable

Built with the Impeccable skill (pbakaus/impeccable v4.8.0). Unattended run: every question the skill asks the user was answered from the brief below.

## Init (PRODUCT.md)
- Users: SO-101 / LeRobot builders, lab leads and hiring managers, collaborators. Under a minute, often on phone.
- Purpose: show the calibration mechanism, prove the work is real, get a GitHub follow or an email.
- Constraints: static GitHub Pages, CNAME untouched, black and white brand, Styro only in the logo, headline verbatim, hero chart stays and says Simulated, no invented facts, no em dashes.
- Stack: existing static HTML/CSS/JS kept.

## New-work answers
- Mode: home is Persuade, portfolio leans Experience/Read.
- Who acts and what they do: a robotics visitor follows on GitHub (home) or emails (portfolio).
- What earns belief: the simulated servo drawing with its stated assumptions, the process tables with status per value, real hardware photos, the dated log.
- What must stay untouched: all copy, numbers, photos, video, logo, headline.
- What would feel wrong: a startup hero, glowing tech palette, invented stats, cards.

## Direction roll
- Concept seed ran degraded (impeccable.style roll service blocked by the network proxy): no challengers, no quality-bar boards.
- My seven candidates, by resonance: 1 component datasheet, 2 calibration certificate, 3 engineering drawing sheet, 4 lab notebook, 5 two-column research paper, 6 parts catalog page (McMaster-Carr grammar), 7 dial indicator face.
- Roll assigned #6: the parts catalog. Built as assigned (Impeccable's pick would have been #1, the datasheet).
- No image generation, so code-led. Decision page skipped (no one to answer); assigned direction taken.
- Direction contract: `.impeccable/surfaces/index-html.md`.

## Finish
- Detector (`impeccable detect`): one finding (cramped padding on the option group), fixed; final run clean.
- Finish review ran inline (no subagent tool), disposition fix, one fix applied (numeric table headers right-aligned).
- DESIGN.md written from the built CSS.
- Font: Archivo variable, OFL, self-hosted from @fontsource-variable/archivo 5.3.0.
