import { test, expect, describe, beforeEach, afterEach } from '@jest/globals';
import { plotChart } from '../commands/plotChart.js';

// Mock console.log to capture output
let consoleOutput = [];
const originalLog = console.log;

beforeEach(() => {
  consoleOutput = [];
  console.log = (...args) => {
    consoleOutput.push(args.join(' '));
  };
});

afterEach(() => {
  console.log = originalLog;
});

describe('plotChart function', () => {
  test('should plot simple array', () => {
    plotChart([1, 2, 3, 4, 5]);
    expect(consoleOutput.length).toBeGreaterThan(0);
    expect(consoleOutput.some(line => line.includes('▇'))).toBe(true);
  });

  test('should handle single value', () => {
    plotChart([42]);
    expect(consoleOutput.length).toBeGreaterThan(0);
  });

  test('should handle empty array', () => {
    plotChart([]);
    expect(consoleOutput.length).toBeGreaterThan(0);
  });

  test('should handle negative values', () => {
    plotChart([-1, -2, -3]);
    expect(consoleOutput.length).toBeGreaterThan(0);
  });

  test('should handle mixed positive and negative', () => {
    plotChart([-2, -1, 0, 1, 2]);
    expect(consoleOutput.length).toBeGreaterThan(0);
  });

  test('should handle floating point numbers', () => {
    plotChart([1.5, 2.7, 3.14, 4.2]);
    expect(consoleOutput.length).toBeGreaterThan(0);
  });
});
