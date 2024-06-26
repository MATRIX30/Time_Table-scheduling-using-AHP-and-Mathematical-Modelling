const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const rout=require('./routes/userroute')
const route=require('./routes/addingroute')
app.use(express.json());
app.use(cors());
app.use("/admin",rout)
app.use("/preferences",route)
mongoose.connect('mongodb+srv://user-app3:1234567890@cluster0.fwcs94e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/administration_bd').
then(()=>console.log("Dbconnectedd")
).catch(error=>console.error("Error connection to MongoDb;",error));




    app.listen(3000,function port(error)
    {
        if(error)
        {
            console.log(error)
        }
        else{
            console.log("port connected 8086")
        }
    });
