import Prompter from "./Prompter.js";
let talk = async (llama, message, args, globalPrompt, Threads) => {
  let prompt = Prompter(message, args, globalPrompt);
  let reponse = "";

  await llama.createCompletion(
    {
      nThreads: parseInt(Threads),
      nTokPredict: 2048,
      topK: 40,
      topP: 0.1,
      temp: 0.2,
      repeatPenalty: 1,
      stopSequence: "### Human",
      prompt,
    },
    (response) => {
      if(!response.token.includes("<end>")){
        process.stdout.write(response.token);
        message.channel.sendTyping();
        reponse = reponse + response.token;
      }

    }
  );
  // answer to the message from the user
  try {
    message.reply(reponse);
  } catch (error) {
    console.log(error);
  }
  prompt = prompt + reponse;
  return prompt;
}

export default talk;