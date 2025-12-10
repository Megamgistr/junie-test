/* Minimal tests for the calculator utility. */
'use strict';

const assert = require('assert');
const { calculate } = require('../src/calculator');

function run() {
  // Happy paths
  assert.strictEqual(calculate(1, 2, '+'), 3, '1 + 2 = 3');
  assert.strictEqual(calculate('10', '5', '-'), 5, '10 - 5 = 5');
  assert.strictEqual(calculate(3, 4, '*'), 12, '3 * 4 = 12');
  assert.strictEqual(calculate(10, 4, '/'), 2.5, '10 / 4 = 2.5');

  // Edge cases
  assert.throws(() => calculate(1, 0, '/'), /Division by zero/, 'division by zero throws');
  assert.throws(() => calculate('a', 1, '+'), /finite number/, 'non-numeric left operand throws');
  assert.throws(() => calculate(1, 'x', '+'), /finite number/, 'non-numeric right operand throws');
  assert.throws(() => calculate(1, 2, '^'), /Unsupported operator/, 'unsupported operator throws');

  console.log('All calculator tests passed');
}

try {
  run();
} catch (err) {
  console.error('Test failure:', err && err.message ? err.message : err);
  process.exit(1);
}
