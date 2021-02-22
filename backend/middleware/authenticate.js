const passport = require("passport");
const jwt = require("jsonwebtoken")
const User = require("../Models/UserModel")


const authenticate = (request, response, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error) {
      response.status(401).send(error);
    }
    request.user = user;
    next();
  })(request, response, next);
};

module.exports = authenticate;


