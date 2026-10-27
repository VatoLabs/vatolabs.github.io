# Hallmark redesign: design notes

Branch `redesign-hallmark`. Built with the Hallmark skill (v2.0.0), verb `redesign` at full depth, on the content of `redesign-taste`.

## Step 1 answers (taken from BRIEF.md, no live ask)
- Material: the film-graded MRV chronophotograph (hero), MRV photos and jump video, project charts, the lab's fit numbers (BAM 12 V logs), the live servo sim. No library photos used.
- Audience: robotics people, possible collaborators and employers who doubt $200 arms.
- Use: follow the work on GitHub (home); email (portfolio).
- Tone: technical, austere. "Atoms vs bits": grainy analog film on top, exact instrument below.
- Genre: both atmospheric (dark, film) and modern-minimal (open source, developer tool) fired; picked modern-minimal because everything below the hero is data.

## Picks
- **Redesign** · full · 2 pages (/, /portfolio)
- **Before** · 47 FAIL · 40 REFLEX · a frost/slate template around a good live servo chart; horizontal scroll on phones, no focus styles, colour literals
- **Keeps** · all 18 links · the live servo sim with its Simulated label, note and numbers · every table fact, log entry, project, figure, photo and the video · the wordmark SVG
- **Files** · edit: index.html, portfolio.html, style.css, site.js · create: tokens.css, base.css, fonts/, DESIGN_NOTES.md, img/hero-*, img/gears-film-1600.* · delete: none
- **Theme** · Console, dealt 1/3 (seed open-source-calibration-lab-cheap-4dbf·74fa19db·2026-10-27·r0). Darkroom and Terminal also dealt. Darkroom was the obvious "film" match (and what the cancelled run picked) but it is a dark-only amber page; Console is an instrument theme with a light "paper" colourway and a "graphite" dark one, which is exactly light bits plus a dark theme. Adapted for black and white only: amber removed everywhere (primary is ink); Console's cool "instrument" hue kept as the one accent and used only for the measured or simulated series (servo trace, fitted-error bars, its soft band). Duotone photo treatment swapped for plain grey so prints hold in both modes.
- **Shape** · / Conversational FAQ (draw a04cc9: every section heads with a question a sceptic asks, answered with the page's own numbers) · /portfolio Bento Grid (draw 3a9506, a second draw for the hire job)
- **Chrome** · nav: floating pill, a dark film object in both modes, with the theme toggle · footer: statement (/, the letter's "If it breaks, you'll see it break" set large), mast (/portfolio, the wordmark large)
- **Hero** · / Poster (swapped from the drawn Settled: the brief's full-bleed film still refuses a split) · /portfolio Ledge (as drawn), over a film-graded crop of the MRV gears photo, made with the same grade
- **Signature** · one real jump on grainy film, cut by a hard hairline into a live servo trace
- **Sections (/)** · Hero · Why does a $200 arm miss? (live trace + peak-lag reading) · How does calibration fix it? (four stages as an ordered list, each with its own table or plot) · Why not borrow the numbers? (the one band: 8.3° struck over 0.8°, bars of 146/35/15/13 mrad, the same-score-different-twin table) · What else has been built? (index with held preview) · What jumped in the film? (video, gears, board) · Who is building this? (letter) · What has happened so far? (log as a trail) · Footer
- **Material** · real: all of the above · pictures: the user's own only · absent: no testimonials, no logos, no invented figures
- **Sweep** · Floor 0 FAIL · Reflex 0 open (2 waived: 80 the wordmark mast, 49b one link at 320px) · 8 WARN dismissed on record · kept 18/18 links, 28/28 figures, 4 headings reworded and 1 field dropped on record · hero review and finish review run in-thread (no subagent tool in this harness)

## Atoms vs bits
- Atoms: film black `oklch(9%)` hero, the still's own grain, no added texture. Its tokens are mode-independent.
- Bits: light `oklch(98.6%)` paper or dark graphite `oklch(17%)`, 1px hairlines, Host Grotesk for reading, Atkinson Hyperlegible Mono for every measured value. In dark mode the cut stays visible because film black (9%) sits below graphite (17%) with a hairline between.
- Theme: `data-theme` on `<html>`, set before first paint from localStorage (try/catch), else `prefers-color-scheme`.

## Reworded or dropped (all recorded in the CSS stamp)
- Hero sentence shortened to "Open-source calibration that makes each $200 robot arm go where it is told." (full line kept in the meta description).
- "Chirp 0.1 (en dash) 5 Hz" to "Chirp 0.1 to 5 Hz" (no dashes).
- Section heads became questions; the letter's last paragraph moved to the footer statement.
- Stage slider and pinned story dropped; their four stage texts all stay, visible at once.
- "Command delay" got the text "Not yet fitted" in its empty value cell.
- New on the page, from the brief's lab charts (numbers only, redrawn in tokens): the 146/35/15/13 mrad comparison and the run A/B table.

## Known weaknesses
- Portfolio and home both run over the ~80-words-a-screen budget in the letter and the bento (owner's words; reported as notes).
- Host Grotesk only ships 400/500 here, so the dark-mode body is not lightened to 350.
- The hero sentence is 14 words (Hallmark asks for 12).
