const mongoose=require("mongoose");

const EventSchema=require("../Schemas/EventSchema")

const EventModel=mongoose.model("Events",EventSchema);

module.exports = EventModel;

