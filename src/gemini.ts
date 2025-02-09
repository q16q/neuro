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
    "safetySettings": config.safetySettings,
    "systemInstruction": config.systemInstruction
})

export async function generateResponse(prompt: string, stream: boolean = false) {
    if(stream) {
        return await session.sendMessageStream(prompt);
    } else {
        return (await session.sendMessage(prompt)).response.text();
    }
}