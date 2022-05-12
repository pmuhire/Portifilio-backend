const {  boolean } = require('joi');
const mongoose =require('mongoose');
require('mongoose-type-email');

const userSchema= new mongoose.Schema({
    fullNames:{
        type: String,
        required:true,
        maxlength: 100,
        minlength: 6
    },
    userName:{
        type: String,
        required:true,
        maxlength: 100,
        minlength: 6,
        unique:true
    },
    email:{
        type:mongoose.SchemaTypes.Email,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    }

})
module.exports=mongoose.model("User",userSchema);