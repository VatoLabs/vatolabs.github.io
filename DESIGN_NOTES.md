# Design notes: redesign-impeccable

Built with the Impeccable skill (pbakaus/impeccable, local install). Unattended subagent run: every question the skill asks the user was answered from the shared brief (/home/claude/hero-assets/BRIEF.md) and recorded here.

## History of this branch
- Run 1 (older brief, no film hero, no dark theme) rolled a direction and built a "parts catalog" page. Discarded: its CSS and HTML were replaced wholesale; only its PRODUCT.md answers survived.
- Run 2 (atoms/bits brief with an SO-101 render hero) re-ran init and the direction roll (seed:bc7348f688334e9f, engineering drawing sheet), wrote the surface brief, fetched Overpass, then stopped before building.
- Run 3 (this one, MRV chronophotograph hero): kept the run 2 roll because the brief's world-level asks (atoms/bits, dark theme, B/W plus one data accent) did not change, only the hero subject. Replaying the seed (`concept-seed --from <key>`) printed the same assignment (index 3). Updated PRODUCT.md (hero facts) and the surface brief (FIRST VIEWPORT, STORY, caption), then built.

## Init answers (PRODUCT.md)
- Users: SO-101 / LeRobot builders, lab leads and hiring managers, collaborators. Under a minute, often on phone.
- Purpose: show the calibration mechanism, prove the work is real, get a GitHub follow or an email.
- Constraints: static GitHub Pages, CNAME untouched, black and white brand, Styro only in the logo, headline verbatim, hero chart stays and says Simulated, no invented facts, no em dashes, dark theme with persisted toggle.

## New-work answers
- Mode: home is Persuade; portfolio leans Experience/Read.
- Who acts: a robotics visitor follows on GitHub (home) or emails (portfolio).
- What earns belief: the real robot in the still, the simulated lag drawing with its assumptions, process tables with a status per value, the fit evidence from real 12 V logs, bench photos, the dated log.
- Must stay untouched: all copy, numbers, photos, video, logo, headline, caption.
- Would feel wrong: startup glow hero, gradients, cards, invented stats, a fully dark film-look site.
- Light or dark scene: the bits default to the visitor's system setting (brief), the film is always dark.

## Direction roll
- Degraded both runs: the roll service (impeccable.style) is blocked by the network proxy (403), so no challengers and no quality-bar boards. No image generation available, so the build is code-led (no comps, no decision comps).
- Seven candidates, by resonance: 1 component datasheet, 2 calibration certificate, 3 engineering drawing sheet, 4 lab notebook, 5 two-column research paper, 6 parts catalog page, 7 dial indicator face. Roll assigned #3. Impeccable's own pick would have been #1 (datasheet); not presented because no one could answer.
- Decision page (serve-question) not served: no human to answer it in a subagent run; the assigned direction was taken, as the skill's "page closed unanswered" path prescribes.
- Contract: `.impeccable/surfaces/index-html.md`.

## Build decisions
- Hero: the shared film still with `<picture>` art direction (16:9 desktop, 4:5 phone). Headline in the empty top-left on desktop, over the dark lower half on phones. Film ground set to #020202 to match the photograph's own black.
- Cut: the sheet's zone ruler (2px top line) sits exactly where the still ends; in dark mode it is a pale line between film black and graphite.
- Lab charts: the PNGs carry blue/yellow/orange series, which the B/W brief forbids, so the "why fit your own" result was redrawn as monochrome bars from its printed values (8.3, 2.0, 0.8, 0.7 deg; 146, 35, 15, 13 mrad) and the "same score, different twin" result as a small table (23.7 vs 23.4 mrad training, 14.6 vs 23.1 mrad unseen, 1,844 and 13,562 trials). fit_progress.mp4 and rod_targets were not used. sysid-fit.jpg stays as a grayscale thumbnail in the parts list.
- Portfolio: a shorter film band (same still, right-aligned, faded in from the left) carries the name and intro; mrv-robot.jpg moved into the MRV entry.
- Fonts: Overpass and Overpass Mono variable, OFL, self-hosted in /fonts.

## Finish
- Detector (`impeccable detect`): remaining findings are design-system mismatches against the stale run 1 DESIGN.md (resolved by the new DESIGN.md) and "cramped padding" on bordered groups where flush content is intended (segmented control cells, bars starting on their axis, view sections whose first child sits under a hairline with 56px+ padding).
- Finish review ran inline from `reference/degraded/finish-reviewer.md` (no subagent tool in this harness). Disposition fix; fixes applied: film black seam on the portfolio band, bottom zone ruler above the title block, plot right margin, phone title block borders, phone portfolio headline overlap, dark-mode thumbnail brightness. Verdict pass: all resolved; disposition ship for the scored fixes.
- DESIGN.md and `.impeccable/design.json` written inline from `reference/degraded/documenter.md` (no subagent tool), replacing the run 1 parts-catalog system that never shipped.
- Provenance: `embed-prompt --scan img` reports 0 missing; every raster carries its origin (pre-existing, not generated).
