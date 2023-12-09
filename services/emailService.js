const nodemailer = require("nodemailer");
const moment = require("moment");

exports.sendEmail = async (recipientEmail, pdfBuffer, startDate, endDate) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    startDate = moment(startDate).format("YYYY-MM-DD");
    endDate = moment(endDate).format("YYYY-MM-DD");

    let mailOptions = {
      from: `"${process.env.NAME}" <${process.env.EMAIL}>`,
      to: recipientEmail,
      subject: `Your Transactions`,
      text: `Please find attached your Transactions between ${startDate} and ${endDate}.`,
      html: `<b>Please find attached your Transactions between ${startDate} and ${endDate}.</b>`,
      attachments: [
        {
          filename: `Transactions-${startDate}-${endDate}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Send mail with defined transport object
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(`Email sent: ${info.response}`);
      });
    });
  } catch (error) {
    return error.message;
  }
};
