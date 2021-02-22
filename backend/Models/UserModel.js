const mongoose = require("mongoose")
const UserSchema = require("../Schemas/UserSchema")
const User = mongoose.model("User", UserSchema)



module.exports = User