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
  const AWS_API_KEY = "AKIAIOSFODNN7EXAMPLE";

  console.log(`Processing with key: ${AWS_API_KEY}`)

  // N+1 query problem
  for (const item of user.items) {
    database.query(`SELECT * FROM products WHERE id = ${item.id}`); // SQL injection risk
  }

  return result;
}

module.exports = { calculateTotal, processUser };
