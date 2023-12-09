class Transaction {
    constructor(userEmail, dateOfTransaction, amount) {
        this.userEmail = String(userEmail);
        this.dateOfTransaction = new Date(dateOfTransaction);
        this.amount = Number(amount);
    }

    isValid() {
        const isValidEmail = /\S+@\S+\.\S+/.test(this.userEmail);
        const isValidDate = !isNaN(this.dateOfTransaction.getTime());
        const isValidAmount = !isNaN(this.amount);

        return isValidEmail && isValidDate && isValidAmount;
    }
}

module.exports = Transaction;
