const transactionFinder = require("./getTransactions");
const pdfGenerator = require("./pdfGenerator");
const emailService = require("./emailService");

exports.handleTransactionPdfGeneration = async (email, startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error("Missing required start date and end Date in body");
  }

  if (!email) {
    throw new Error("Missing required user-email in header");
  }

  if (typeof startDate !== "object" || typeof endDate !== "object") {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  }

  const transactions = await transactionFinder.getTransactions(
    email,
    startDate,
    endDate
  );

  if (transactions.length) {
    const pdfBuffer = await pdfGenerator.generatePdf(transactions);

    const message = emailService.sendEmail(
      email,
      pdfBuffer,
      startDate,
      endDate
    );

    return message;
  } else {
    const message = "No transactions found for this user";
    return message;
  }
};
