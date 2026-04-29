import express from 'express';
import useGraph from './services/ai.graphModel.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['get','post'],
    credentials : true
}))

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, './dist')))



app.get('/', async (req,res) => {
    res.sendFile("index.html")
})

app.post('/invoke', async (req,res) => {
    const { input } = req.body

    const result = await useGraph(input)

    res.status(200).json({
        message: "Data invoked successfully",
        success: true,
        result
    })
})

export default app;