const { sum, sumArray, sumAll } = require('../src/sum');

describe('Sum Functions Tests', () => {
  describe('sum', () => {
    test('should add two positive numbers correctly', () => {
      expect(sum(5, 3)).toBe(8);
    });

    test('should handle negative numbers', () => {
      expect(sum(-5, 3)).toBe(-2);
      expect(sum(-5, -3)).toBe(-8);
    });

    test('should handle zero', () => {
      expect(sum(0, 0)).toBe(0);
      expect(sum(5, 0)).toBe(5);
    });

    test('should handle decimal numbers', () => {
      expect(sum(1.5, 2.5)).toBe(4);
    });
  });

  describe('sumArray', () => {
    test('should sum array of positive numbers correctly', () => {
      expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
    });

    test('should handle empty array', () => {
      expect(sumArray([])).toBe(0);
    });

    test('should handle array with single element', () => {
      expect(sumArray([42])).toBe(42);
    });

    test('should handle negative numbers in array', () => {
      expect(sumArray([-1, -2, -3])).toBe(-6);
      expect(sumArray([10, -5, 3])).toBe(8);
    });

    test('should handle array with zeros', () => {
      expect(sumArray([0, 0, 0])).toBe(0);
      expect(sumArray([1, 0, 2])).toBe(3);
    });
  });

  describe('sumAll', () => {
    test('should sum multiple arguments correctly', () => {
      expect(sumAll(1, 2, 3, 4, 5)).toBe(15);
    });

    test('should handle no arguments', () => {
      expect(sumAll()).toBe(0);
    });

    test('should handle single argument', () => {
      expect(sumAll(10)).toBe(10);
    });

    test('should handle negative numbers', () => {
      expect(sumAll(-1, -2, -3)).toBe(-6);
      expect(sumAll(10, -5, 3, -2)).toBe(6);
    });

    test('should handle zeros', () => {
      expect(sumAll(0, 0, 0)).toBe(0);
      expect(sumAll(5, 0, 3)).toBe(8);
    });
  });
});
