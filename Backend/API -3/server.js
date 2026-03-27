const express = require('express')

const app = express();

app.use(express.json()) // convert response language into json format ...

const notes = []

app.post('/',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log("Note created...")


})

app.get('/',(req,res)=>{
    res.send(notes)
})

app.delete('/',(req,res)=>{
    res.delete(notes[0])
})

app.listen(3000,()=>{
    console.log("Server is running on 3000 port...")
})