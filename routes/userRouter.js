const express=require("express");
const router=express.Router();
const userSignup=require("../Controllers/registerUser.controller");
const getUsers=require("../Controllers/getUsers.contoller");

router.post("/user",userSignup);
router.get("/users",getUsers);

module.exports=router;