const express = require('express');
const cors = require ('cors')
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config()
const port =5000;
const userRoutes= require("./routes/userRoutes")
const applicationRoute = require("./routes/applicationRoutes")
const superVisorRoute = require("./routes/superVisorRoutes")
const adminRoutes = require("./routes/adminRoutes")
const {errorHandler} = require('./Middleware/errorMiddleware')

const app= express()

mongoose.connect('mongodb://localhost:27017/employeeDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log('DB Connected')
}).catch((err)=>{
    console.log(err.message) 
})

app.use(cors({
    origin:['http://localhost:3000'],
    method:['GET',"POST","PUT","PATCH"],
    credentials:true
}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users',userRoutes)
app.use('/api/application',applicationRoute)
app.use("/api/supervisor",superVisorRoute)
app.use('/api/admin',adminRoutes)


app.listen(port,() => console.log(`server started at port ${port}`)) 