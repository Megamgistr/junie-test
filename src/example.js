// Sample code for testing code review workflow

function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Function with potential issues for testing
function processUser(user) {
  // Missing input validation
  const result = eval(user.input); // Security issue: eval usage

  // N+1 query problem
  for (const item of user.items) {
    database.query(`SELECT * FROM products WHERE id = ${item.id}`); // SQL injection risk
  }

  return result;
}

// Function to calculate discount with edge cases
function applyDiscount(price, discount) {
  // Missing validation for negative values
  // No check for discount > 100%
  var finalPrice = price - (price * discount / 100); // Using var instead of const/let
  return finalPrice;
}

module.exports = { calculateTotal, processUser, applyDiscount };
