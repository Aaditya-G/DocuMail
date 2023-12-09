const PDFDocument = require('pdfkit');
const moment = require('moment'); // for date formatting

exports.generatePdf = async (transactions) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });




    // Helper function to add header
    const addHeader = (email) => {
      doc.fontSize(20)
        .font('Helvetica-Bold') 
        .text('Zywa', { align: 'center' })
        .fontSize(16)
        .font('Helvetica') 
        .text('Contact Details: zywa@test.test', { align: 'center' })
        .fontSize(12)
        .font('Helvetica') 
        .text(`Transactions for user: ${email}`, 50, doc.y + 20)
        
        .moveDown(2);
    };

    const drawLine = (y) => {
      doc.strokeColor("#aaaaaa")
         .lineWidth(1)
         .moveTo(50, y)
         .lineTo(550, y)
         .stroke();
    };

   

   
    addHeader(transactions[0].email); 

    
    doc.fontSize(10)
       .text('Date of Transaction', 50, doc.y,{ continued: true })
       .text('Amount', 430, doc.y)
       .moveDown(2);


   
    transactions.forEach((transaction, index) => {
      if (index % 20 === 0 && index !== 0) {
        doc.addPage();
        addHeader(transaction.email);
      }

      let formattedDate = moment(transaction.date_of_transaction).format('DD-MM-YYYY HH:mm');

      // Add transaction data in a row
      doc.fontSize(10)
         .text(formattedDate, 50, doc.y, {continued: true})
         .text(transaction.amount.toString(), 450, doc.y)
         .moveDown(1);

      drawLine(doc.y -10); // Draw line after each transaction
    });

    // Finalize the PDF and end the stream
    doc.end();
  });
};
