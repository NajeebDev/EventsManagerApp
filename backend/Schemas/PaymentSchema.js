const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({

    type: { type: String, required: true },
    holdr_name: { type: String, required: true },
    number: { type: Number, required: true },
    expire_month: { type: Number, required: true },
    expire_year: { type: Number, required: true },
    Date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
});

module.exports = PaymentSchema;