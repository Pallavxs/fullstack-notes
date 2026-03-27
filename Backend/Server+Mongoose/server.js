const express = require('express');
const app = express();
app.use(express.json())


const database = require('database')
app.get('/user',(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server is running...")
})
