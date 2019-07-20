const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class FlipCommand extends Command {
  constructor() {
    super('flip', {
      aliases: ['flip'],
      description: 'Flips a coin',
      category: 'gamble'
    });
  }

  exec(message) {
    let num = Math.floor(Math.random() * 2);
    let final = num ? 'heads' : 'tails';
    return message.util.send(`Coin fell and hit \`${final}\``);
  }
}

module.exports = FlipCommand;
