import { useState, useEffect } from 'react';

/**
 * Debounces a value by delaying updates until after a specified delay.
 * Useful for search inputs to reduce API calls and improve performance.
 * @template T - The type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {T} The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

