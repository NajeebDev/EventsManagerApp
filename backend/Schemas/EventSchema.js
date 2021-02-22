const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({

    event_name: { type: String, required: true },
    event_photo: { type: String, default: 'https://onlinecourses.one/wp-content/uploads/2019/08/best-object-oriented-programming-oop-course-class-certification-training-online-768x512.jpg' },

    category_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    description: { type: String },
    dateEventcreated: { type: Date, default: Date.now() },
    location: { type: String },
    language: { type: String },
    member: { type: Number },

    eventtype: { type: String, enum: ["Online", "Present"], default: "Online" },

    dateEventstarted: { type: Date },

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

})


module.exports = EventSchema