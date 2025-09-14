import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  honeypot?: string;
}

export class ContactFormPage {
  readonly page: Page;
  
  // Form elements
  readonly form: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly honeypotInput: Locator;
  readonly submitButton: Locator;
  
  // Error messages
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly messageError: Locator;
  
  // Status messages
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Form elements
    this.form = page.getByTestId('contact-form');
    this.firstNameInput = page.getByTestId('first-name-input');
    this.lastNameInput = page.getByTestId('last-name-input');
    this.emailInput = page.getByTestId('email-input');
    this.messageTextarea = page.getByTestId('message-textarea');
    this.honeypotInput = page.getByTestId('honeypot-input');
    this.submitButton = page.getByTestId('contact-submit');
    
    // Error messages
    this.firstNameError = page.getByTestId('form-field-first-name-error');
    this.lastNameError = page.getByTestId('form-field-last-name-error');
    this.emailError = page.getByTestId('form-field-email-error');
    this.messageError = page.getByTestId('form-field-message-error');
    
    // Status messages
    this.successMessage = page.getByTestId('contact-success');
    this.errorMessage = page.getByTestId('contact-error');
  }

  /**
   * Navigate to the contact page
   */
  async goto() {
    await this.page.goto('/contact');
    await this.waitForFormToLoad();
  }

  /**
   * Wait for the form to be visible and ready
   */
  async waitForFormToLoad() {
    // Wait for the form element to be visible (this might take longer due to React hydration)
    await expect(this.form).toBeVisible({ timeout: 15000 });
    
    // Wait for React hydration to complete
    await this.page.waitForTimeout(1000);
    
    // Wait for all form elements to be visible
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.messageTextarea).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    
    // Additional wait for React state to be ready
    await this.page.waitForTimeout(500);
  }

  /**
   * Fill the form with provided data
   */
  async fillForm(data: Partial<ContactFormData>) {
    if (data.firstName) {
      await this.firstNameInput.fill(data.firstName);
    }
    if (data.lastName) {
      await this.lastNameInput.fill(data.lastName);
    }
    if (data.email) {
      await this.emailInput.fill(data.email);
    }
    if (data.message) {
      await this.messageTextarea.fill(data.message);
    }
    if (data.honeypot) {
      await this.honeypotInput.evaluate((el, value) => { (el as HTMLInputElement).value = value; }, data.honeypot);
    }
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.emailInput.clear();
    await this.messageTextarea.clear();
    await this.honeypotInput.evaluate((el) => { (el as HTMLInputElement).value = ''; });
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * Submit the form using keyboard (Enter key)
   */
  async submitFormWithKeyboard() {
    await this.submitButton.press('Enter');
  }

  /**
   * Wait for form submission to complete
   */
  async waitForSubmission() {
    // Wait for submit button to be disabled (submitting state) - shorter timeout for fast failures
    try {
      await expect(this.submitButton).toBeDisabled({ timeout: 2000 });
    } catch {
      // If button doesn't get disabled (e.g., immediate network error), that's okay
    }
    
    // Wait for submit button to be enabled again (submission complete)
    await expect(this.submitButton).toBeEnabled({ timeout: 10000 });
  }

  /**
   * Wait for success message to appear
   */
  async waitForSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }

  /**
   * Wait for error message to appear
   */
  async waitForError() {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
  }

  /**
   * Check if form is in submitting state
   */
  async isSubmitting(): Promise<boolean> {
    return await this.submitButton.isDisabled();
  }

  /**
   * Check if success message is visible
   */
  async hasSuccessMessage(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  /**
   * Check if error message is visible
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message text for a specific field
   */
  async getFieldError(field: 'firstName' | 'lastName' | 'email' | 'message'): Promise<string> {
    const errorLocator = this.getFieldErrorLocator(field);
    return await errorLocator.textContent() || '';
  }

  /**
   * Get the error locator for a specific field
   */
  private getFieldErrorLocator(field: 'firstName' | 'lastName' | 'email' | 'message'): Locator {
    switch (field) {
      case 'firstName':
        return this.firstNameError;
      case 'lastName':
        return this.lastNameError;
      case 'email':
        return this.emailError;
      case 'message':
        return this.messageError;
    }
  }

  /**
   * Check if a field has an error
   */
  async hasFieldError(field: 'firstName' | 'lastName' | 'email' | 'message'): Promise<boolean> {
    const errorLocator = this.getFieldErrorLocator(field);
    return await errorLocator.isVisible();
  }

  /**
   * Trigger field validation by blurring the field
   */
  async triggerFieldValidation(field: 'firstName' | 'lastName' | 'email' | 'message') {
    const fieldLocator = this.getFieldLocator(field);
    await fieldLocator.blur();
  }

  /**
   * Get the field locator for a specific field
   */
  private getFieldLocator(field: 'firstName' | 'lastName' | 'email' | 'message'): Locator {
    switch (field) {
      case 'firstName':
        return this.firstNameInput;
      case 'lastName':
        return this.lastNameInput;
      case 'email':
        return this.emailInput;
      case 'message':
        return this.messageTextarea;
    }
  }

  /**
   * Get form field values
   */
  async getFormData(): Promise<ContactFormData> {
    return {
      firstName: await this.firstNameInput.inputValue(),
      lastName: await this.lastNameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      message: await this.messageTextarea.inputValue(),
      honeypot: await this.honeypotInput.inputValue(),
    };
  }

  /**
   * Check if form is valid (no visible errors)
   */
  async isFormValid(): Promise<boolean> {
    const hasErrors = await Promise.all([
      this.hasFieldError('firstName'),
      this.hasFieldError('lastName'),
      this.hasFieldError('email'),
      this.hasFieldError('message'),
    ]);
    
    return !hasErrors.some(hasError => hasError);
  }

  /**
   * Wait for form to be valid (no errors visible)
   */
  async waitForFormValid() {
    await expect(this.firstNameError).not.toBeVisible();
    await expect(this.lastNameError).not.toBeVisible();
    await expect(this.emailError).not.toBeVisible();
    await expect(this.messageError).not.toBeVisible();
  }
}
