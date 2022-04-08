const Blog=require("../Models/Blog.model")

const deleteBlog=async(req,res)=>{
    try {
        console.log(req.params.id);
        const blog= await Blog.findByIdAndRemove({ _id: req.params.id })
        console.log(blog);
        res.status(204).send(blog);
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}
module.exports=deleteBlog;