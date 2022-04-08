const User =require("../Models/User");

const getUser=async(req,res)=>{
    const user = await Blog.find({id: req.params.id});
    return res.send(user)
}

module.exports=getUser;