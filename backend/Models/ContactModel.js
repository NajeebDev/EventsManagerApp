const mongoose = require('mongoose');
const ContactSchema = require('../Schemas/ContactSchema');

const ContactModel = mongoose.model('Contact', ContactSchema);



module.exports = ContactModel;