const Blog=require('../Models/Blog.model');

const getBlogs=async (req,res)=>{
    console.log(req.body);
    const blogs=await Blog.find();
    res.send(blogs);
}
module.exports=getBlogs;
