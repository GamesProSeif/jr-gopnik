const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class BirdCommand extends Command {
  constructor() {
    super('bird', {
      aliases: ['bird', 'birds', 'birb'],
      description: 'Sends a random bird image',
      category: 'image'
    });
  }

  async exec(message) {
    const { link } = await (await fetch('https://some-random-api.ml/img/birb')).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util.send(embed);
  }
}

module.exports = BirdCommand;
