require("dotenv").config();
const cors=require('cors');
const express=require('express');
const mongoose=require('mongoose');
const router=require("./routes/routes");
const swaggerUiExpress = require('swagger-ui-express');
const docs = require('./docs/swagger');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: false,
}).then(()=>{
    const app=express();

    app.use(cors());
    app.use(express.json());
    app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(docs));
    app.use("/api",router);

    app.listen(process.env.PORT||5000,()=>{
        console.log("Server up and running");
    })
    module.exports=app
})

