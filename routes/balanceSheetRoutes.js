const express = require('express');
const router = express.Router();
const balanceSheetController = require('../controllers/balanceSheetController');


router.get('/balance-sheet', balanceSheetController.generateBalanceSheet);

module.exports = router;
