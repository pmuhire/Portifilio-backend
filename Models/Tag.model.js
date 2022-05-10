const mongoose =require('mongoose');

const tagsSchema=new mongoose.Schema({
    name:{
        type:"string",
        required:true
    }
})

module.exports=mongoose.model("Tags",tagsSchema);