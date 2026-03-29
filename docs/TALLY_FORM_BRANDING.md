# Tally form branding – what’s set vs what the MCP can’t do

## What is set via the Tally MCP (all supported options)

| Brand element | MCP setting | Value used |
|---------------|-------------|------------|
| Form title | `create_new_form.title` | "Website Onboarding Questionnaire" |
| Logo | `create_new_form.logoUrl` / `form_title_settings.logo` | `https://vpoliteiadis.com/images/vp-logo-800w.webp` |
| Cover image | `form_title_settings.cover` | Placeholder image with brand colors (#0A0A0A, #39FF14). Replace with your own gradient image URL when you have one (e.g. `https://vpoliteiadis.com/images/form-cover.webp`). |
| First-page button | `form_title_settings.button.label` | "Continue" |
| Submit button (final page) | `create_new_form.submitButtonText` | "Submit" |

So: every branding option that the Tally MCP exposes is set.

---

## What the MCP does **not** support (Tally API vs MCP)

The **official Tally API** supports full theme styling in `settings.styles` when creating/updating forms:

- `theme: "CUSTOM"`
- `color`: `background`, `text`, `accent`, `buttonBackground`, `buttonText`
- `css`: custom CSS string
- `direction`: "ltr" / "rtl"

The **Tally MCP** we use does not expose `settings.styles` (no theme, no colors, no custom CSS). So the following cannot be set via the MCP:

| Brand guideline | MCP | How to apply |
|-----------------|-----|--------------|
| Background `#0A0A0A` (Matrix Black) | ❌ | Tally editor → **Customize** (or Design) → set background color |
| Text `#E8FFE8` (Matrix White) | ❌ | Same → set text color |
| Primary/accent `#39FF14` (Neon Lime) | ❌ | Same → set accent/primary color |
| Secondary `#00B86B` (Digital Emerald) | ❌ | Same or custom CSS |
| Button background/text | ❌ | Same or custom CSS |
| Fonts (Orbitron, Inter) | ❌ | Tally **Customize** if available, or **Code injection** (Tally Pro) with custom CSS |
| Custom CSS (glow, borders, etc.) | ❌ | **Code injection** (Tally Pro) – add your CSS from `docs/branding.md` / `docs/appendices/BRANDING.md` |

So: **no**, not every possible branding customization is set in the form, because **theme colors and fonts are not available in the MCP**; they must be set in Tally’s UI or via the full API/code injection.

---

## Summary

- **Via MCP:** Title, logo, cover image, “Continue” and “Submit” button labels are set. That’s everything the MCP allows.
- **Not via MCP:** Theme colors, fonts, and custom CSS from your branding docs cannot be set by the MCP. Apply them in Tally’s **Customize** tab and, if you use Pro, **Code injection** with your brand CSS.

Form (draft): https://tally.so/forms/2EkP1V/edit
