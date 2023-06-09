const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const AdminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    duplicate: false,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
