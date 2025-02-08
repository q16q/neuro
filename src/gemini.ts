import { GoogleGenerativeAI, GenerativeModel, SafetySetting } from "@google/generative-ai";
import dotenv from 'dotenv';
import * as config from '../config';

dotenv.config();

if(process.env.API_KEY === undefined) {
    throw new Error('API_KEY is not defined');
}

const configuration: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.API_KEY);
const model: GenerativeModel = configuration.getGenerativeModel({
    model: config.geminiModel
});

const session = model.startChat({
    "safetySettings": config.safetySettings
})

export async function generateResponse(prompt: string) {
    let response = await session.sendMessageStream(prompt);
    for await (let chunk of response.stream) {
        console.log(chunk.text())
    }
}

generateResponse("What is the meaning of life?");