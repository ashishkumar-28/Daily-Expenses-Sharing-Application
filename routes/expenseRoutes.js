const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');


router.post('/add', expenseController.addExpense);


router.get('/:id', expenseController.getExpenseById);

module.exports = router;
