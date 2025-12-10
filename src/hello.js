// Simple "Hello, World!" feature for Issue #5

function helloWorld(name = 'World') {
  // Normalize name: treat null/undefined/blank as default
  const normalized = String(name ?? '').trim();
  if (!normalized) return 'Hello, World!';
  return `Hello, ${normalized}!`;
}

module.exports = { helloWorld };
