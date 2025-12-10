// Simple Hello World module

function helloWorld() {
  return "Hello, world!";
}

function printHi() {
  const msg = "Hi!";
  // Print to stdout as requested and also return the message for easy testing
  console.log(msg);
  return msg;
}

module.exports = { helloWorld, printHi };