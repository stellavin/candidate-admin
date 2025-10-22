/**
 * Retrieves a search parameter from the current URL.
 * @param {string} key - The search parameter key
 * @param {string} defaultValue - Default value if parameter is not found
 * @returns {string} The search parameter value or default value
 */
export function getSearchParam(key: string, defaultValue = ''): string {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || defaultValue;
}

/**
 * Updates URL search parameters without page reload.
 * @param {Record<string, string | number | undefined>} updates - Object with key-value pairs to update
 */
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

/**
 * Parses candidate filter parameters from the current URL.
 * @returns {Object} Parsed filter values with firstName, lastName, and page
 */
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

