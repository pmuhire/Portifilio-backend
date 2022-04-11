const express=require("express");
const router=express.Router();

const {userSignup,getUser,getUsers,deleteUser,editUser}=require("../Controllers/User.controller");

router.post("/user",userSignup);
router.get("/users",getUsers);
router.get("/users/:id",getUser);
router.delete("/users/:id",deleteUser);
router.patch("/users/:id",editUser);

// BLOG ROUTES
const {
    addBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    editBlog,
  } = require("../Controllers/Blogs.controller");
  
  router.post("/blog", addBlog);
  router.get("/blogs", getBlogs);
  router.get("/blogs/:id", getBlog);
  router.delete("/blogs/:id", deleteBlog);
  router.patch("/blogs/:id", editBlog);

  const {auth}=require("../Controllers/auth.controller")
  router.post("/login",auth);
module.exports=router;