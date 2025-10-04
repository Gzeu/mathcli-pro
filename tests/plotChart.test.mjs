import { test, expect, describe } from '@jest/globals';
import { plotChart } from '../commands/plotChart.js';

describe('plotChart function', () => {
  test('should plot simple array', () => {
    const result = plotChart([1, 2, 3, 4, 5]);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('▇');
  });

  test('should handle single value', () => {
    const result = plotChart([42]);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should handle empty array', () => {
    const result = plotChart([]);
    expect(result).toBe('Provide a list of numbers to plot.');
  });

  test('should handle negative values', () => {
    const result = plotChart([-1, -2, -3]);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should handle mixed positive and negative', () => {
    const result = plotChart([-2, -1, 0, 1, 2]);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should handle floating point numbers', () => {
    const result = plotChart([1.5, 2.7, 3.14, 4.2]);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
