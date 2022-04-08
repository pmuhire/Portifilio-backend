const express=require("express");
const router=express.Router();
const userSignup=require("../Controllers/registerUser.controller");
const getUsers=require("../Controllers/getUsers.contoller");
const getUser = require("../Controllers/getUser.controller");
const deleteUser = require("../Controllers/deleteUser.controller");
const editUser = require("../Controllers/editUser.controller");

router.post("/user",userSignup);
router.get("/users",getUsers);
router.get("/users/:id",getUser);
router.delete("/users/:id",deleteUser);
router.patch("/users/:id",editUser);

module.exports=router;