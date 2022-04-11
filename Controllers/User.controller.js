const User =require("../Models/User");
const hashPassword = require('../utils/hashPassword');

// Create User
exports.userSignup=async (req,res)=>{
    console.log(req.body);
  const {fullNames,userName,email,password}=req.body
  let error={};
  if(!fullNames||fullNames.trim().length===0){
      error.name="Enter your full names";
  }
  if(!userName||userName.trim().length===0){
    error.name="Enter your full names";
}
  if(!email||email.trim().length===0){
      error.email="Enter your Email";
  }
  if(!password||password.trim().length===0){
      error.password="Password is required";
  }
  if(Object.keys(error).length){
      return res.status(422).json({error});
  }

  try{
      const user=await User.findOne({email});
      if(user) res.status(400).json({error:"Email already exists"})
       const hashed=await hashPassword(req.body.password);
      const registerUser=new User({
          fullNames:req.body.fullNames,
          userName:req.body.userName,
          email:req.body.email,
          password:hashed
      })
      await registerUser.save();
    res.send(registerUser);
  }catch(err){
      console.log(err);
      return res.status(500).json({error:"Something went wrong"})
  }

}

// Get All Users
exports.getUsers=async (req,res)=>{
    console.log(req.body);
    const users=await User.find();
    res.send(users);
}
// Get a user
exports.getUser=async(req,res)=>{
    const user = await Blog.find({id: req.params.id});
    return res.send(user)
}
// Edit user
exports.editUser=async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id })
    
        if (req.body.fullNames) {
            user.fullNames = req.body.fullNames
        }
    
        if (req.body.userName) {
            user.userName = req.body.userName
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        
        if (req.body.password) {
            const hashed=await hashPassword(req.body.password);
            user.password = hashed;          
        }
    
        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "user doesn't exist!" })
    }
}
// Delete user
exports.deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndRemove({ _id: req.params.id })
        res.status(204).send();
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}
