const express=require("express");
const router=express.Router();
const addBlog=require("../Controllers/addBlog.controller");
const  getBlogs=require("../Controllers/getBlogs.controller");

router.post("/blog",addBlog);
router.get("/blogs",getBlogs);

module.exports=router;