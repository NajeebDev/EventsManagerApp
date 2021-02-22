const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: { type: String, Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, Number, required: true },
  password: { type: String, Number, required: true },
 

  age: { type: Number },

  photo: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg" },


  place: { type: [String] },
  hometown: { type: [String] },
  language: { type: [String] },
  yourInterests: { type: [String] },
  others: { type: [String] },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpire: String,

  attendEvents: [   
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    },
  ],

  savedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    },
  ],

});

module.exports = UserSchema;
