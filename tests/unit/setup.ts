import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';

// Cleanup after each test - remove any DOM elements added during tests
afterEach(() => {
  // Clear body content
  document.body.innerHTML = '';
});
