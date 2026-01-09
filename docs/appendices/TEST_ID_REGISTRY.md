# Test ID Registry

This document provides a comprehensive registry of all `data-testid` attributes added to the Vasileios Politeiadis portfolio website for automated testing purposes.

## Page-Level Test IDs

### Homepage (`/`)
- `page-home` - Main hero section container
- `hero-intro-section` - Hero intro section
- `hero-chat-layout` - Chat bubble layout container
- `hero-navigation-buttons` - Navigation buttons container
- `navigation-buttons` - Navigation buttons component
- `nav-button-{name}` - Individual navigation buttons (about, projects, creative, blog, contact)
- `message-bubble` - Message bubble component
- `avatar-bubble` - Avatar bubble component

### About Page (`/about`)
- `page-about` - Main hero section container
- `about-main-content` - Main content section
- `about-hero-content` - About hero component

### Contact Page (`/contact`)
- `page-contact` - Main page container
- `contact-main-content` - Contact content section
- `contact-form` - Contact form component
- `first-name-input` - First name input field
- `last-name-input` - Last name input field
- `email-input` - Email input field
- `message-textarea` - Message textarea field
- `honeypot-input` - Hidden honeypot field
- `submit-button` - Form submit button
- `form-success` - Success message container
- `form-error` - Error message container

### Projects Page (`/projects`)
- `page-projects` - Main page container
- `projects-grid` - Projects grid container
- `project-card-{slug}` - Individual project cards
- `project-card-learn-more-{slug}` - Learn more buttons
- `project-card-view-live-{slug}` - View live buttons

### Blog Page (`/blog`)
- `page-blog` - Main page container
- `blog-posts-grid` - Blog posts grid container
- `blog-post-{slug}` - Individual blog post cards
- `blog-post-link-{slug}` - Blog post read more links
- `newsletter-signup` - Newsletter signup section
- `newsletter-email-input` - Newsletter email input
- `newsletter-subscribe-button` - Newsletter subscribe button

### Creative Page (`/creative`)
- `page-creative` - Main page container
- `creative-projects-grid` - Creative projects grid container
- `featured-project-card-{title}` - Featured project cards
- `featured-project-hero-{title}` - Featured project hero links
- `featured-project-cta-{title}` - Featured project CTA buttons

## Component-Level Test IDs

### Navigation
- `navbar` - Main navigation bar
- `navbar-logo` - Logo link
- `navbar-desktop-menu` - Desktop navigation menu
- `navbar-link-{name}` - Desktop navigation links (home, about, projects, creative, blog, contact)
- `mobile-menu-button` - Mobile menu toggle button
- `mobile-menu` - Mobile navigation menu
- `mobile-menu-close` - Mobile menu close button
- `mobile-nav-links` - Mobile navigation links container
- `mobile-nav-link-{name}` - Mobile navigation links

### Footer
- `footer` - Footer container
- `footer-logo` - Footer logo link
- `footer-copyright` - Copyright text
- `footer-social-links` - Social links container

### Forms
- `contact-form` - Contact form container
- `first-name-input` - First name input
- `last-name-input` - Last name input
- `email-input` - Email input
- `message-textarea` - Message textarea
- `honeypot-input` - Honeypot field
- `submit-button` - Submit button
- `form-success` - Success message
- `form-error` - Error message

### Cards and Content
- `project-card-{slug}` - Project card containers
- `project-card-learn-more-{slug}` - Project learn more buttons
- `project-card-view-live-{slug}` - Project view live buttons
- `featured-project-card-{title}` - Featured project cards
- `featured-project-hero-{title}` - Featured project hero links
- `featured-project-cta-{title}` - Featured project CTA buttons
- `blog-post-{slug}` - Blog post cards
- `blog-post-link-{slug}` - Blog post links

### Interactive Elements
- `nav-button-{name}` - Navigation buttons (about, projects, creative, blog, contact)
- `mobile-menu-button` - Mobile menu toggle
- `mobile-menu-close` - Mobile menu close
- `newsletter-email-input` - Newsletter email input
- `newsletter-subscribe-button` - Newsletter subscribe button

## Naming Conventions

### Page Roots
- Format: `page-{route}`
- Examples: `page-home`, `page-about`, `page-contact`

### Component Roots
- Format: `{component-name}`
- Examples: `navbar`, `footer`, `contact-form`

### Interactive Elements
- Format: `{component}-{element}`
- Examples: `navbar-logo`, `contact-submit`, `mobile-menu-button`

### State & Feedback
- Format: `{component}-{state}`
- Examples: `form-success`, `form-error`, `toast-success`

### Repeated Items
- Format: `{component}-{item}-{identifier}`
- Examples: `project-card-{slug}`, `blog-post-{slug}`, `nav-button-{name}`

## Usage Guidelines

1. **Stable Selectors**: All test IDs are placed on the most stable DOM nodes that won't change due to styling or layout changes.

2. **Semantic Naming**: Test IDs use kebab-case and describe the element's purpose or content.

3. **Scoped Names**: Test IDs are scoped to their component or page context to avoid conflicts.

4. **Consistent Patterns**: Similar elements across different pages use consistent naming patterns.

5. **Accessibility**: Test IDs complement existing ARIA labels and don't interfere with screen readers.

## Testing Recommendations

- Use these test IDs for Playwright, Cypress, or other automated testing frameworks
- Prefer test IDs over CSS selectors for more reliable tests
- Test IDs are more resilient to UI changes than class-based selectors
- Combine with semantic selectors for comprehensive test coverage

## Maintenance

- When adding new interactive elements, follow the established naming conventions
- Update this registry when adding or modifying test IDs
- Ensure test IDs remain stable across UI updates
- Remove test IDs for deleted components or pages
