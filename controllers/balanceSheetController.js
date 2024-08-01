const db = require('../models');
const { Parser } = require('json2csv');

exports.generateBalanceSheet = async (req, res) => {
  try {
    const expenses = await db.Expense.findAll({
      include: [
        {
          model: db.User,
          through: { attributes: ['amount', 'percentage'] },
        },
      ],
    });

    if (expenses.length === 0) {
      return res.status(404).send({ message: 'No expenses found' });
    }

    console.log('Fetched expenses:', JSON.stringify(expenses, null, 2));

    const balanceSheet = {};

    expenses.forEach(expense => {
      const totalParticipants = expense.Users.length;

      expense.Users.forEach(user => {
        if (!balanceSheet[user.id]) {
          balanceSheet[user.id] = {
            name: user.name,
            amountSpent: 0,
            amountOwed: 0,
          };
        }

        const participant = user.ExpenseParticipant;
        const userShare = participant ? participant.amount : 0;
        balanceSheet[user.id].amountSpent += userShare;

        console.log(`User ${user.name} spent: ${userShare}`);

        let amountOwed;
        switch (expense.splitMethod) {
          case 'equal':
            amountOwed = expense.amount / totalParticipants;
            break;
          case 'percentage':
            amountOwed = participant ? (expense.amount * participant.percentage) / 100 : 0;
            break;
          case 'exact':
            amountOwed = userShare;
            break;
          default:
            amountOwed = 0;
        }

        balanceSheet[user.id].amountOwed += amountOwed;

        console.log(`User ${user.name} owes: ${amountOwed}`);
      });
    });

    for (const userId in balanceSheet) {
      const user = balanceSheet[userId];
      user.balance = user.amountSpent - user.amountOwed;
      console.log(`User ${user.name} balance: ${user.balance}`);
    }

    console.log('Final Balance Sheet:', JSON.stringify(balanceSheet, null, 2));

    const parser = new Parser();
    const csv = parser.parse(Object.values(balanceSheet));

    res.header('Content-Type', 'text/csv');
    res.attachment('balance-sheet.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error generating balance sheet:', error);
    res.status(500).send({ message: error.message });
  }
};
