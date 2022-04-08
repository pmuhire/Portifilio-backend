const Blog =require("../Models/Blog.model");
const editBlog=async (req,res)=>{
    try {
        const blog = await Blog.findOne({ _id: req.params.id })
    
        if (req.body.title) {
            blog.title = req.body.title
        }
    
        if (req.body.content) {
            blog.content = req.body.content
        }
    
        await blog.save()
        res.send(blog)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}

module.exports=editBlog;