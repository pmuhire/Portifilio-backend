require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const router=require("./routes/routes")

mongoose.connect(process.env.Database, {
    useNewUrlParser: false,
}).then(()=>{
    const app=express();

    app.use(express.json());
    app.use("/api",router);

    app.listen(process.env.Port||5000,()=>{
        console.log("Server up and running");
    })
})