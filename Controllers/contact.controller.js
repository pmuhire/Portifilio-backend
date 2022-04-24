const Joi = require("joi");
const Contact=require("../Models/Contact.model");
const User=require("../Models/User")
const mailer=require("../services/email");


exports.getMessages=async(req,res)=>{
     res.redirect("/api/users");
}
exports.getMessage=async(req,res)=>{
    console.log(req);
}
exports.deleteMessage=async(req,res)=>{
    console.log(req);
}
exports.postMessage=async(req,res)=>{
    let {names,phone,email,message}=req.body;
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message).status(400);

    await User.findOne({ email: email}).then(async (user) => {
        if (!user) return res.send("First signup ").status(400);

        await mailer(email,)
    })
}
function validate(req) {
    const schema = Joi.object({
      email: Joi.string().max(255).min(3).required().email(),
      names: Joi.string().max(255).min(3).required(),
      phone:Joi.string().max(10).min(10).required(),
      message:Joi.string().max(1000).min(4).required()
    });
    return schema.validate(req);
}
