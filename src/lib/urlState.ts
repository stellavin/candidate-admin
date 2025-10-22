/**
 * Utilities for syncing state with URL search parameters
 */

export function getSearchParam(key: string, defaultValue = ''): string {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || defaultValue;
}

export function setSearchParams(updates: Record<string, string | number | undefined>) {
  const params = new URLSearchParams(window.location.search);
  
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });
  
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
}

export function parseFiltersFromUrl(): {
  firstName: string;
  lastName: string;
  page: number;
} {
  return {
    firstName: getSearchParam('first'),
    lastName: getSearchParam('last'),
    page: parseInt(getSearchParam('page', '1'), 10),
  };
}

