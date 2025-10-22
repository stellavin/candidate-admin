import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    /** Change value */
    rerender({ value: 'updated', delay: 500 });
    
    /** Value should not change immediately */
    expect(result.current).toBe('initial');

    /** Fast-forward time */
    act(() => {
      vi.advanceTimersByTime(500);
    });

    /** Value should now be updated */
    expect(result.current).toBe('updated');
  });

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    /** Change value multiple times quickly */
    rerender({ value: 'second' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'third' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ value: 'fourth' });
    
    /** Value should still be the initial one */
    expect(result.current).toBe('first');

    /** Fast-forward full delay from last change */
    act(() => {
      vi.advanceTimersByTime(500);
    });

    /** Should have the last value */
    expect(result.current).toBe('fourth');
  });

  it('should work with different data types', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 123 } }
    );

    expect(result.current).toBe(123);

    rerender({ value: 456 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(456);
  });

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current).toBe('updated');
  });
});

