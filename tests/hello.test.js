// Tests for the "Hello, World!" feature
// Using Node's built-in test runner (node:test)

const test = require('node:test');
const assert = require('node:assert/strict');

const { helloWorld } = require('../src/hello');

test('returns "Hello, World!" by default', () => {
  assert.equal(helloWorld(), 'Hello, World!');
});

test('greets a provided name', () => {
  assert.equal(helloWorld('Alice'), 'Hello, Alice!');
  assert.equal(helloWorld('Bob'), 'Hello, Bob!');
});

test('trims whitespace in the provided name', () => {
  assert.equal(helloWorld('  Alice  '), 'Hello, Alice!');
});

test('treats empty, whitespace, null, and undefined as default', () => {
  assert.equal(helloWorld(''), 'Hello, World!');
  assert.equal(helloWorld('   '), 'Hello, World!');
  assert.equal(helloWorld(null), 'Hello, World!');
  assert.equal(helloWorld(undefined), 'Hello, World!');
});
