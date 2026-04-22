import { StateSchema, MessagesValue, StateGraph, START, END, ReducedValue } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { MistralModel, cohereModel, geminiModel } from "./models.service.js";
import * as z from 'zod'
import { HumanMessage } from "@langchain/core/messages";
import { createAgent, providerStrategy } from "langchain"

// type JUDGEMENT = {
//     winner: "solution_1" | "solution_2";
//     solution_1_score: number,
//     solution_2_score: number,
// }

// type AUBATTLESTATE = {
//     messages : typeof MessagesValue,
//     solution_1: string,
//     solution_2: string,
//     judgement: JUDGEMENT
// }

// const state: AUBATTLESTATE = {
//     messages: MessagesValue,
//     solution_1: "",
//     solution_2: "",
//     judgement: {
//         winner: "solution_1",
//         solution_1_score: 0,
//         solution_2_score: 0
//     }
// }

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0,
    }), {
        reducer: (current, next) => {
            return next
        }
    })
})

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
    const [mistral_solution, cohere_solution] = await Promise.all([
        MistralModel.invoke(state.messages[0].content),
        cohereModel.invoke(state.messages[0].content),
    ])
    const result = {
        solution_1: mistral_solution.content,
        solution_2: cohere_solution.content,
    }

    console.log(result)
    return result

}

const judgeNode : GraphNode<typeof State> = async (state: typeof State) => {
    const { solution_1, solution_2} = state
    
    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    const judgeResponse = await judge.invoke({
        messages: [
        new HumanMessage(
            `You are a judge tasked with evaluating two solutions to a problem. Here are the solutions:\n\nSolution 1: ${solution_1}\n\nSolution 2: ${solution_2}\n\nPlease provide a score for each solution on a scale of 0 to 10, where 0 means the solution is completely ineffective and 10 means the solution is highly effective.`
        )
    ]
    })

    const result = judgeResponse.structuredResponse
    console.log("Judge Recommendation: ", result)
    return {
        judge_recommendation: result
    }
}


const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

export async function useGraph(userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })

    return result
}