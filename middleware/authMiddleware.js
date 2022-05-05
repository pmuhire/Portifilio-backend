const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.query.Authorization;
  if (!token) {
    return res.status(400).send("Access Denied! You need to login first or Sign up")
  }
  try {
    const TokenArray = token.split(" ")[1];
    jwt.verify(TokenArray, process.env.jwtPrivateKey, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send("Invalid Token")
      }
      else {
        req.user=decoded._id;
        next()
      }
    })
  }
  catch (ex) {
    return res.status(400).send(ex);
  }
}