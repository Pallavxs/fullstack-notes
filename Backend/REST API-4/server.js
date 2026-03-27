const express = require('express')  // require express package and store it in variable
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

    res.status(201).json({
        message: "Note is created sucessfully"
    })
    console.log('Post is created...')
})

app.get('/viewPost', (req, res) => {
    res.status(200).json({
        message: "Post are available...",
        data: Posts
    })
    console.log(Posts)
})

app.patch('/updatePost/:index', (req, res) => {  
    const Index = req.params.index                          // Partially updates the post means just a pieace from note
    Posts [Index].description = req.body.description
    
    res.status(200).json({
        message: "post is updated..."
    })

    console.log("Your new post - ", req.body)
})

app.delete('/deletePost/:index', (req, res) => {
    const Index = req.params.index
    delete Posts[Index]

    res.status(200).json({
        message: "Post is successfully deleted.."
    })

})

app.listen(3000,()=>{
    console.log("server is running on port 3000...")
})