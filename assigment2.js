function withdraw(person, amount) {
    if (amount > person.balance) {
      console.log("Withdrawal cannot be processed due to insufficient funds.");
    } else {
      person.balance -= amount;
      console.log(`Withdrawal of ${amount} successful. New balance: ${person.balance}`);
    }
  }
  
  // Example usage:
  const person = { balance: 1000 };
  console.log(`Initial balance: ${person.balance}`);
  
  withdraw(person, 500);
  console.log(`Balance after withdrawal: ${person.balance}`);
  
  withdraw(person, 600); // This should print an error message
  console.log(`Balance after second withdrawal: ${person.balance}`);