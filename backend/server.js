const express = require("express");
const passport = require("passport");
const cookie = require("cookie-parser");
const app = express();

const strategy = require("./middleware/jwtStrategy");
const mongoose = require("mongoose");
const User = require("./Models/UserModel");
const Event = require("./Models/EventModel");
const Register = require("./Models/UserModel");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require('express-fileupload'); 


dotenv.config();

app.get("/", (request, response) => {
  response.send({ msg: "welcome to Event Manager App" });
});

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookie());
passport.use(strategy);
app.use(passport.initialize());

app.use("/contact", require("./Routes/ContactRoute"));
app.use("/category", require("./Routes/CategoryRoute"));
app.use("/user", require("./Routes/UserRoute"));
app.use("/event", require("./Routes/EventRoute"));
app.use("/admin", require("./Routes/AdminRoute"));
app.use("/search", require("./Routes/SearchRoute"));
app.use(fileUpload())

// connect to mongodb

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB is connected 😎");
  })
  .catch((err) => {
    console.log(err);
  });
  app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
  });




