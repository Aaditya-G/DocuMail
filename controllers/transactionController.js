const transactionService = require("../services/transactionService");

exports.generateTransactionPdf = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const userEmail = req.headers["user-email"];

    const message = await transactionService.handleTransactionPdfGeneration(
      userEmail,
      startDate,
      endDate
    );

    res.status(200).send(`${message}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
