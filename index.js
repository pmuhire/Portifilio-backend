const express=require('express');
const mongoose=require('mongoose');
const router=require("./routes/userRouter");

mongoose.connect("mongodb://localhost:27017/portifolio", {
    useNewUrlParser: false,
}).then(()=>{
    const app=express();

    app.use(express.json());
    app.use("/user-api",router);

    app.listen("1200",()=>{
        console.log("Server up and running");
    })
})