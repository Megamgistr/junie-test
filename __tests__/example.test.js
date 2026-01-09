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

  test('THIS TEST SHOULD FAIL - intentional failure to trigger fix-ci.yml', () => {
    // This test is designed to fail to test the CI failure workflow
    expect(2 + 2).toBe(5); // Intentionally wrong
  });

  test('calculateTotal should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
