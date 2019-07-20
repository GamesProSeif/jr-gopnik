const { Command } = require('discord-akairo');

class WipeCommand extends Command {
constructor() {
    super('wipe', {
      aliases: ['wipe'],
      description: 'Sends whitespace to clear chat',
      category: 'text',
      cooldown: 10000
    });
  }

  exec(message) {
    return message.util.send(`${String.fromCharCode(8203)}\n`.repeat(30));
  }
}

module.exports = WipeCommand;
