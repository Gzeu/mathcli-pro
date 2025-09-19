import { test, expect, describe } from '@jest/globals';
import { convert } from '../commands/convert.js';

describe('convert function', () => {
  test('should convert 100 cm to m', () => {
    const result = convert('100 cm to m');
    expect(result).toBe('1 m');
  });

  test('should convert 5 kg to lb', () => {
    const result = convert('5 kg to lb');
    expect(result).toContain('11.02');
  });

  test('should convert temperature', () => {
    const result = convert('32 F to C');
    expect(result).toContain('0');
  });

  test('should handle invalid conversion', () => {
    const result = convert('invalid conversion');
    expect(result).toHaveProperty('error');
  });

  test('should handle empty input', () => {
    const result = convert('');
    expect(result).toHaveProperty('error');
  });

  test('should convert speed units', () => {
    const result = convert('60 mph to km/h');
    expect(result).toContain('96.56');
  });
});
