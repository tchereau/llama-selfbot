# llamabot

## Un simple Selfbot discord, embarquant llama pour créer un chat bot comme ChatGPT, mais en local

### Commandes :

- prefix!ask question
  Réponds simplement à la question, dépendament du cpu et du nombre de threads alloué au bot, le temps de génération est plutôt moyen

- prefix!talk question
  Un vrai tchat, c'est commande là fait exactement la même chose que la précédente, à l'exception qu'elle enregistre le prompt précèdent et le rajoute au prompt présent, le temps de génération est plutôt long, est devient plus long au fur et à mesure que le tchat est long.

### Modèle :
Les modèles sont à mettre dans le dossier `models` (il a un lien en fin de page pour télécharger le modèle `vicuna-13b`)

### DotEnv :

Pensez à modifier le fichier `.env.example` et à le renommer en `.env`

```bash
TOKEN = "tokendiscord"
PREFIX = "magnifiquePrefix!"
MODEL = "ggml-model-q4_0.bin"
THREADS = 4
```

#### Source utilisé :

- [llama-node](https://github.com/Atome-FE/llama-node)

- [Vicuna-13B](https://huggingface.co/ShreyasBrill/Vicuna-13B/blob/main/README.md)

- [discord.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)

*merci à eux*