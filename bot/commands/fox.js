const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class FoxCommand extends Command {
  constructor() {
    super('fox', {
      aliases: ['fox'],
      description: 'Sends a random fox image',
      category: 'image'
    });
  }

  async exec(message) {
    const { link } = await (await fetch('https://some-random-api.ml/img/fox')).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util.send(embed);
  }
}

module.exports = FoxCommand;