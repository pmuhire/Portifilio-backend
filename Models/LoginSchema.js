const mongoose =require('mongoose');
require('mongoose-type-email');

const loginSchema=new mongoose.Schema({
    email:{
        type:mongoose.SchemaTypes.Email,
        required:true,
    },
    password:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("LoginSchema",loginSchema);