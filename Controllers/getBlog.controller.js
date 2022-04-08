const Blog =require("../Models/Blog.model");

const getBlog=async(req,res)=>{
    const blog = await Blog.find({_id: req.params.id});
    return res.send(blog)
}

module.exports=getBlog;