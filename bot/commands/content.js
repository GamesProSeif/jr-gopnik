const { Command } = require('discord-akairo');

class ContentCommand extends Command {
  constructor() {
    super('content', {
      aliases: ['content', 'cnt'],
      description: 'Gets the pure content of a message in the current channel',
      category: 'text',
      args: [
        {
          id: 'message',
          type: 'message',
          prompt: {
            start: `What's the id of the message you want the content of?`,
            retry: `That's not a valid id! Try again.`
          }
        }
      ]
    });
    this.usage = '<messageID>';
  }

  exec(message, args) {
    let content = this.client.functions.clean(args.message.content);
    if (content === '') {
      return message.channel.send(`The message does have any content. Probably an embed or an attachment present.`)
    }
    return message.channel.send(content, {code: 'md'});
  }
}

module.exports = ContentCommand;
