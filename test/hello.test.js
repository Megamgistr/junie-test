const assert = require('assert');
const { helloWorld } = require('../src/hello');

// Simple test runner wrapper
function run(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(err && err.stack || err);
    process.exitCode = 1;
  }
}

run('helloWorld returns "Hello, world!"', () => {
  assert.strictEqual(helloWorld(), 'Hello, world!');
});
