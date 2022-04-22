const jwt = require("jsonwebtoken");
require("dotenv").config();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const  User = require("../Models/User");

exports.auth = async (req, res) => {
  const { error } = validate(req.body);
  const email=req.body.email;
  if (error) return res.send(error.details[0].message).status(400);
  
  await User.findOne({ email: email}).then(async (user) => {
    if (!user) return res.send("Invalid email ").status(400);

    await bcrypt
      .compare(req.body.password, user.password)
      .then((validPassword) => {
        if (!validPassword)
          return res.send("Invalid email or password").status(400);
      });
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        password: user.password,
      },
      process.env.jwtPrivateKey
    );
    res.status(200).send({
      authToken: token,
    });
    console.log(token);
  });
};
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().max(255).min(3).required().email(),
    password: Joi.string().max(255).min(3).required(),
  });
  return schema.validate(req);
}
