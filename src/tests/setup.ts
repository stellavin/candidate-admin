import { afterEach, vi, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Test setup configuration.
 * Configures cleanup and mocks for testing environment.
 */

/**
 * Store original console methods for selective suppression during tests
 */
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    /** Suppress React act() warnings during tests */
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('inside a test was not wrapped in act') ||
       args[0].includes('An update to') ||
       args[0].includes('When testing, code that causes React state updates'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    /** Suppress Apollo Client deprecation warnings during tests */
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('An error occurred!') ||
       args[0].includes('addTypename') ||
       args[0].includes('canonizeResults'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterEach(() => {
  cleanup();
});

/**
 * Mock matchMedia API for components that use media queries
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock IntersectionObserver API for components that use intersection observation
 */
class IntersectionObserverMock {
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
}

(globalThis as any).IntersectionObserver = IntersectionObserverMock;
