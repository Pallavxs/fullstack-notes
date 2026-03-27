const express = require('express') // packages stored in express var

const app = express(); // server initializes / created and stored in app

app.use(express.json());

let Posts = []

app.get('/',(req,res) => {
    res.send("This is home page")
})

app.post('/createPost',(req, res) => {
    const {title, description, author} = req.body
    Posts.push({
        title,
        description,
        author
    })
    console.log('Post is created...')
    res.send('Post is created successfully...')
})

app.get('/viewPost', (req, res) => {
    res.json(Posts)
    console.log(Posts)
    console.log("Post are available...")
})

app.patch('/updatePost/:index', (req, res) => {  
    const Index = req.params.index                          // Partially updates the post means just a pieace from note
    Posts [Index].description = req.body.description
    
    console.log("Your new post - ", req.body)
    console.log("post is updated...")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000...")
})