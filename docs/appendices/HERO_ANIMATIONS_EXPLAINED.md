# HeroSection Animations - Complete Explanation

> **Note:** As of January 2026, hero animations have been extracted to `/src/lib/animations/heroAnimations.ts` for better testability and reusability. This document explains the animation concepts and configuration.

## 🎬 What is GSAP?

**GSAP (GreenSock Animation Platform)** is a powerful JavaScript animation library that lets you animate HTML elements smoothly. Think of it as a more powerful version of CSS animations, but with JavaScript control.

### Key GSAP Concepts:

1. **Timeline**: A container that holds multiple animations. Like a playlist - animations play in sequence or parallel.
2. **Tween**: A single animation (e.g., "move this element from A to B").
3. **Easing**: How the animation accelerates/decelerates (e.g., smooth start/end vs instant).
4. **Selector**: How GSAP finds elements to animate.

## 📁 File Structure

```
src/lib/animations/
├── index.ts              # Centralized exports
└── heroAnimations.ts     # GSAP floating animations
```

**Usage in HeroSection.astro:**
```javascript
import { autoInitHeroAnimations } from '../../lib/animations';
autoInitHeroAnimations();
```

---

## 📖 Current Animations Breakdown

### 1. **Text Slide-Up Animation** (Lines 27-29)

```javascript
const tl = gsap.timeline({ defaults: { stagger: 0.2, duration: 0.3 } });
tl.fromTo(q(".text-animation"), { y: 100 }, { y: 0, delay: 1 });
```

**What it does:**
- Finds all elements with class `.text-animation` (currently: h1 title and subtitle div)
- Starts them 100px below their final position (`y: 100`)
- Animates them to their normal position (`y: 0`)
- Waits 1 second before starting (`delay: 1`)
- Staggers each element by 0.2 seconds (title first, then subtitle)

**Why `overflow-hidden` wrapper?**
The parent `<div className="overflow-hidden">` hides the text while it's sliding up from below, creating a clean reveal effect.

**Current Issue:** The paragraph text (line 145) doesn't have `.text-animation` class, so it doesn't animate!

---

### 2. **Image Floating Animation** (Lines 31-55)

```javascript
const imgTl = gsap.timeline({ repeat: -1 });
imgTl.to(q(".image-animation"), 3, { y: "-=30", x: "+=20", rotation: "-=2", ease: "power1.easeInOut" })
```

**What it does:**
- Creates an infinite loop (`repeat: -1` means "repeat forever")
- Moves the character illustration in a floating pattern:
  - **Step 1** (3 seconds): Move up 30px, right 20px, rotate left 2°
  - **Step 2** (2 seconds): Move down 30px, left 20px, rotate left 2° more
  - **Step 3** (3 seconds): Move up 20px, rotate right 2°
  - **Step 4** (3 seconds): Move down 20px, rotate right 2° more
- Uses `power1.easeInOut` for smooth acceleration/deceleration

**The `-=` and `+=` syntax:**
- `y: "-=30"` means "subtract 30 from current Y position" (relative movement)
- `x: "+=20"` means "add 20 to current X position" (relative movement)
- This creates a continuous floating effect

---

### 3. **Laptop Floating Animation** (Lines 57-81)

```javascript
const laptopTl = gsap.timeline({ repeat: -1 });
laptopTl.to(q(".laptop"), 3, { y: "-=10", x: "+=10", rotation: "-=1", ease: "Power1.easeInOut" })
```

**What it does:**
- Similar to image animation, but smaller movements (more subtle)
- Moves the laptop in a gentle floating pattern
- **BUG FOUND:** Line 64 uses `"Power1.easeInOut"` (capital P) while others use `"power1.easeInOut"` (lowercase) - this is inconsistent!

---

## 🐛 Issues Found (Historical - All Fixed)

### 1. ✅ **Memory Leak - No Cleanup** (FIXED)
When the component unmounts (user navigates away), the animations keep running. This wastes memory and CPU.

**Solution:** The extracted `heroAnimations.ts` module now returns a cleanup function and handles `beforeunload` event.

### 2. ✅ **Inconsistent Ease Naming** (FIXED)
Line 64: `"Power1.easeInOut"` (capital P)  
Lines 38, 44, 49, 54, 70, 75, 80: `"power1.easeInOut"` (lowercase)

**Solution:** Consistent `power1.easeInOut` used throughout `HERO_ANIMATION_CONFIG`.

### 3. ✅ **Missing Paragraph Animation** (FIXED)
The paragraph text didn't have `.text-animation` class.

**Solution:** Paragraph now has the class applied.

### 4. ✅ **Hardcoded Values** (FIXED)
Animation durations (3, 2, 3, 3) are hardcoded throughout. Hard to maintain.

**Solution:** All values extracted to `HERO_ANIMATION_CONFIG` object in `heroAnimations.ts`.

### 5. ✅ **Unused ScrollTrigger** (FIXED)
ScrollTrigger was registered but never used.

**Solution:** Removed entirely.

---

## ✅ Current Implementation (January 2026)

The extracted `heroAnimations.ts` module includes:
- ✅ Clean up animations on unmount (via returned cleanup function)
- ✅ Consistent ease naming (`power1.easeInOut`)
- ✅ Exported configuration object (`HERO_ANIMATION_CONFIG`)
- ✅ Centralized state management with TypeScript types
- ✅ Debug helpers (`getAnimationState()`, `killHeroAnimations()`)
- ✅ `prefers-reduced-motion` accessibility support
- ✅ Responsive: different animations for mobile vs desktop

---

## 🎯 Animation Flow Summary

1. **Page loads** → Component mounts
2. **1 second delay** → Text animations start sliding up (title → subtitle)
3. **Immediately** → Image and laptop start floating (infinite loop)
4. **User navigates away** → All animations should stop (currently doesn't!)

---

## 📚 GSAP Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [Timeline Guide](https://greensock.com/docs/v3/GSAP/Timeline)
- [Easing Functions](https://greensock.com/docs/v3/Eases)

## 🔗 Related Files

- **Animation Module:** `/src/lib/animations/heroAnimations.ts`
- **Component:** `/src/components/hero/HeroSection.astro`
- **Improvements Guide:** `./HERO_ANIMATIONS_IMPROVEMENTS.md`
