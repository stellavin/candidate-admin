/**
 * Application-wide constants
 */

export const APP_NAME = 'Candidate Admin';

export const ROUTES = {
  DASHBOARD: '/dashboard',
  CANDIDATES: '/candidates',
  SETTINGS: '/settings',
} as const;

export const STORAGE_KEYS = {
  THEME_MODE: 'themeMode',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50],
} as const;

export const DEBOUNCE_MS = {
  SEARCH: 400,
  RESIZE: 150,
} as const;

