const Tags=require('../Models/Tag.model');

exports.getTags=async (req,res)=>{
    const tags=await Tags.find();
    return res.send(tags);
}