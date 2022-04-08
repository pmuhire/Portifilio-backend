const {Schema,model}=require('mongoose');
require('mongoose-type-email');

const contactSchema=new Schema({
    names:{
        type:String,
        required:true
    },
    email:{
        type:mongoose.SchemaTypes.Email,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

module.exports=model("Contact",contactSchema);