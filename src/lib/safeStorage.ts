/**
 * Safe wrapper around localStorage that handles errors gracefully.
 * Useful for private browsing mode, disabled storage, or quota exceeded scenarios.
 */
export const safeStorage = {
  /**
   * Retrieves an item from localStorage.
   * @param {string} key - The storage key
   * @returns {string | null} The stored value or null if not found or error occurred
   */
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  /**
   * Stores an item in localStorage.
   * @param {string} key - The storage key
   * @param {string} value - The value to store
   * @returns {boolean} True if successful, false otherwise
   */
  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Removes an item from localStorage.
   * @param {string} key - The storage key to remove
   * @returns {boolean} True if successful, false otherwise
   */
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Clears all items from localStorage.
   * @returns {boolean} True if successful, false otherwise
   */
  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

