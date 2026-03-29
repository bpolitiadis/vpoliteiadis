# Next Phases & Future Ideas

**Purpose:** Backlog of features, tools, and experiments for future development.  
**Last Updated:** 2026-02-19

---

## 🧮 Tools (Mini Web Apps)

Ideas for lightweight, useful web tools that add value to the site and demonstrate practical skills.

### Planned / High Interest

- **Compound Interest Calculator** — Input principal, rate, time; visualize growth over time. Great for finance/personal projects audience.
- **Pomodoro Timer** — Focus session timer with optional notifications. Simple, universally useful.
- **Unit Converter** — Length, weight, temperature, etc. Clean, single-purpose utility.
- **Markdown Preview** — Live preview as you type. Fits developer/technical audience.
- **Password Strength Checker** — Show entropy, common patterns, suggestions. Security-themed.
- **RGB / Hex Color Picker** — Quick color tool with copy-to-clipboard. Fits design/creative audience.
- **Base64 Encode/Decode** — Simple encoding tool for devs.
- **JSON Formatter/Validator** — Pretty-print and validate JSON. Developer utility.
- **Regex Tester** — Enter regex + sample text, see matches. Useful for devs.
- **QR Code Generator** — URL or text → QR code image. Practical and shareable.

### Games (Mini Web Games)

Light, engaging games that fit a portfolio vibe — no heavy dependencies, runs in browser.

- **Typing Speed Test** — WPM counter, sample text, simple stats. Shows off real-time JS.
- **Snake** — Classic; good for keyboard input and canvas/svg.
- **2048** — Number-tile puzzle. Puzzle game that’s easy to understand.
- **Memory Match** — Card flip memory game. Good for DOM and state.
- **Hangman** — Word guessing. Simple logic, minimal UI.
- **Rock–Paper–Scissors** — With basic “AI” or animations. Fun micro-project.
- **Breakout / Brick Breaker** — Ball and paddle. Classic arcade feel.
- **Minesweeper** — Logic puzzle. Revisit a classic with modern UI.

### Other Ideas

- **Cost of Delay Calculator** — Product/agile style: cost of postponing decisions.
- **Readability Score** — Paste text, get readability metrics (Flesch–Kincaid, etc.).
- **Debt Payoff Calculator** — Snowball vs avalanche with amortization view.

---

## Notes

- Tools should be **self-contained**, **no auth required**, and **mobile-friendly**.
- Prefer static/SSR where possible; use client JS only when needed (Astro islands).
- Each tool can live under `/tools/` or `/tools/[slug]` with consistent layout and navigation back to the main site.
