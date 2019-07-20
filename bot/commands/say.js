const { Command } = require('discord-akairo');

class SayCommand extends Command {
  constructor() {
    super('say', {
      aliases: ['say'],
      description: 'says a message',
      category: 'text',
      args: [
        {
          id: 'string',
          match: 'content',
          prompt: {
            start: `What do you want me to say?`
          }
        }
      ]
    });

    this.usage = '<message>';
  }

  exec(message, args) {
    return message.util.send(args.string);

    // let deleteMessages = [message.util.message];
    // message.util.lastResponse ? deleteMessages.push(message.util.lastResponse) : null;
    // return message.channel.bulkDelete(deleteMessages);
  }
}

module.exports = SayCommand;
