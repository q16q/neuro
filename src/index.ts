import { Client, IntentsBitField, Events, Message } from 'discord.js';
import * as handlers from './handlers';

const client: Client = new Client({ intents: new IntentsBitField(53608447) }); // all intents

client.once('ready', () => {
    console.log('ready!')
});

client.on(Events.MessageCreate, handlers.message);

client.login(process.env.TOKEN);