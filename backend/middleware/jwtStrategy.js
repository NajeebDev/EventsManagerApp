const User = require("../Models/UserModel");
const { Strategy } = require("passport-jwt");

const strategy = new Strategy( 
  
  {
    jwtFromRequest: (request) => {
      console.log(12313, request.cookies.jwt);
      return request.cookies.jwt;
    },
    secretOrKey: "eventsmanager",
  },
  async (payload, done) => {
    console.log(payload);
    const user = await User.findById(payload.id);

    if (user) {
      console.log("user exist");
      done(null, user);
    } else {
      done("User not found", false);
    }
  }
);

module.exports = strategy;

