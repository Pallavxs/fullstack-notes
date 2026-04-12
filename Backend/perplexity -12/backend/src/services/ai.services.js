import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: config.GOOGLE_API_KEY
});

export async function testAi() {
    model.invoke("You are mine").then((response)=> {
        console.log(response.text)
    })
}