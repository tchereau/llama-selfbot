let ask = async (llama, message, args) => {
  let prompt = `### Human:
${args.join(' ')}
### Assistant:`;
  let reponse = "";
  console.log(prompt)
  await llama.createCompletion(
    {
      nThreads: Threads,
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
  try {
    message.reply(reponse);
  } catch (error) {
    console.log(error);
  }
  return;
}

export default ask;