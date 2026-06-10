# Ethan Soh — Portfolio

Personal portfolio website in Apple's product-page design language: pure black canvas, San Francisco type, flat rounded panels, one blue accent, alternating black/white bands. No gradients, no gimmicks.

**Live:** https://quantamshade0337.github.io

## Features

- **Apple design system** — `#f5f5f7`/`#86868b` grays, `#1d1d1f` panels, `#0071e3` blue, system San Francisco fonts (zero font downloads)
- **Restrained motion** — fade-up scroll reveals on Apple's easing curve, count-up stats, a typing macOS terminal, copy-email toast, Konami code easter egg
- **Live open-source section** — every original public repo pulled from the GitHub API at load, with an embedded snapshot fallback and language filters
- **All 10 certifications** — Apple, Google, Microsoft, and IMDA, with credential IDs
- **Accessible & responsive** — `prefers-reduced-motion` respected, semantic markup, mobile-first breakpoints

## Stack

HTML + CSS + vanilla JavaScript. No build step, no dependencies, no web fonts.

## Files

```
index.html      # markup
style.css       # design system + components
main.js         # interactions, repo/cert rendering
DESIGN.md       # Apple design spec the site follows
index.old.html  # previous version (kept as reference)
```

## Develop

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Test helper: `?snap` disables entrance animations (for screenshots).

## Contact

- GitHub: [@quantamShade0337](https://github.com/quantamShade0337)
- LinkedIn: [Ethan Soh](https://www.linkedin.com/in/ethan-soh-9548863a9/)

---

© 2026 Ethan Soh. Built with focus and spite.
