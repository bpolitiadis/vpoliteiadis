# Hero Section Quotes

These quotes are used in the `AboutHero` component on the About page. They rotate through different inspirational and professional quotes.

## Current Quotes Array

```javascript
[
  "Certified bug hunter.",
  "Debugging reality.",
  "I break code professionally.",
  "Automating workflows, amplifying humans.",
  "Partnering with AI to outpace time.",
  "The best way to predict the future is to invent it.",
  "Human creativity, artificial brains.",
  "The computer was born to solve problems that did not exist before.",
  "Engineering the future, accelerated by AI.",
  "Writing tests that test the limits.",
  "Any sufficiently advanced technology is indistinguishable from magic.",
  "I write code that watches your code.",
  "Imagination is more important than knowledge.",
  "The future is already here — it's just not evenly distributed.",
  "If you don't believe me or don't get it, I don't have time to try to convince you."
]
```

## Usage

Used in the `AboutHero` component with the `quotes` prop:

```astro
<AboutHero
  quotes={[
    "Certified bug hunter.",
    "Debugging reality.",
    "I break code professionally.",
    "Automating workflows, amplifying humans.",
    "Partnering with AI to outpace time.",
    "The best way to predict the future is to invent it.",
    "Human creativity, artificial brains.",
    "The computer was born to solve problems that did not exist before.",
    "Engineering the future, accelerated by AI.",
    "Writing tests that test the limits.",
    "Any sufficiently advanced technology is indistinguishable from magic.",
    "I write code that watches your code.",
    "Imagination is more important than knowledge.",
    "The future is already here — it's just not evenly distributed.",
    "If you don't believe me or don't get it, I don't have time to try to convince you."
  ]}
  client:load
/>
```

## Themes

The quotes cover several themes:
- **Professional QA/Testing**: "Certified bug hunter", "I break code professionally", "I write code that watches your code"
- **AI & Technology**: "Partnering with AI to outpace time", "Human creativity, artificial brains", "Engineering the future, accelerated by AI"
- **Innovation**: "The best way to predict the future is to invent it", "Imagination is more important than knowledge"
- **Philosophical**: "Any sufficiently advanced technology is indistinguishable from magic", "The future is already here — it's just not evenly distributed"

## Reference

- Component: `AboutHero` (located in `src/components/`)
- Page: About page
- Props: `quotes` array