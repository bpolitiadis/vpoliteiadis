# **🧠 Brand Identity & UI/UX Guidelines – Vasileios Politeiadis**

---

## **1. Brand Essence**

### **Mission**

A dual-persona brand—**Full-Stack Developer + Automation Engineer** and **Visionary AI Artist**—bridging cutting-edge tech with surreal creativity.

### **Tone & Feel**

- **Matrix-inspired:** Futuristic, hacker energy, immersive digital space.
- **Professional but Artistic:** Clean tech design with subtle surreal, AI-driven artistic cues.
- **Dark & Bold:** High contrast with neon highlights for a cybernetic look.

---

## **2. Color System**

### **Primary Colors**

- **Dark Matrix Black:** `#0A0A0A` → Backgrounds
- **Neon Lime Green:** `#39FF14` → Interactive elements, highlights

### **Secondary Colors**

- **Digital Emerald:** `#00B86B` → Secondary buttons, accents
- **Cyber Gray:** `#222222` → Containers, dividers
- **Matrix White:** `#E8FFE8` → Light text

### **Gradients**

- **Core Glow Gradient:**

  ```
  background: linear-gradient(90deg, #0A0A0A 0%, #00B86B 50%, #39FF14 100%);
  ```

- **Hover Glow:** Soft outer neon blur (`rgba(57, 255, 20, 0.3)`) on buttons and icons.

---

## **3. Typography**

### **Font Pairing**

- **Headings:** [Orbitron](https://fonts.google.com/specimen/Orbitron) (Futuristic Sans-Serif)
- **Body Text:** [Inter](https://fonts.google.com/specimen/Inter) or Manrope for readability.

### **Hierarchy**

- **H1:** 42–48px, Bold, Neon Lime with text-shadow glow.
- **H2:** 32px, Bold, Digital Emerald.
- **H3:** 24px, Semi-Bold, Cyber Gray or Neon.
- **Body:** 16–18px, Regular, Matrix White.
- **Caption/Meta:** 12–14px, Lime or Gray.

---

## **4. Logo Usage**

- **Primary Logo:** Cybernetic "VP" monogram with neon glow.
- **Background:** Always on black or very dark gray.
- **Spacing:** Minimum 40px padding around logo.
- **Scaling:** Maintain 1:1 aspect ratio, never distort.

---

## **5. Layout & Components**

### **Page Widths**

- Max container width: **1280px**, content columns: **8–12**.
- Mobile: Fully responsive with stacked components.

### **Navbar**

- Sticky top, black background with neon hover effects.
- Logo left, menu right, hamburger for mobile.

### **Buttons**

- **Primary:** Neon Lime border, transparent fill → On hover → glowing filled button.
- **Secondary:** Digital Emerald border, subtle glow.

### **Cards & Sections**

- Dark cards (`#111`) with glowing neon borders or corner accents.
- Glassmorphism optional (dark transparency + green highlights).

---

## **6. Visual Elements**

- **Background:** Subtle animated code rain or particle grid effect.
- **Hero Section:**

  - Your stylized portrait or neon "VP" logo
  - Holographic headline text
  - Matrix-style flowing glyphs in the background.

- **Icons:** Line-based, neon-accented, minimalist.

---

## **7. Interactivity**

- **Hover Effects:** Neon glows, soft digital pulses.
- **Scroll Animations:** Smooth parallax or section fade-ins with green highlights.
- **CTA Buttons:** Pulsating glow or matrix ripple effect on hover.

---

## **8. Pages & Content Blocks**

### **Homepage / Hero**

- Headline: “Full-Stack Developer & AI Visionary”
- CTA: "Explore Projects" (glowing button)
- Background: Animated code rain or glitch effect.

### **About Page**

- Split layout: Personal photo / Brand story
- Visual timeline or digital “holographic” cards

### **Projects / Portfolio**

- Grid or card layout
- Hover: Project card glows + glitch animation
- Case study pages with animated hero images

### **Blog**

- Cyberpunk-themed post cards
- Typography optimized for readability

### **Contact**

- Dark glass form with neon outlines
- Embedded map styled in green cyber tones

---

## **9. Accessibility**

- Maintain **WCAG contrast ratios** (neon green on black passes).
- Use focus indicators with glowing outlines.
- Keep animations subtle (avoid rapid flickering).

---

## **10. Tech Stack Recommendations**

- **Framework:** Astro
- **Styling:** TailwindCSS with custom theme (green shades + dark mode)
- **Components:** shadcn/ui (customized neon styles)
- **Animations:** Framer Motion for smooth transitions.
- **Icons:** Lucide-react or custom vector icons in neon style.
