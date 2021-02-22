const mongoose = require('mongoose');

const CategorySchema = require('../Schemas/CategorySchema');


const CategorytModel = mongoose.model('Category', CategorySchema);



module.exports = CategorytModel;