/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const expenditures = [];

  transactions.forEach((transaction) => {
    const {category, price} = transaction;

    const existingExpenditure = expenditures.find((expenditure) => expenditure.category === category);
    if(existingExpenditure) {
      existingExpenditure.totalSpent += price;
    } else {
      expenditures.push({ category, totalSpent: price,});
    }

  });
  return expenditures;
}

module.exports = calculateTotalSpentByCategory;
