const express = require(express) // package is called and saved inside variable

const app = express(); //  server is created 

app.use(express.json()) // convert response language into json format ...

app.listen(3000) // server is called