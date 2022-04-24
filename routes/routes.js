const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");

const {userSignup,getUser,getUsers,deleteUser,editUser}=require("../Controllers/User.controller");
/**
 * @swagger
 *  /api/user:
 *     post:
 *        description: Use to create all user
 *        summary: Register User
 *        responses:
 *          200:
 *             description: A successful response 
 *        requestBody:
 *             content:
 *                parameters:
 *                   in: body
 *                   name: user
 *                   description: a new user
 *                   schema:
 *                     type: object
 *                     properties: 
 *                        full names: 
 *                          type: string
 *                          required: true
 *                        email: 
 *                          type: string
 *                          required: true
 *                        password:
 *                          type: string
 *                          required: true  
 *                        username:
 *                          type: string
 *                          required: true  
 */
router.post("/user",userSignup);
router.get("/users",getUsers);
router.get("/users/:id",getUser);
router.delete("/users/:id",authMiddleware,deleteUser);
router.patch("/users/:id",authMiddleware,editUser);

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
  router.delete("/blogs/:id",authMiddleware, deleteBlog);
  router.patch("/blogs/:id",authMiddleware, editBlog);

  const {auth}=require("../Controllers/auth.controller")
  router.post("/login",auth);

  const {postMessage,getMessage,getMessages,deleteMessage}=require("../Controllers/contact.controller");
  router.get("/messages",getMessages);
  router.get("/messages/:id",getMessage);
  router.post("/message",postMessage);
  router.delete("/messages/:id",deleteMessage);
module.exports=router;