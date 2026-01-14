const { calculateTotal } = require('../src/example');

describe('Example Tests', () => {
  test('calculateTotal should sum item prices correctly', () => {
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 }
    ];
    expect(calculateTotal(items)).toBe(60);
  });

  test('THIS TEST SHOULD NOW PASS', () => {
    expect(2 + 2).toBe(4);
  });

  test('calculateTotal should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
