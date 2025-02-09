import * as gm from '../gemini';
import { ChannelType, Message } from 'discord.js';
import { GenerateContentStreamResult } from '@google/generative-ai';

export async function execute(message: Message) {
    if(message.channel.id === process.env.MAIN_TEXT_CHANNEL && message.author.id !== message.client.user.id) {
        /* prompt modifying */
        let prompt = message.content;
        prompt += `\n=== SYSINFO - END OF USER INPUT ===\nUSER_NAME = ${message.author.username}`
        const response: string | GenerateContentStreamResult = await gm.generateResponse(prompt, false);
        
        let msg = await message.reply('...');
        if(typeof response === 'string') {
            await msg.edit(response);
        } else if (typeof response === 'object') {    
            let resp = [];
            for await (let chunk of response.stream) {
                resp.push(chunk.text());
                await msg.edit(resp.join(''));
            }
        }
    }
}