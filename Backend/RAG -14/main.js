import fs from "fs";
import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings  } from '@langchain/mistralai'
import { Pinecone } from '@pinecone-database/pinecone'
import dotenv from 'dotenv'
let dataBuffer = fs.readFileSync('./story.pdf')
dotenv.config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_Key });
const index = pc.index('rag')

const parser = new PDFParse({
    data: dataBuffer
})

const data = await parser.getText()

const embeddings = new MistralAIEmbeddings ({
    apikey : process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

console.log(data)

const spitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
})

const chunk = await spitter.splitText(data.text)

const docs = await Promise.all(chunk.map(async (chunk) => {
    const embedding = await embeddings.embedQuery(chunk)
    return {
        text: chunk, 
        embedding
    }
}))

const result = await index.upsert({
    records: docs.map((doc,i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

console.log(result)

const queryEmbedding = await embeddings.embedQuery("How was the internship");

console.log(queryEmbedding)

const results = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true 
})

console.log(results)