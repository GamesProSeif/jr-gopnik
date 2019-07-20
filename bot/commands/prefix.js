const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
  constructor() {
    super('prefix', {
      aliases: ['prefix'],
      description: 'Displays the prefix of the bot',
      category: 'util'
    });
  }

  exec(message) {
    return message.util.reply(`My prefix is \`${this.client.commandHandler.prefix()}\``);
  }
}

module.exports = PrefixCommand;
