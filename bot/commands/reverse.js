const { Command } = require('discord-akairo');

class ReverseCommand extends Command {
  constructor() {
    super('reverse', {
      aliases: ['reverse'],
      description: 'Reverses text',
      category: 'text',
      args: [
        {
          id: 'text',
          match: 'content',
          prompt: {
            start: `What do you want me to reverse?`
          }
        }
      ]
    });
  }

  async exec(message, args) {
    return message.util.send([...args.text].reverse().join(''));
  }
}

module.exports = ReverseCommand;
