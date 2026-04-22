import express from "express"
import { useGraph } from "./services/graph.ai.service.js";
const app = express();

app.use(express.json())

app.get("/health", (req, res) => {
  res.status(200).json("Health is good ")
});

app.post("/use-graph", async (req, res) => {
    try {
        const result = await useGraph("What is the capital of france");

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

export default app;
