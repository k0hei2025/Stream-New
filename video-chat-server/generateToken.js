const jsonwebtoken = require("jsonwebtoken");

const generateToken = (user) => {
  return jsonwebtoken.sign({ user }, "12345678", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
