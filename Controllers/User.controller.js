const User =require("../Models/User");
const hashPassword = require('../utils/hashPassword');

// Create User
exports.userSignup=async (req,res)=>{
  const {fullNames,userName,email,password}=req.body
  let error={};
  if(!fullNames||fullNames.trim().length===0){
      error.name="Enter your full names";
  }
  if(!userName||userName.trim().length===0){
    error.name="Enter your full username";
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
      if(user) return res.status(404).send({error:"Email already exists"})
       const hashed=await hashPassword(req.body.password);
       const registerUser=new User({
          fullNames:req.body.fullNames,
          userName:req.body.userName,
          email:req.body.email,
          password:hashed
       })
      await registerUser.save();
      console.log(registerUser)
    return res.send(registerUser);
  }catch(err){
      console.log(err);
      return res.status(500).json({error:"Something went wrong"})
  }

}

// Get All Users
exports.getUsers=async (req,res)=>{
    const users=await User.find();
    return res.send(users);
}
// Get a user
exports.getUser=async(req,res)=>{
    const user = await  User.findById(req.params.id);
    if(!user){
        return res.status(404).send("User does not exist")
    }
    return res.status(200).send(user)
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
        return res.status(200).send(user)
    } catch {
        return res.status(404).send({ error: "user doesn't exist!" })
    }
}
// Delete user
exports.deleteUser=async(req,res)=>{
    try {
        const user=await User.findByIdAndRemove({ _id: req.params.id })
        return res.status(204).send(user);
    } catch {
        res.status(404).send({ error: "User doesn't exist!" })
    }
}
