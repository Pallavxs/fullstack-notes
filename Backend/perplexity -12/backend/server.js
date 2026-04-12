import app from './src/app.js'
import db from './src/config/db.js'
import http from 'http'
import { initSocket } from './src/sockets/server.socket.js';

const httpServer = http.createServer(app)

initSocket(httpServer)

db();

httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})