const Blog=require("../Models/Blog.model")

const deleteBlog=async(req,res)=>{
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(204).send();
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}
module.exports=deleteBlog;