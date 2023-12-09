const express = require('express');
const router = express.Router();
const generateTransactionPdf = require('../controllers/transactionController');

router.post('/', (req, res) => {
    generateTransactionPdf.generateTransactionPdf(req, res);
});

module.exports = router;