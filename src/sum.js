// Summing function for calculating the sum of numbers

function sum(a, b) {
  return a + b;
}

function sumArray(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

function sumAll(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

module.exports = { sum, sumArray, sumAll };
