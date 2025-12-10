#!/usr/bin/env node
/* Minimal test runner for this repo.
 * Usage: node tests/run-tests.js
 */

const fs = require('fs');
const path = require('path');

let tests = [];
let failed = 0;
let passed = 0;

// Expose a global test() registration function
global.test = (name, fn) => {
  tests.push({ name, fn });
};

function color(text, code) {
  return `\u001b[${code}m${text}\u001b[0m`;
}

function logPass(name) {
  console.log(`${color('✔', '32')} ${name}`);
}

function logFail(name, err) {
  console.error(`${color('✖', '31')} ${name}`);
  if (err && err.stack) {
    console.error(color(err.stack, '90'));
  } else if (err) {
    console.error(color(String(err), '90'));
  }
}

// Load all *.test.js files from tests directory
const testsDir = __dirname;
const testFiles = fs
  .readdirSync(testsDir)
  .filter((f) => f.endsWith('.test.js'))
  .map((f) => path.join(testsDir, f));

for (const file of testFiles) {
  require(file);
}

(async () => {
  for (const { name, fn } of tests) {
    try {
      // Support async tests as well
      await fn();
      passed++;
      logPass(name);
    } catch (err) {
      failed++;
      logFail(name, err);
    }
  }

  const summary = `${passed} passed, ${failed} failed`;
  if (failed > 0) {
    console.error(color(`\nTest run failed: ${summary}`, '31'));
    process.exit(1);
  } else {
    console.log(color(`\nAll tests passed: ${summary}`, '32'));
  }
})();
