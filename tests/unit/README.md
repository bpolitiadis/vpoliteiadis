# Unit Tests

This directory contains unit tests for Astro components using **Vitest** and **Astro Container API**.

## Setup

Unit tests use:
- **Vitest** - Fast, Vite-native unit testing framework
- **Astro Container API** - For rendering Astro components in isolation
- **happy-dom** - Lightweight DOM implementation for testing
- **@testing-library/jest-dom** - Custom matchers for DOM assertions

## Running Tests

```bash
# Run all unit tests
pnpm test:unit

# Run in watch mode
pnpm test:unit:watch

# Run with UI
pnpm test:unit:ui

# Generate coverage report
pnpm test:unit:coverage
```

## Writing Tests

### Basic Test Structure

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

describe('ComponentName', () => {
  let container: AstroContainer;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('should render correctly', async () => {
    const result = await container.renderToString(
      'src/components/ComponentName.astro',
      {} // Props
    );
    
    expect(result.html).toBeTruthy();
    // Add your assertions here
  });
});
```

### Testing Component Props

```typescript
it('should render with custom props', async () => {
  const result = await container.renderToString(
    'src/components/ComponentName.astro',
    {
      title: 'Test Title',
      description: 'Test Description'
    }
  );
  
  const domContainer = document.createElement('div');
  domContainer.innerHTML = result.html;
  
  const heading = domContainer.querySelector('h1');
  expect(heading?.textContent).toContain('Test Title');
});
```

### Testing Accessibility

```typescript
it('should have proper ARIA attributes', async () => {
  const result = await container.renderToString(
    'src/components/ComponentName.astro',
    {}
  );
  
  const domContainer = document.createElement('div');
  domContainer.innerHTML = result.html;
  
  const section = domContainer.querySelector('[data-testid="component"]');
  expect(section).toHaveAttribute('aria-label');
});
```

## Notes

- **Container API**: Uses Astro's experimental Container API for component rendering
- **Path Resolution**: Component paths are relative to project root (e.g., `src/components/...`)
- **DOM Testing**: Use `document.createElement` and `innerHTML` to parse rendered HTML
- **Cleanup**: Tests automatically clean up DOM after each test

## Troubleshooting

### Component Not Rendering

If `result.html` is empty or undefined:
1. Check that the component path is correct (relative to project root)
2. Verify the component doesn't have build-time dependencies that fail
3. Check for import errors in the component

### Import Errors

If you see import errors:
1. Ensure all component dependencies are available
2. Check that image assets are handled correctly (may need mocking)
3. Verify Astro integrations are properly configured

## Best Practices

1. **Test Structure**: Test component structure, accessibility, and key content
2. **Isolation**: Each test should be independent
3. **Cleanup**: Always clean up DOM elements after tests
4. **Assertions**: Use descriptive assertions with clear error messages
5. **Coverage**: Aim for testing critical functionality and edge cases
