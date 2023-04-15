const bcrypt = require("bcrypt");

// to encrypt the password n number of times
const generateSalt = () => {
  const salt = bcrypt.genSaltSync(8);
  return salt;
};

// to hash the password
const hashPassword = (password, salt) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

// to decode and compare the password
const decodePassword = (plainPassword, hashPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashPassword);
  return result;
};
module.exports = { hashPassword, generateSalt, decodePassword };
