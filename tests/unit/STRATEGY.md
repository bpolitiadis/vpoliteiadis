# Testing Strategy: Vitest vs Playwright

## TL;DR: Use Both Tools for Different Purposes

**Don't switch** - use both:
- **Vitest**: Unit tests for utilities, functions, and pure logic
- **Playwright E2E**: Component and integration tests (already working)

## When to Use Each Tool

### ✅ Use Vitest For:

1. **Pure Functions & Utilities**
   ```typescript
   // tests/unit/lib/utils.test.ts
   import { formatDate, slugify } from '@/lib/utils';
   
   describe('utils', () => {
     it('should format dates correctly', () => {
       expect(formatDate(new Date('2024-01-01'))).toBe('Jan 1, 2024');
     });
   });
   ```

2. **Business Logic**
   - Data transformations
   - Validation functions
   - Calculation utilities
   - String manipulation

3. **Library Code**
   - Helper functions
   - Type guards
   - Formatters
   - Parsers

4. **React Component Logic** (if isolated)
   - Hook testing
   - Pure component functions
   - State management logic

### ✅ Use Playwright E2E For:

1. **Astro Components** (Current Approach)
   ```typescript
   // tests/e2e/components/ContactSection.spec.ts
   test('ContactSection renders correctly', async ({ page }) => {
     await page.goto('/');
     const section = page.getByTestId('page-contact');
     await expect(section).toBeVisible();
   });
   ```

2. **React Components** (as they appear in pages)
   - ProfileCard
   - ContactForm
   - DecryptedText
   - Any client-side components

3. **Integration Tests**
   - User flows
   - Form submissions
   - Navigation
   - Page interactions

4. **Visual Testing**
   - Layout verification
   - Responsive design
   - Accessibility

## Why Not Switch Completely?

### Vitest Advantages:
- ⚡ **Fast**: Runs in milliseconds
- 🔄 **Watch Mode**: Instant feedback
- 🎯 **Isolation**: Test pure functions without browser
- 💰 **Cheap**: No browser overhead
- 🧪 **Coverage**: Great for unit test coverage

### Playwright Advantages:
- 🌐 **Real Browser**: Tests actual rendering
- 🎨 **Visual**: See what users see
- 🔗 **Integration**: Tests full stack
- ♿ **Accessibility**: Real a11y testing
- 📱 **Responsive**: Test across viewports

## Recommended Testing Pyramid

```
        /\
       /  \     E2E Tests (Playwright)
      /____\     - Critical user flows
     /      \    - Component integration
    /________\   - Cross-browser testing
   /          \
  /____________\  Unit Tests (Vitest)
                 - Pure functions
                 - Utilities
                 - Business logic
```

## Current Setup Status

### ✅ What You Have:
- **Vitest**: Configured and ready for unit tests
- **Playwright**: Working E2E tests for components
- **Test Infrastructure**: Both tools properly set up

### 📝 What to Do:

1. **Keep Vitest** for unit testing utilities:
   ```bash
   # Create tests for lib functions
   tests/unit/lib/utils.test.ts
   tests/unit/lib/analytics.test.ts
   tests/unit/lib/social-config.test.ts
   ```

2. **Continue Using Playwright** for components:
   ```bash
   # Your existing E2E tests already cover components
   tests/e2e/homepage.spec.ts  # Tests HeroSection
   tests/contact-form.spec.ts  # Tests ContactForm
   ```

3. **Don't Delete Vitest Setup**:
   - Keep it for future utility testing
   - May work when Container API matures
   - Useful for React component unit tests

## Example: Testing a Utility Function

```typescript
// src/lib/utils.ts
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}

// tests/unit/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { slugify } from '@/lib/utils';

describe('slugify', () => {
  it('should convert text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });
});
```

## Conclusion

**Don't switch** - use both tools strategically:
- **Vitest** = Fast unit tests for pure code
- **Playwright** = Real browser tests for components

Your current setup is actually ideal - you just need to use Vitest for what it's good at (utilities) and Playwright for what it's good at (components).
