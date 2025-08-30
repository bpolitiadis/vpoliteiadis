# Changelog

All notable changes to this docs set will be documented here.

## 2025-01-XX — Hero Component v2
- **Hero.astro**: Refactored to use HeroAnimationController for better animation management
- **HeroAnimationController.tsx**: New React component managing headline, subtitle, and TextType sequence
- **Animation Flow**: TextType starts immediately after headline completion (no delay/fade-in)
- **Quotes**: Added 21 rotating quotes with typing/deleting animation
- **Styling**: Reduced text size, changed to Orbitron font for theme consistency
- **Timing**: Typing speed 45ms, deleting speed 25ms, pause 1500ms between quotes
- **CTA Integration**: Buttons animate independently after first quote completes

## 2025-08-11 — Docs v1
- Initial docs suite (10 files): INDEX, GETTING-STARTED, ARCHITECTURE, ADRs, CODE STYLE, UI/BRAND, COMPONENTS REF, PAGES/ROUTES, CONTENT MODEL, CHANGELOG.
- Embedded SEO, accessibility, security, and deployment guidance in relevant docs to respect file limit.

### Unverified Assumptions
- shadcn/ui, Framer Motion, and Lucide are referenced in scope, but the repository currently does not include framer-motion or lucide packages, and does not use shadcn/ui components yet. Guidance is provided as optional future patterns.
- No Playwright/tests or CI workflows are present; testing/CI mentions are lightweight and advisory.
