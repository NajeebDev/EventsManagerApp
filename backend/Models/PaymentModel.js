const mongoose = require('mongoose');
const PaymentSchema = require('../Schemas/PaymentSchema');

const PaymenttModel = mongoose.model('Payment', PaymentSchema);



module.exports = PaymenttModel;