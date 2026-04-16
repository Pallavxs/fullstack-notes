import { ChatMistralAI } from '@langchain/mistralai'
import { createAgent, HumanMessage, tool } from "langchain";
import readline from "readline/promises";
import sendEmail from "./mail.services.js";
import * as z from "zod"
import dotenv from "dotenv"
dotenv.config();

const emailTool = tool(
    sendEmail,{
        name: "emailTool",
        description: "User this tool to send an email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email")
        })
    }
)

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

const agent = createAgent({
    model,
    tools: [ emailTool ]
})

const messages = [];

while (true) {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages [response.messages.length - 1])

    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
}

rl.close();