const {Schema,model}=require('mongoose');

const schema=Schema({
    tags:{
        type:Array,
        required:true
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
    comments: [{
        userId: {
            type: String
        },
        body: {
            image: String,
            text: {
              type: String,
              trim: true,
            },
          },
        date: {
            type: String,
            default: new Date().toLocaleDateString()
        }
      }]
})
module.exports=model("Blog",schema);