const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

exports.getTransactions = (email, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        const transactions = [];
        const filePath = path.join(__dirname, '../data/dummy_transactions_v2.csv');
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                let date = new Date(row.date_of_transaction);
                if (row.email === email 
                    && date >= startDate && date <= endDate
                    ) {
                    transactions.push(row);
                }
            })
            .on('end', () => {
                resolve(transactions);
            })
            .on('error', (error) => {
                reject(error);
            });

    });
};
