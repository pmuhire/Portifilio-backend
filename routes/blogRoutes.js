const express=require("express");
const router=express.Router();
const addBlog=require("../Controllers/addBlog.controller")

router.post("/blog",addBlog);

module.exports=router;