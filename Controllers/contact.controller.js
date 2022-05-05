const Joi = require("joi");
const Contact=require("../Models/Contact.model");
const User=require("../Models/User")
const nodemailer = require("nodemailer");

exports.getMessages=async(req,res)=>{
    const messages=await Contact.find();
    return res.send(messages);
}
exports.getMessage=async(req,res)=>{
    console.log(req.params.id);
    const message = await Contact.findById(req.params.id);
    return res.send(message)
}
exports.deleteMessage=async(req,res)=>{
    try {
        const message=await Contact.findByIdAndRemove({ _id: req.params.id })
        return res.status(204).send(message);
    } catch {
        res.status(404).send({ error: "Message doesn't exist!" })
    }
}
exports.postMessage=async(req,res)=>{
    let {names,phone,email,message}=req.body;
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message).status(400);

    await User.findOne({ email: email}).then(async (user) => {
        if (!user) {
            return res.send("First signup ").status(400);
        }
        try{
             const newMessage=new Contact({
                names:names,
                phone:phone,
                email:email,
                message:message
             })
            await newMessage.save();
            mainMail(names,email,message);
            
          res.send(newMessage);
        }catch(err){
            console.log(err);
            return res.status(500).json({error:"Something went wrong"})
        }
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
async function mainMail(name, email, message) {
    const transporter = await nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.email,
            pass: process.env.secret
        },
    });
    const mailOption = {
        from: email,
        to: process.env.email,
        subject:"Message from User",
        html: `You got a message from 
            Email : ${email}
            Name: ${name}
            Message: ${message}`,
    };
    try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}
