const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval', 'ev'],
      description: `You can't access this command anyways`,
      category: 'util',
      ownerOnly: true,
      args: [
        {
          id: 'code',
          match: 'content',
          type: 'string',
          prompt: {
            start: `What's the code you want to evaluate?`,
            retry: `That's not valid code! Try again`
          }
        }
      ]
    });

    this.usage = '<code>';
  }

  async exec(message, args) {
    try {
      let regex = /\s*(?<silent>(?:-s|--silent) *)?\s*```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/;
      let code = args.code;
      let silent;
      if (regex.test(code)) {
        let match = code.match(regex);
        code = match.groups.code;
        silent = match.groups.silent ? true : false;
      }
      let evaled = await eval(code);

      // console.log({
      //   event: 'EVAL SESSION',
      //   user: message.author.username,
      //   userId: message.author.id,
      //   messageId: message.id,
      //   input: code,
      //   output: evaled
      // });

      if (!silent) {
        let code = '';
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled), code = 'js';
        if (evaled.length >= 2000) {
          let response = await fetch('https://hasteb.in/documents', {method: 'POST', body: evaled});
          let {key} = await response.json();
          return message.reply(`**Output was too long and was uploaded to https://hasteb.in/${key}.js**`);
        }
        message.util.send(this.client.functions.clean(evaled), {code});
      }
    } catch (err) {
      message.util.send(`\`ERROR\` \`\`\`${this.client.functions.clean(err)}\n\`\`\``);
    }
  }
}

module.exports = EvalCommand;
