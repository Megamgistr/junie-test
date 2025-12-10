const assert = require('assert');
const { helloWorld, printHi } = require('../src/hello');

// Test: helloWorld returns expected string
assert.strictEqual(helloWorld(), 'Hello, world!');

// Test: printHi prints and returns "Hi!"
const originalLog = console.log;
const logs = [];
console.log = (msg) => logs.push(String(msg));
let returned;
try {
  returned = printHi();
} finally {
  console.log = originalLog;
}

assert.strictEqual(returned, 'Hi!');
assert.deepStrictEqual(logs, ['Hi!']);

console.log('All tests passed.');
