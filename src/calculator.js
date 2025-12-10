/**
 * Simple calculator utility.
 *
 * calculate(a, op, b):
 *   - a, b: numbers (finite)
 *   - op: one of '+', '-', '*', '/'
 * Returns the numeric result.
 * Throws TypeError for invalid inputs and RangeError for division by zero.
 */
function calculate(a, op, b) {
  // Validate operator first
  if (!['+', '-', '*', '/'].includes(op)) {
    throw new TypeError(`Invalid operator: ${op}`);
  }

  // Coerce numeric inputs if they are string numerals
  const aNum = coerceNumber(a, 'a');
  const bNum = coerceNumber(b, 'b');

  switch (op) {
    case '+':
      return aNum + bNum;
    case '-':
      return aNum - bNum;
    case '*':
      return aNum * bNum;
    case '/':
      if (bNum === 0) {
        throw new RangeError('Division by zero');
      }
      return aNum / bNum;
    default:
      // Should be unreachable due to earlier validation
      /* istanbul ignore next */
      throw new TypeError(`Unsupported operator: ${op}`);
  }
}

function coerceNumber(value, name) {
  const num = typeof value === 'string' ? Number(value) : value;
  if (typeof num !== 'number' || !Number.isFinite(num)) {
    throw new TypeError(`Invalid ${name} operand: ${value}`);
  }
  return num;
}

module.exports = { calculate };
