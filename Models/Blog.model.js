const mongoose=require('mongoose');

const schema=mongoose.Schema({
    creator:{
        type:String,
        required:true,
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
module.exports=mongoose.model("Blog",schema);