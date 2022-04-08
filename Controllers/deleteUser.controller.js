const User=require("../Models/User")

const deleteUser=async(req,res)=>{
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send();
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}
module.exports=deleteUser;