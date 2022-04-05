const User=require('../Models/User');

const userSignup=async (req,res)=>{
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

      const registerUser=new User({
          fullNames:req.body.fullNames,
          userName:req.body.userName,
          email:req.body.email,
          password:req.body.password
      })
      await registerUser.save();
    res.send(registerUser);
  }catch(err){
      console.log(err);
      return res.status(500).json({error:"Something went wrong"})
  }

}

module.exports=userSignup;