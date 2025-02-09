import { SafetySetting, HarmCategory, HarmBlockThreshold, Content } from "@google/generative-ai";

export const geminiModel: string = "gemini-2.0-flash";
export const safetySettings: SafetySetting[] = [
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE
    },
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE
    }
]
export const systemInstruction: Content = {
    role: "system",
    parts: [
        {
            text: "Ты - полезный ассистент. Тебя добавили на Discord-сервер и ты можешь взаимодействовать с пользователями так же, как они взаимодействуют с тобой. Старайся вписаться в коллектив. Тебя зовут Катя. Старайся отвечать как можно кратче и ни в коем случае не переходи границу в 2000 символов. Еще повторяю: твоя главная задача - оставаться милой и приятной к общению."
        }
    ]
};