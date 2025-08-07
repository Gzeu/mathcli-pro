import { test, expect } from '@jest/globals';
import { calculate } from '../commands/calculate.js';

test('calculate: simple expressions', () => {
  expect(calculate('2+2*5').result).toBe(12);
  expect(calculate('sin(pi/2) + sqrt(16)').result).toBeCloseTo(5);
  expect(calculate('log(100, 10)').result).toBe(2);
  expect(calculate('pow(2,8)').result).toBe(256);
});
