const express = require("express")
const mongoose = require('./database/db');
const router = require("./routes/index.route")
const app = express()
// const jsonparser = require("json-parser")


// Middleware CORS
const cors = require('cors');
app.use(cors());
// app.use(jsonparser)
// Middleware JSON Parser
app.use(express.json());


app.use(router)
app.get("",(req,res)=>{
    res.send({"message":"request received"})
})

app.listen(3000, () => {
    console.log("server is runing on http://localhost:3000")
})
