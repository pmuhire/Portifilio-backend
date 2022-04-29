const {Schema,model}=require('mongoose');

const schema=Schema({
    tags:{
        type:Array,
        required:true
    },
    enableComments:{
        type:Boolean,
        required:true
    },
    metaTitle:{
       type:String
    },
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
    description:{
        type:String,
        required:true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})
module.exports=model("Blog",schema);