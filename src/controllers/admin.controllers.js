const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const accountSid = process.env.accountSid;

const authToken = process.env.authToken;

const {
  generateSalt,
  hashPassword,
  decodePassword,
} = require("../services/password");

const signup = async (req, res) => {
  try {
    const users = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
    };

    const salt = generateSalt();
    users.password = hashPassword(req.body.password, salt);

    const user = await Admin.create(users);
    res.json({ message: user });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const users = await Admin.find();
    res.json({ message: users });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    // This line checks the email is correct or not
    const checkUser = await Admin.findOne({ email: req.body.email });
    if (checkUser) {
      //This line checks the given password is as same as hashedPassword
      const checkPassword = decodePassword(
        req.body.password,
        checkUser.password
      );
      if (checkPassword) {
        const email = checkUser.email;

        // creating Json Web Token

        // this jwt.sign acquires 3 parameters (1). Unique identifier - i used email, (2). secret key (3). expiry period
        const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "5d" }); // "d" - days
        res.json({ message: "You are Logged in", Token: token });
      } else {
        res.json({ message: "Incorrect Password" });
      }
    } else {
      res.json({ message: "User/email Id not found" });
    }
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

// to verify token and to give authentication  (middleware)
const verifyToken = async (req, res, next) => {
  const token = req.get("Authorization");
  if (token) {
    // to verify token
    const toVerifyToken = await jwt.verify(token.split(" ")[1], JWT_SECRET_KEY);
    if (toVerifyToken) {
      req.email = toVerifyToken.email; // to know which user is requesting for OTP
      next();
    } else {
      res.json({ message: "UnAuthorised User" });
    }
  } else {
    res.json({ message: "Invalid Token" });
  }
};

// to request and send OTP
const requestAndSendOTP = async (req, res) => {
  const checkUser = await Admin.findOne({ email: req.email });
  // console.log(checkUser);

  // creating OTP by basic javascript code
  const generateOtp = Math.floor(10000 + Math.random() * 900000);
  checkUser.otp = generateOtp;
  await checkUser.save();

  //using twilio to send the OTP to admins

  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${generateOtp}`,
    from: "+15074488922",
    to: "+919500644238",
  });
  // console.log(checkUser);
  res.json({ message: "OTP Sent to your Registered mobile number" });
};

const verifyOtp = async (req, res) => {
  const checkUser = await Admin.findOne({ email: req.email });

  if (checkUser) {
    //to check the user's given OTP and the OTP in the Database are same or not
    if (checkUser.otp == req.body.otp) {
      checkUser.verified = true;
      await checkUser.save();
      res.json({ message: "Your OTP is correct" });
    } else {
      res.json({ message: "Your OTP is wrong" });
    }
  } else {
    res.json({ message: "Invalid User" });
  }
};

module.exports = {
  signup,
  getAllAdmins,
  login,
  verifyToken,
  requestAndSendOTP,
  verifyOtp,
};
