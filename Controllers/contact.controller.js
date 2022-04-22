const Contact=require("../Models/Contact.model");

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
    console.log(req);
}