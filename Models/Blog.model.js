const {Schema,model}=require('mongoose');

const schema=Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
})
module.exports=model("Blog",schema);