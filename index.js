const express=require('express');
const mongoose=require('mongoose');
const userRouter=require("./routes/userRouter");
const blogRouter=require("./routes/blogRoutes");

mongoose.connect("mongodb://localhost:27017/portifolio", {
    useNewUrlParser: false,
}).then(()=>{
    const app=express();

    app.use(express.json());
    app.use("/user-api",userRouter);
    app.use("/blog-api",blogRouter);

    app.listen("1200",()=>{
        console.log("Server up and running");
    })
})