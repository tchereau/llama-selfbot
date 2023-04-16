import Discord from 'discord.js-selfbot-v13';
import dotenv from "dotenv";
import { LLama } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
import path from "path";
import {talk, ask} from './lib/lib.js';

dotenv.config();
const model = path.resolve(process.cwd(), "models/ggml-model-q4_0.bin");
const config = {
  path: model,
  enableLogging: true,
  nCtx: 1024,
  nParts: -1,
  seed: 0,
  f16Kv: false,
  logitsAll: false,
  vocabOnly: false,
  useMlock: false,
  embedding: false,
};

const llama = new LLama(LLamaCpp);
const client = new Discord.Client({ checkUpdate: false });

client.on('ready', async () => {
  console.log(`${client.user.username} est connecté !\nChargement du modèle...`);
  llama.load(config);
  console.log('Modèle chargé !');
})

let prefix = process.env.PREFIX;
let globalPrompt = '';
let istalking = false;

client.on('messageCreate', async (message) => {
  if (message.author.username == client.user.username) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  switch (command) {
    case 'talk':
      if(istalking){
        message.reply(`Je suis déjà en train de parler à quelqu'un!`);
        return;
      }
      istalking = true;
      globalPrompt = await talk(llama, message, args, globalPrompt);
      istalking = false;
      break;
    case 'ask':
      await ask(llama, message, args);
      break;
    case 'help':
      message.reply(`lina!ask : poser une simple question à Lina (temps de réponse généralement moyen\nlina!talk : conversation avec Lina (temps de réponse généralement plus longue)`);
      break;
    default:
      message.reply('Commande inconnue ! lina!talk ou lina!ask suivis de votre question');
      break;
  }
});

client.login(process.env.TOKEN);