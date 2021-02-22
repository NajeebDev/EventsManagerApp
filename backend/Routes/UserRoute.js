const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const restrictTo = require("../middleware/restrictTo");
const User = require("../Models/UserModel");
const router = express.Router();
const nodemailer = require("nodemailer");
const sendEmail = require("../Utilities/sendEmail");
const { response } = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

//register
router.post("/register", async (request, response) => {
  const { userName, firstName, lastName, email, password } = request.body;

  try {
    const data = await User.findOne({ email });
    if (data) {
      return response.status(400).json({ msg: "User already exist" });
    }
    const user = new User({
      userName,
      firstName,
      lastName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log(user.password);
    await user.save();

    const payload = {
      id: user.id,
      iat: Date.now(),
      exp: Date.now() + 60000,
    };
    jwt.sign(payload, process.env.SECRET, (error, token) => {
      if (error) throw error;
      response.json({ token });
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ msg: "Server error" });
  }
});

// end of register

//login signin public
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  let data = await User.findOne({ email });
  if (!data) {
    return response.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMatch) {
    return response.status(400).json({ msg: "Invalid Credentials" });
  }

  // token
  const payload = {
    id: data.id,
    iat: Date.now(),
    exp: Date.now() + 600000,
  };
  try {
    jwt.sign(payload, process.env.SECRET, (error, token) => {
      if (error) throw error;

      return response
        .cookie("jwt", token, {
          httpOnly: true,

          sameSite: "lax",
        })
        .send(data.id);
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
});

// end of of signin

// Profile
router.get("/profile", authenticate, async (request, response) => {
  console.log("this is test request.id", request.user._id);

  try {
    const user = await User.findById(request.user._id).select("-password");
    if (!user) {
      return response.status(500).json({ msg: "Server error" });
    }
    response.json({ user });
  } catch (error) {
    response.status(500).json({ msg: "Server error" });
  }
});

router.post("/profileUpdate", authenticate, async (request, response) => {
  const userId = request.user._id;

  const {
    userName,
    firstName,
    lastName,
    email,
    age,
    place,
    hometown,
    gender,
    language,
    yourInterests,
    others,
  } = request.body;
  console.log(request.files);
  console.log("this is test request.id", request.user._id);

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return response.status(500).json({ msg: "Server error" });
  }
  if (request.files === null) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.place = place;
    user.hometown = hometown;
    user.gender = gender;
    user.language = language;
    user.yourInterests = yourInterests;
    user.others = others;

    user.save();
    // photo.save()
    return response.json({ msg: ` you updated your data `, user });
  }
  const file = request.files.file;
  const newPath = `${Date.now()}-${file.name}`;
  file.mv(`${__dirname}/../../frontend/public/uploads/${newPath}`, (err) => {
    if (err) {
      console.log(err);
      return response.status(500).send(err);
    }
    user.photo = newPath;
    user.userName = userName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.place = place;
    user.hometown = hometown;
    user.gender = gender;
    user.language = language;
    user.yourInterests = yourInterests;
    user.others = others;

    user.save();
    response.json({
      fileName: newPath,
      filePath: `/uploads/${newPath}`,
      msg: ` you updated your data `,
      user,
    });
  });
});

// end of profile

//Delete Account
router.delete("/deleteAccount/:id", authenticate, async (request, response) => {
  console.log("This is request.id tessst", request.params.id);
  try {
    const user = await User.findByIdAndDelete({ _id: request.params.id });

    if (request.params.id) {
      return response.status(200).json({ msg: "User deleted" });
    }
    response.json({ msg: "Error" });
  } catch (error) {
    console.log(error);
  }
});

// Get user/adminboard

router.get(
  "/",
  authenticate,
  restrictTo("supervisor", "admin"),
  async (request, response) => {
    console.log("This is request.id", request.id);
    try {
      const user = await User.findById(request.id).select("-password");
      if (!user) {
        return response.status(500).json({ msg: "Server error" });
      }
      response.json({
        msg: `Welcome back ${user.userName} You are logged in as ${request.user.role}`,
      });
    } catch (error) {
      response.status(500).json({ msg: "Server error" });
    }
  }
);

// Forgot password/reset password

router.post("/forgotPassword", async (request, response) => {
  console.log(request.body);
  const { email } = request.body;
  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).json({ msg: "User email is not exist" });
  }
  const payload = {
    id: user.id,
    iat: Date.now(),
  };
  const token = jwt.sign(payload, process.env.RESETPASSWORD_SECRET, {
    expiresIn: "60m",
  });
  console.log(token);
  user.passwordResetToken = token;
  user.passwordChangedAt = Date.now() + 1 * 60 * 60 * 1000; //(1 * 60 * 1000)
  user.save();
  const resetUrl = `http://localhost:3000/resetPassword/${token}`;
  const message = `Forgot your password? Click on the link and submit your new password and password confirmation to ${resetUrl} \n \n If you did not reset your password. Kindly ignore this email`;

  try {
    await sendEmail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      email: user.email,
      subject: "Your password reset link is valid for 60 minutes",
      text: message,
    });
    response
      .status(200)
      .json({ msg: "You have received email to change your password." });
  } catch (error) {
    console.log(error);
  }
});

router.post("/resetPassword/:token", async (request, response) => {
  console.log(request.body);
  const token = request.params.token;

  const user = await User.findOne({
    passwordResetToken: request.params.token,
    passwordChangedAt: { $gt: Date.now() },
  });
  if (!user) {
    return response
      .status(500)
      .json({ msg: "Token is invalid or already expired" });
  } else {
    response.send(`You may reset your Password`);
  }
});

router.get("/newPassword/:token", async (request, response) => {
  const token = request.params.token;
  const data = await User.findOne({ passwordResetToken: token });
  if (!data) {
    return response
      .status(400)
      .json({ msg: "Token is invalid or already expired" });
  }
  response.status(200).json({ msg: "enter new password" });
});

router.post("/newPassword", async (request, response) => {
  const { password, token } = request.body;
  try {
    const data = await User.findOne({ passwordResetToken: token });
    console.log(data);
    if (!data) {
      return response
        .status(400)
        .json({ msg: "Token is invalid or already expired" });
    }
    
    console.log("pass", password);
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(password, salt);
    data.passwordResetToken = "";
    console.log("data after save", data);
    await data.save();

    return response.status(200).json({ msg: "Password Resetted successfully" });
  } catch (error) {
    response.status(500).json({ msg: "Error with resetting password" });
  }
});

module.exports = router;
