const Blog =require("../Models/Blog.model");

// ADD A BLOG
exports.addBlog=async (req,res)=>{
    // console.log(req.userId);
    const {title,content,imageUrl,enableComments,tags,metaTitle}=req.body
    const err={};
    if(!title||title.trim().length===0){
         err.title="Enter title";
    }
    if(!content||content.trim().length===0){
        err.title="Enter the content to post";
    }
    if(!imageUrl||imageUrl.trim().length===0){
        err.title="Enter a cover Image";
   }
   if(tags.length<=2){
       err.tags="Enter atleast three tags";
   }
   if(Object.keys(err).length){
    return res.status(422).json({err});
   }
   try{
        const blog=await Blog.findOne({title});
        if(blog) res.status(400).json({error:"Change title"})
        const registerBlog=new Blog({
            title:title,
            content:content,
            imageUrl:imageUrl,
            creator:req.userId,
            tags:tags,
            metaTitle:metaTitle,
            enableComments:enableComments
        })
        await registerBlog.save();
    res.send(registerBlog);
   }catch(err){
        // console.log(err);
        return res.json({err:"Something went wrong"})
   }
}

// GET ALL BLOGS
exports.getBlogs=async (req,res)=>{
    const blogs=await Blog.find();
    res.send(blogs);
}

// GET A BLOG
exports.getBlog=async(req,res)=>{
    const blog = await Blog.find({_id: req.params.id});
    return res.send(blog)
}

// EDIT BLOG
exports.editBlog=async (req,res)=>{
    try {
        const blog = await Blog.findByIdAndUpdate({ _id: req.params.id })
    
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

// DELETE A BLOG

exports.deleteBlog=async(req,res)=>{
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