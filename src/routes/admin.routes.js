const express = require("express");
const {
  signup,
  getAllAdmins,
  login,
  verifyToken,
  requestAndSendOTP,
  verifyOtp,
} = require("../controllers/admin.controllers");

const adminRouter = express.Router();

//API to create admin signup
adminRouter.post("/admin/signup", signup);

//API to login
adminRouter.post("/admin/login", login);

//API to get all admins
adminRouter.get("/admins", verifyToken, getAllAdmins);

//API to request OTP by admins
adminRouter.get("/admin/request/OTP", verifyToken, requestAndSendOTP);

//API to verify OTP
adminRouter.post("/admin/verify/OTP", verifyToken, verifyOtp);

module.exports = adminRouter;
