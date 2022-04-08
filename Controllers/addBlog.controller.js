const Blog =require("../Models/Blog.model");

const addBlog=async (req,res)=>{
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
module.exports=addBlog;