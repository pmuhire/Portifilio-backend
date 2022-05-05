const Blog =require("../Models/Blog.model");


// ADD A BLOG
exports.addBlog=async (req,res)=>{
    const {title,content,imageUrl,tags,description}=req.body
    const err={};
    if(!title||title.trim().length===0){
         err.title="Enter title";
    }
    if(!content||content.trim().length===0){
        err.content="Enter the content to Blog";
    }
    if(!description||description.trim().length===0){
        err.description="Enter the description";
    }
    if(!imageUrl||imageUrl.trim().length===0){
        err.coverImage="Enter a cover Image";
   }
   if(tags.length<=2){
       err.tag="Enter atleast three tags";
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
            tags:tags,
            description: description
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
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        return res.send("Blog does not exist");
    }
    return res.send(blog)
}

// EDIT BLOG
exports.editBlog=async (req,res)=>{
    try {
        const blog = await Blog.findByIdAndUpdate({ _id: req.params.id })
        if(!blog){
            return res.send("Blog does not exist");
        }
    
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
        res.send({ error: "Blog doesn't exist!" })
    }
}

// DELETE A BLOG

exports.deleteBlog=async(req,res)=>{
    try {
        const blog= await Blog.findByIdAndRemove({ _id: req.params.id })
        if(!blog){
            return res.send("Blog does not exist");
        }
        res.status(204).send({status:"Deleted"});
    } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
    }
}

// ADD LIKE 
exports.likeDislikeBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId)
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
      }
  
      const index = blog.likes.indexOf(req.user._id);
      if (index !== -1) {
        blog.likes.splice(index, 1)
        await blog.save()
        res.status(200).json({ message: 'removed likes'})
        return;
      }
  
      blog.likes.push(req.user.user_id);
      await blog.save()
      return res.status(200).send({ message: 'add like'})
    } catch (err) {
      console.log(err)
      return res.status(500).send({error:"Something went wrong"})
    }
  }
//   COMMENT ON BLOG

exports.commentOnBlog = async(req,res)=>{
    const { text, image} = req.body;
    let body = {}
        if (image) {
            body.image = image
        }

        if (text) {
            body.text = text
        }
    const comment={
        userId: req.user._id,
        text: text,
        image: image
    }
    if (!text || (text.trim().length === 0 && !image)) {
        return res.status(422).send({ error: 'enter something or comment image' })
    }
    if(req.user.user_id){
        return res.status(422).send("First Login Or Sign up");
    }
    try {
        const blog = await Blog.find({ _id: req.params.id });
        if (blog) {
            await Blog.findOneAndUpdate({_id:req.params.id},{
                $push: {Comment: comment}
            })
            return res.send("Comment added successfully!");
        }
        return res.status(400).send({error: "Blog does not exist"});
    }catch(err){
        console.log(err);
    }
  }