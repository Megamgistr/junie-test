const assert = require('assert');
const { helloWorld } = require('../src/hello');

// Core behavior

test('helloWorld returns exact "Hello, World!"', () => {
  assert.strictEqual(helloWorld(), 'Hello, World!');
});

// Type/format checks

test('helloWorld returns a string', () => {
  const result = helloWorld();
  assert.strictEqual(typeof result, 'string');
  assert.ok(result.length > 0, 'result should not be empty');
});
