# Product

<!-- impeccable:product-schema 1 -->

> Init answers were inferred (updated 27 Oct for the atoms/bits brief: MRV chronophotograph hero, dark theme) from the redesign brief (subagent run, no one to interview). Every fact below comes from the brief or the existing site copy.

## Platform

web

## Users
Inferred: robotics people who land here from GitHub, LinkedIn, a hackathon or a job application. Three readers: (1) SO-101 / LeRobot builders who want their cheap arm to be accurate, (2) lab leads, startup founders and hiring managers sizing up Vato as an engineer, (3) collaborators and funders checking whether the lab is real. They give the page under a minute, usually on a phone first.

## Product Purpose
Vato Labs (Vato Inasaridze) builds open-source calibration that makes each ~$200 SO-101 robot arm go where it is told: record 20 minutes of excitation, fit a servo model per joint, correct each command, measure accuracy at the tip. Success: a visitor understands the mechanism, believes the work is real and honest, and follows the GitHub or emails Vato.

## Positioning
Cheap arms fail because nobody models their servos. Vato Labs measures each arm's own servo limits and plans around them, and publishes every result with its trial count, failures and cost. Mission line: "Decoupling robot progress from atoms".

## Operating Context
Static GitHub Pages site (vatolabs.com, repo VatoLabs/vatolabs.github.io). Two pages: home (lab) and portfolio (Vato's engineering record). Read on desktop and phone.

## Capabilities and Constraints
- Plain static HTML/CSS/JS, no build step. Absolute paths (`/style.css`), served over http.
- CNAME is untouchable.
- The tip-accuracy test is pending: servos arrive 29 Oct. Results table says Pending.
- The hero servo chart is a simulation from datasheet limits and must say "Simulated".

## Brand Commitments
- Logo: the Styro-lettered "VATO LABS" SVG wordmark. Styro is for the logo only.
- Black and white brand. No orange, no violet, no cream-with-terracotta. One restrained accent only where it serves data.
- Headline, verbatim: "Decoupling robot progress from atoms".
- Voice: plain, first person, specific numbers, no hype. No em dashes.

## Evidence on Hand
- Real photos and video in /img: mrv-robot, mrv-gears, mrv-pcb, mrv-casting, mrv-jump (jpg + mp4), pendulum plot, room-change point cloud, sysid-fit chart.
- Hero: hero-2400/1600 (16:9) and hero-portrait-1200 (4:5), jpg + webp. A film-graded chronophotograph of the MRV jumping robot: real frames from one jump laid left to right on black, crouch bottom-left to apex top-right. Caption exactly "MRV jumping robot, built by hand. Frames from one jump." Swappable for a real SO-101 photo in the same grade later.
- Lab charts (dark-ground PNGs from real 12 V STS3215 logs, BAM public dataset): why_fit_your_own (ready-made 7.4 V params miss by 8.3 deg on unseen moves; fitting your own: 0.8 deg), same_score_different_twin (two fits with equal training score predict differently), fit_progress.mp4 (the fitter tuning a servo twin until sim matches the real recording). rod_targets is a planned bench, not built.
- Log entries (15 Oct to 27 Oct 2026), the excitation plan table, the servo model fit table, the pending ISO 9283 tip-accuracy table.
- Portfolio facts: MRV numbers, room change AP figures, pendulum 7.45 deg result, ACT 41%, awards, education, Siemens internship.
- Absent and never to be invented: customers, testimonials, users, measured calibration results on real servos, extra stats.

## Product Principles
1. Show the mechanism, not adjectives.
2. Every number carries its source or its status (simulated, pending, fitted).
3. Failures are content.
4. One person, real hardware: the photos are proof.

## Accessibility & Inclusion
Body text very readable (size, contrast, measure) in light and dark themes. Respect reduced motion. Keyboard reachable controls. Theme follows prefers-color-scheme with a persisted manual override.
