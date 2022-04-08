const User=require("../Models/User");
const hashPassword = require('../utils/hashPassword');

const editUser=async(req,res)=>{
    try {
        const user = await User.findOne({ _id: req.params.id })
    
        if (req.body.fullNames) {
            user.title = req.body.title
        }
    
        if (req.body.userName) {
            user.content = req.body.content
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