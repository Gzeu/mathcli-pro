import { test, expect, describe } from '@jest/globals';
import { optimize } from '../commands/optimize.js';

describe('optimize function', () => {
  test('should find minimum of quadratic function', () => {
    const result = optimize('minimize x^2+3x-5');
    expect(result).toHaveProperty('result');
    expect(result).toHaveProperty('extremum');
    expect(result.extremum).toHaveProperty('x');
    expect(result.extremum).toHaveProperty('y');
  });

  test('should find maximum of negative quadratic', () => {
    const result = optimize('maximize -x^2+4x+1');
    expect(result).toHaveProperty('result');
    expect(result.extremum.x).toBeCloseTo(2, 1);
  });

  test('should handle invalid function', () => {
    const result = optimize('invalid function');
    expect(result).toHaveProperty('error');
  });

  test('should handle empty input', () => {
    const result = optimize('');
    expect(result).toHaveProperty('error');
  });

  test('should handle minimize simple quadratic', () => {
    const result = optimize('minimize x^2');
    expect(result.extremum.x).toBeCloseTo(0, 1);
    expect(result.extremum.y).toBeCloseTo(0, 1);
  });

  test('should return all critical points', () => {
    const result = optimize('minimize x^2+2x+1');
    expect(result).toHaveProperty('allPoints');
    expect(Array.isArray(result.allPoints)).toBe(true);
  });
});
