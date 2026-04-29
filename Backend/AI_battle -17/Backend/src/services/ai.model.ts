import { ChatCohere } from "@langchain/cohere"
import { ChatMistralAI } from '@langchain/mistralai'
import { ChatGoogle } from "@langchain/google";
import config from '../config/config.js'
import { ChatXAI  } from "@langchain/xai"

export const geminiModel = new ChatGoogle({
    model : "gemini-3.1-flash-lite-preview",
    apiKey: config.GOOGLE_API_KEY,
    streaming: false
});

export const ollamaModel = new ChatXAI("grok/compound-mini", {
    apiKey: config.XAI_API_KEY
});

export const mistralAIModel = new ChatMistralAI({
    model: 'mistral-medium-latest',
    apiKey: config.MISTRAL_API_KEY,
    streaming: false
});

export const cohereModel = new ChatCohere({
    model: 'command-a-03-2025',
    apiKey: config.COHERE_API_KEY,
    streaming: false
});