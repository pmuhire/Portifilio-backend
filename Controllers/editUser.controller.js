const User=require("../Models/User");
const hashPassword = require('../utils/hashPassword');

const editUser=async(req,res)=>{
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
module.exports=editUser;