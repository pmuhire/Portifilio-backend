require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const router=require("./routes/routes");
const swaggerUiExpress = require('swagger-ui-express');
const docs = require('./docs/swagger');
mongoose.connect(process.env.Database, {
    useNewUrlParser: false,
}).then(()=>{
    const app=express();

    app.use(express.json());
    app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(docs));
    app.use("/api",router);

    app.listen(process.env.PORT||5000,()=>{
        console.log("Server up and running");
    })
})