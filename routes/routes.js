const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");

const {userSignup,getUser,getUsers,deleteUser,editUser}=require("../Controllers/User.controller");
router.post("/user",userSignup);
router.get("/users",authMiddleware,getUsers);
router.get("/users/test",authMiddleware,getUsers);
router.get("/users/:id",getUser);
router.delete("/users/delete/:id",authMiddleware,deleteUser);
router.patch("/users/update/:id",authMiddleware,editUser);

// BLOG ROUTES
const {
    addBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    editBlog,
  } = require("../Controllers/Blogs.controller");
  
  router.post("/blog",authMiddleware, addBlog);
  router.get("/blogs", getBlogs);
  router.get("/blogs/:id", getBlog);
  router.delete("/blogs/delete/:id",authMiddleware, deleteBlog);
  router.patch("/blogs/update/:id",authMiddleware, editBlog);

  const {auth}=require("../Controllers/auth.controller")
  router.post("/login",auth);

  const {postMessage,getMessage,getMessages,deleteMessage}=require("../Controllers/contact.controller");
  router.get("/messages",authMiddleware,getMessages);
  router.get("/messages/:id",authMiddleware,getMessage);
  router.post("/message",authMiddleware,postMessage);
  router.delete("/messages/delete/:id",authMiddleware,deleteMessage);

  // COMMENTS
  const {createComment,fetchComments} =require("../Controllers/Comment.controller")
  router.post("/blogs/:id/comment",authMiddleware,createComment);
  router.post("/blogs/?blog_id/comments",authMiddleware,fetchComments);

module.exports=router;