import app from './src/app.js'
import db from './src/config/db.js'

db();

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})