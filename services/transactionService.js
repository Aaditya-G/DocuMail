const transactionFinder = require("./getTransactions");
const pdfGenerator = require("./pdfGenerator");
const emailService = require("./emailService");

exports.handleTransactionPdfGeneration = async (email, startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error("Missing required start date and end Date in body");
  }

  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  if (!dateFormat.test(startDate) || !dateFormat.test(endDate)) {
    throw new Error(
      "Invalid format for start date or end date. Required format: 'YYYY-MM-DDTHH:mm:ss.sssZ'"
    );
  }

  if (!email) {
    throw new Error("Missing required user-email in header");
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
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
