# About Page Structured Data

This structured data is used for the About page SEO and rich snippets.

```json
{
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Person",
    "name": "Vasileios Politeiadis",
    "jobTitle": "Senior QA Automation Specialist & Full-Stack Developer",
    "description": "Expert freelance QA automation specialist and full-stack developer. Specializing in Java automation frameworks, React/Next.js development, and AI-powered solutions for quality assurance and modern web applications.",
    "knowsAbout": [
      "QA Automation",
      "Java Testing Frameworks",
      "Selenium WebDriver",
      "Playwright Testing",
      "React Development",
      "Next.js Applications",
      "Astro Development",
      "Website Development",
      "TypeScript Development",
      "Supabase Backend",
      "AI Automation Tools",
      "European Commission Projects"
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Senior QA Automation Specialist",
        "description": "Freelance QA automation specialist specializing in test automation frameworks and quality assurance for web applications"
      },
      {
        "@type": "Occupation",
        "name": "Full-Stack Developer",
        "description": "Freelance full-stack developer specializing in modern web applications using React, Next.js, and Supabase"
      }
    ]
  }
}
```

## Usage

This structured data is passed to the `MainLayout` component via the `structuredData` prop on the About page.

## Reference

- Used in: `src/pages/about.astro` (assuming this is the About page file)
- Component: `MainLayout`
- Purpose: SEO enhancement and rich snippets for search engines