const User = require("../models/User");
const argon2 = require('argon2');

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, user not created");
  }
};

module.exports.login_post = (req, res) => {
  const { email, password } = req.body;

  console.log(email.password);
  res.send("user login");
};
