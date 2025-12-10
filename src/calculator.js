/**
 * Simple calculator utility.
 *
 * Supports basic binary operations on numbers: addition, subtraction,
 * multiplication, and division. Inputs may be numbers or numeric strings.
 *
 * Examples:
 *   calculate(2, 3, '+') // 5
 *   calculate('10', '4', '/') // 2.5
 *
 * Throws TypeError for invalid operands/operators and RangeError for division by zero.
 */

'use strict';

/**
 * Coerce a value to a finite number or throw.
 * @param {unknown} v
 * @param {string} name
 * @returns {number}
 */
function toFiniteNumber(v, name) {
  const n = typeof v === 'string' && v.trim() !== '' ? Number(v) : Number(v);
  if (!Number.isFinite(n)) {
    throw new TypeError(`${name} must be a finite number`);
  }
  return n;
}

/**
 * Perform a basic arithmetic operation.
 * @param {number|string} a - Left operand
 * @param {number|string} b - Right operand
 * @param {'+'|'-'|'*'|'/'} op - Operator
 * @returns {number}
 */
function calculate(a, b, op) {
  const x = toFiniteNumber(a, 'a');
  const y = toFiniteNumber(b, 'b');

  switch (op) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      if (y === 0) throw new RangeError('Division by zero');
      return x / y;
    default:
      throw new TypeError(`Unsupported operator: ${op}`);
  }
}

module.exports = { calculate };
