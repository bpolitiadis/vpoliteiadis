import { test, expect } from '@playwright/test';
import { ContactFormPage } from './page-objects/ContactFormPage';
import { ContactFormMocks, ContactFormTestData } from './utils/test-helpers';

test.describe('Contact Form - Focused Tests', () => {
  let contactFormPage: ContactFormPage;

  test.beforeEach(async ({ page }) => {
    contactFormPage = new ContactFormPage(page);
    await contactFormPage.goto();
  });

  test.afterEach(async ({ page }) => {
    // Clear any mocks after each test
    await ContactFormMocks.clearMocks(page);
  });

  test.describe('Form Rendering', () => {
    test('should render all form elements with correct data-testid selectors', async () => {
      // Verify all required elements are present and visible
      await expect(contactFormPage.form).toBeVisible();
      await expect(contactFormPage.firstNameInput).toBeVisible();
      await expect(contactFormPage.lastNameInput).toBeVisible();
      await expect(contactFormPage.emailInput).toBeVisible();
      await expect(contactFormPage.messageTextarea).toBeVisible();
      await expect(contactFormPage.submitButton).toBeVisible();
      await expect(contactFormPage.honeypotInput).toBeHidden();
    });

    test('should have proper accessibility attributes', async () => {
      // Check ARIA attributes
      await expect(contactFormPage.firstNameInput).toHaveAttribute('aria-describedby', 'firstName-error');
      await expect(contactFormPage.emailInput).toHaveAttribute('aria-describedby', 'email-error');
      await expect(contactFormPage.submitButton).toHaveAttribute('aria-label', 'Send message');
      
      // Check that honeypot is properly hidden
      await expect(contactFormPage.honeypotInput).toHaveAttribute('aria-hidden', 'true');
      await expect(contactFormPage.honeypotInput).toHaveAttribute('tabindex', '-1');
    });
  });

  test.describe('Field Validation', () => {
    test('should validate required fields on submit', async () => {
      // Submit empty form
      await contactFormPage.submitForm();
      
      // Check all required field errors are shown
      await expect(contactFormPage.firstNameError).toBeVisible();
      await expect(contactFormPage.lastNameError).toBeVisible();
      await expect(contactFormPage.emailError).toBeVisible();
      await expect(contactFormPage.messageError).toBeVisible();
      
      // Verify error messages
      await expect(contactFormPage.firstNameError).toContainText('First Name is required');
      await expect(contactFormPage.lastNameError).toContainText('Last Name is required');
      await expect(contactFormPage.emailError).toContainText('Invalid email address');
      await expect(contactFormPage.messageError).toContainText('Message is required');
    });

    test('should validate email format', async () => {
      for (const invalidEmail of ContactFormTestData.invalidEmails) {
        await contactFormPage.fillForm({ email: invalidEmail });
        await contactFormPage.triggerFieldValidation('email');
        
        await expect(contactFormPage.emailError).toBeVisible();
        await expect(contactFormPage.emailError).toContainText('Invalid email address');
        
        // Clear for next iteration
        await contactFormPage.emailInput.clear();
      }
    });

    test('should clear errors when valid data is entered', async () => {
      // Trigger errors first
      await contactFormPage.submitForm();
      await expect(contactFormPage.firstNameError).toBeVisible();
      
      // Fill with valid data
      await contactFormPage.fillForm(ContactFormTestData.valid);
      
      // Trigger validation
      await contactFormPage.triggerFieldValidation('firstName');
      await contactFormPage.triggerFieldValidation('lastName');
      await contactFormPage.triggerFieldValidation('email');
      await contactFormPage.triggerFieldValidation('message');
      
      // Errors should be cleared
      await expect(contactFormPage.firstNameError).not.toBeVisible();
      await expect(contactFormPage.lastNameError).not.toBeVisible();
      await expect(contactFormPage.emailError).not.toBeVisible();
      await expect(contactFormPage.messageError).not.toBeVisible();
    });
  });

  test.describe('Happy Path', () => {
    test('should submit form successfully and show success message', async ({ page }) => {
      // Track console errors to catch 404/MIME issues
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      // Mock successful API response
      await ContactFormMocks.mockSuccessResponse(page);
      
      // Fill and submit form
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitForm();
      
      // Wait for submission and success
      await contactFormPage.waitForSubmission();
      await contactFormPage.waitForSuccess();
      
      // Verify success message
      await expect(contactFormPage.successMessage).toContainText('Message sent successfully!');
      
      // Verify form is reset
      const formData = await contactFormPage.getFormData();
      expect(formData.firstName).toBe('');
      expect(formData.lastName).toBe('');
      expect(formData.email).toBe('');
      expect(formData.message).toBe('');

      // No console errors (e.g., missing assets)
      expect.soft(consoleErrors).toHaveLength(0);
    });

    test('should handle honeypot submission', async ({ page }) => {
      // Mock API (should not be called)
      await ContactFormMocks.mockSuccessResponse(page);
      
      // Fill form with honeypot data
      await contactFormPage.fillForm(ContactFormTestData.honeypot);
      await contactFormPage.submitForm();
      
      // Should show success without calling API
      await contactFormPage.waitForSuccess();
      await expect(contactFormPage.successMessage).toContainText('Message sent successfully!');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle server error (500)', async ({ page }) => {
      await ContactFormMocks.mockErrorResponse(page, 500);
      
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitForm();
      
      await contactFormPage.waitForSubmission();
      await contactFormPage.waitForError();
      
      await expect(contactFormPage.errorMessage).toContainText('There was an error sending your message');
    });

    test('should handle network error', async ({ page }) => {
      await ContactFormMocks.mockNetworkError(page);
      
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitForm();
      
      await contactFormPage.waitForSubmission();
      await contactFormPage.waitForError();
      
      await expect(contactFormPage.errorMessage).toContainText('There was an error sending your message');
    });
  });

  test.describe('Form State Management', () => {
    test('should disable form during submission', async ({ page }) => {
      // Mock slow response
      await ContactFormMocks.mockSuccessResponse(page, 2000);
      
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitForm();
      
      // Check that form is disabled during submission
      await expect(contactFormPage.submitButton).toBeDisabled();
      await expect(contactFormPage.firstNameInput).toBeDisabled();
      await expect(contactFormPage.lastNameInput).toBeDisabled();
      await expect(contactFormPage.emailInput).toBeDisabled();
      await expect(contactFormPage.messageTextarea).toBeDisabled();
    });

    test('should prevent double submission', async ({ page }) => {
      // Mock slow response
      await ContactFormMocks.mockSuccessResponse(page, 1000);
      
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitForm();
      
      // Try to submit again while first submission is in progress
      await contactFormPage.submitButton.click({ force: true });
      
      // Wait for completion
      await contactFormPage.waitForSubmission();
      await contactFormPage.waitForSuccess();
      
      // Should only have one success message
      const successCount = await contactFormPage.page.locator('[data-testid="contact-success"]').count();
      expect(successCount).toBe(1);
    });

    test('should support keyboard submission', async ({ page }) => {
      await ContactFormMocks.mockSuccessResponse(page);
      
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitFormWithKeyboard();
      
      await contactFormPage.waitForSubmission();
      await contactFormPage.waitForSuccess();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA states for validation', async () => {
      // Check initial state
      await expect(contactFormPage.firstNameInput).toHaveAttribute('aria-invalid', 'false');
      
      // Trigger validation
      await contactFormPage.submitForm();
      await expect(contactFormPage.firstNameInput).toHaveAttribute('aria-invalid', 'true');
      
      // Fix validation
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.triggerFieldValidation('firstName');
      await expect(contactFormPage.firstNameInput).toHaveAttribute('aria-invalid', 'false');
    });

    test('should announce status messages to screen readers', async ({ page }) => {
      await ContactFormMocks.mockSuccessResponse(page);
      
      await contactFormPage.fillForm(ContactFormTestData.valid);
      await contactFormPage.submitForm();
      await contactFormPage.waitForSuccess();
      
      // Check ARIA live region (success message container)
      const alertRegion = contactFormPage.page.locator('[role="alert"]').filter({ hasText: 'Message sent successfully' });
      await expect(alertRegion).toBeVisible();
      await expect(alertRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle maximum length inputs', async ({ page }) => {
      await ContactFormMocks.mockSuccessResponse(page);
      
      await contactFormPage.fillForm(ContactFormTestData.longData);
      await contactFormPage.submitForm();
      
      await contactFormPage.waitForSubmission();
      await contactFormPage.waitForSuccess();
    });

    test('should handle rapid field changes', async () => {
      // Rapidly change field values
      for (let i = 0; i < 10; i++) {
        await contactFormPage.fillForm({
          firstName: `Test${i}`,
          lastName: `User${i}`,
          email: `test${i}@example.com`,
          message: `Message ${i}`,
        });
        await contactFormPage.page.waitForTimeout(50);
      }
      
      // Clear all fields to trigger validation errors
      await contactFormPage.clearForm();
      
      // Final submission should show validation errors
      await contactFormPage.submitForm();
      
      // Should show validation errors for empty fields
      await expect(contactFormPage.firstNameError).toBeVisible();
    });
  });
});
