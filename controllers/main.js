const jwt = require("jsonwebtoken");
// const CustomAPIError = require("../errors/custom-error");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  //normally we pass id and neve pass confidential info
  //just for demo, normally provided by db
  const id = new Date().getDate();
  //try to keep payload small
  const token = jwt.sign({ id, username }, process.env.JWT_Secret, {
    expiresIn: "30d",
  });
  //   res.send("Fake Login/Register/signup route");
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
