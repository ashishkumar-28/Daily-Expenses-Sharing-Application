const db = require('../models');
const Expense = db.Expense;
const User = db.User;

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, splitMethod, participants } = req.body;

    if (!description || !amount || !splitMethod || !participants) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    if (!['equal', 'exact', 'percentage'].includes(splitMethod)) {
      return res.status(400).send({ message: 'Invalid split method' });
    }

    for (const participant of participants) {
      const user = await User.findByPk(participant.userId);
      if (!user) {
        return res.status(400).send({ message: `User with ID ${participant.userId} not found` });
      }
    }

    let totalPercentage = 0;
    participants.forEach(participant => {
      if (splitMethod === 'percentage') {
        totalPercentage += participant.percentage;
      }
    });

    if (splitMethod === 'percentage' && totalPercentage !== 100) {
      return res.status(400).send({ message: 'Percentages must add up to 100%' });
    }

    const expense = await Expense.create({ description, amount, splitMethod });

    for (const participant of participants) {
      await expense.addUser(participant.userId, {
        through: { amount: participant.amount, percentage: participant.percentage || null }
      });
    }

    
    const expenseWithParticipants = await Expense.findByPk(expense.id, {
      include: [{ model: User, through: { attributes: ['amount', 'percentage'] } }]
    });

    res.status(201).send(expenseWithParticipants);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await db.Expense.findByPk(id, {
      include: [
        {
          model: db.User,
          through: { attributes: ['amount', 'percentage'] } 
        }
      ]
    });

    if (!expense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
