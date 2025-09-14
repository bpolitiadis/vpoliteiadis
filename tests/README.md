# Contact Form Test Suite

This directory contains comprehensive Playwright tests for the Contact Form component, following best practices for UI testing with data-testid selectors.

## Test Structure

### Files

- `contact-form.spec.ts` - Main test suite using test helpers
- `page-objects/ContactFormPage.ts` - Page Object Model for the contact form
- `utils/test-helpers.ts` - Test utilities and mock helpers

### Test Coverage

#### 1. Form Rendering & Basic UX
- ✅ Page and form load correctly
- ✅ All form elements are visible and enabled
- ✅ Proper accessibility attributes (ARIA labels, descriptions)
- ✅ Honeypot field is properly hidden

#### 2. Field Validation
- ✅ Required field validation (firstName, lastName, email, message)
- ✅ Email format validation
- ✅ Field length limits (60 chars for names, 254 for email, 5000 for message)
- ✅ Error messages appear and clear correctly
- ✅ ARIA invalid states update properly

#### 3. Happy Path
- ✅ Successful form submission with valid data
- ✅ Success message display
- ✅ Form reset after successful submission
- ✅ Honeypot submission handling

#### 4. Error Handling
- ✅ Server error (500) handling
- ✅ Network error handling
- ✅ Error message display
- ✅ Form preservation on error

#### 5. Client-side Resilience
- ✅ Double submission prevention
- ✅ Form disabled during submission
- ✅ Keyboard submission support
- ✅ Loading state management

#### 6. Accessibility
- ✅ Proper ARIA attributes for validation states
- ✅ Screen reader announcements for status messages
- ✅ Form labels and descriptions
- ✅ Keyboard navigation support

## Data Test IDs

The tests use the following data-testid selectors:

### Form Elements
- `contact-form` - Form root element
- `first-name-input` - First name input field
- `last-name-input` - Last name input field
- `email-input` - Email input field
- `message-textarea` - Message textarea field
- `honeypot-input` - Hidden honeypot field
- `contact-submit` - Submit button

### Error Messages
- `form-field-first-name-error` - First name validation error
- `form-field-last-name-error` - Last name validation error
- `form-field-email-error` - Email validation error
- `form-field-message-error` - Message validation error

### Status Messages
- `contact-success` - Success message container
- `contact-error` - Error message container

## Running Tests

### Prerequisites
- Node.js >= 20.10.0
- pnpm >= 9.0.0
- Playwright installed (`pnpm install`)

### Commands

```bash
# Run all tests
pnpm exec playwright test

# Run contact form tests only
pnpm exec playwright test contact-form

# Run tests in headed mode (see browser)
pnpm exec playwright test --headed

# Run tests in debug mode
pnpm exec playwright test --debug

# Run specific test file
pnpm exec playwright test contact-form.spec.ts

# Run tests on specific browser
pnpm exec playwright test --project=chromium

# Generate test report
pnpm exec playwright show-report
```

### Test Configuration

The tests are configured in `playwright.config.ts` with:
- Base URL: `http://localhost:4321`
- Auto-start dev server
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile viewport testing
- Screenshot and video on failure
- Trace collection on retry

## API Mocking

Tests use `page.route()` for lightweight API mocking:

```typescript
// Mock successful response
await page.route('**/api/contact', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true }),
  });
});
```

## Page Object Model

The `ContactFormPage` class provides:
- Strongly typed selectors using `getByTestId()`
- Helper methods for common actions
- Form state management
- Validation checking
- Accessibility testing

## Best Practices

1. **Stable Selectors**: All tests use data-testid selectors only
2. **Explicit Waits**: Tests wait for elements to be visible/attached
3. **No Flakiness**: Tests use proper waiting strategies
4. **Accessibility**: Tests verify ARIA attributes and screen reader support
5. **Error Handling**: Tests cover both client and server error scenarios
6. **Form State**: Tests verify form behavior during submission
7. **Cleanup**: Tests clear mocks and reset state between runs

## Debugging

### Common Issues

1. **Element not found**: Check that data-testid selectors exist in the component
2. **Timeout errors**: Increase timeout or check for proper waiting
3. **Flaky tests**: Use explicit waits instead of fixed timeouts
4. **API mocking issues**: Verify route patterns match actual API calls

### Debug Commands

```bash
# Run with debug output
DEBUG=pw:api pnpm exec playwright test

# Run single test with trace
pnpm exec playwright test --trace on

# Open trace viewer
pnpm exec playwright show-trace trace.zip
```

## Extending Tests

To add new test scenarios:

1. Add new data-testid selectors to the ContactForm component if needed
2. Update the ContactFormPage class with new selectors
3. Add test cases to the appropriate describe block
4. Use the test helpers for common operations
5. Follow the existing patterns for assertions and waits

## CI/CD Integration

The tests are configured for CI environments with:
- Retry on failure (2 retries on CI)
- Single worker on CI to avoid resource conflicts
- Screenshot and video collection on failure
- HTML report generation
