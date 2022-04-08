const express=require("express");
const router=express.Router();

const addBlog=require("../Controllers/addBlog.controller");
const deleteBlog = require("../Controllers/deleteBlog.controller");
const editBlog = require("../Controllers/editBlog.controller");
const getBlog = require("../Controllers/getBlog.controller");
const  getBlogs=require("../Controllers/getBlogs.controller");

router.post("/blog",addBlog);
router.get("/blogs",getBlogs);
router.get("/blogs/:id",getBlog);
router.delete("/blogs/:id",deleteBlog);
router.patch("/blogs/:id",editBlog);

module.exports=router;