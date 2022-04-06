const Blog =require("../Models/Blog.model");

const addBlog=async (req,res)=>{
    // console.log(req.userId);
    const {title,content,imageUrl}=req.body
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
            creator:req.userId
        })
        await registerBlog.save();
    res.send(registerBlog);
   }catch(err){
        console.log(err);
        return res.status(500).json({error:"Something went wrong"})
   }
}
module.exports=addBlog;