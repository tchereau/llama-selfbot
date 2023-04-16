let Prompter = (message,args, globalPrompt) => {
  let defaultprompt = `### Human:
${message.author.username} : ${args.join(' ')}
### Assistant:`;
  globalPrompt= globalPrompt+defaultprompt;
  return globalPrompt;
}

export default Prompter;