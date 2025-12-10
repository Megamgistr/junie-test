#!/usr/bin/env node
/* Minimal zero-dependency test runner for this repo.
 * Runs a set of assertions and reports pass/fail with exit code.
 */
const { calculate } = require('../src/calculator');

let passed = 0;
let failed = 0;
const failures = [];

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message} (expected ${expected}, got ${actual})`);
  }
}

function assertAlmostEqual(actual, expected, eps = 1e-10, message = 'Values not almost-equal') {
  if (Number.isNaN(actual) || Math.abs(actual - expected) > eps) {
    throw new Error(`${message} (expected ~${expected}, got ${actual})`);
  }
}

function assertThrows(fn, expectedErrorCtor, message) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
    if (!(e instanceof expectedErrorCtor)) {
      throw new Error(`${message} (threw ${e.constructor && e.constructor.name}, expected ${expectedErrorCtor.name})`);
    }
  }
  if (!threw) {
    throw new Error(`${message} (did not throw)`);
  }
}

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`✓ ${name}`);
  } catch (e) {
    failed++;
    failures.push({ name, error: e });
    console.error(`✗ ${name}`);
    console.error(`  → ${e.message}`);
  }
}

// Core operation tests
[
  ['adds two numbers', () => assertEqual(calculate(1, '+', 2), 3, '1 + 2 should equal 3')],
  ['subtracts two numbers', () => assertEqual(calculate(7, '-', 5), 2, '7 - 5 should equal 2')],
  ['multiplies two numbers', () => assertEqual(calculate(3, '*', 4), 12, '3 * 4 should equal 12')],
  ['divides two numbers', () => assertEqual(calculate(12, '/', 3), 4, '12 / 3 should equal 4')],

  // Type coercion tests
  ['coerces numeric strings', () => assertEqual(calculate('10', '+', '5'), 15, '"10" + "5" should equal 15')],
  ['supports negative numbers', () => assertEqual(calculate(-2, '*', 8), -16, '-2 * 8 should equal -16')],

  // Floating point handling
  ['handles floating point safely (approx)', () => assertAlmostEqual(calculate(0.1, '+', 0.2), 0.3, 1e-12, '0.1 + 0.2 ≈ 0.3')],

  // Error handling
  ['throws on invalid operator', () => assertThrows(() => calculate(1, 'x', 2), TypeError, 'invalid operator should throw TypeError')],
  ['throws on invalid left operand', () => assertThrows(() => calculate('foo', '+', 1), TypeError, 'invalid left operand should throw TypeError')],
  ['throws on invalid right operand', () => assertThrows(() => calculate(1, '+', {}), TypeError, 'invalid right operand should throw TypeError')],
  ['throws on division by zero', () => assertThrows(() => calculate(5, '/', 0), RangeError, 'division by zero should throw RangeError')],

  // Larger numbers
  ['handles large numbers', () => assertEqual(calculate(1e12, '+', 1e12), 2e12, 'large number addition')],

  // Algebraic properties (spot checks)
  ['addition is commutative for sample values', () => {
    const samples = [
      [2, 5],
      [-3, 10],
      [0.1, 0.2],
      [1e6, -3]
    ];
    for (const [a, b] of samples) {
      const left = calculate(a, '+', b);
      const right = calculate(b, '+', a);
      assertAlmostEqual(left, right, 1e-12, `commutativity failed for ${a}, ${b}`);
    }
  }],
  ['multiplication is commutative for sample values', () => {
    const samples = [
      [3, 7],
      [-4, 9],
      [0.5, 0.2]
    ];
    for (const [a, b] of samples) {
      const left = calculate(a, '*', b);
      const right = calculate(b, '*', a);
      assertAlmostEqual(left, right, 1e-12, `commutativity failed for ${a}, ${b}`);
    }
  }],
].forEach(([name, fn]) => test(name, fn));

console.log('\nTest Summary:');
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);

process.exitCode = failed === 0 ? 0 : 1;
