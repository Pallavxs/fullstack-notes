const express = require("express")

const app = express();

app.get('/',(req,res)=>{
    res.send("Server is connected for u...")
})

app.get('/home',(req,res)=>{
    res.send("This is home...")
})

app.listen(3000,()=>{
    console.log("server is running...")
})