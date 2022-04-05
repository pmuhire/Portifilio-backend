const User=require('../Models/User');

const getUsers=async (req,res)=>{
    console.log(req.body);
    const users=await User.find();
    res.send(users);
}
module.exports=getUsers;
