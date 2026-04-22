import express from 'express';
import useGraph from './services/ai.graphModel.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5175',
    methods : ['get','post'],
    credentials : true
}))

app.get('/', async (req,res) => {
    const result = await useGraph("Write an code for Factorial function in js")

    res.json(result)
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