const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

    name: { type: String, required: true },
    photo: { type: String },
    description: { type: String },
});

module.exports = CategorySchema;