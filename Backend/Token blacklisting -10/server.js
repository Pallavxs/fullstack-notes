const app = require('./src/app')
const connectToDb = require('./src/config/db.config')

connectToDb();

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})