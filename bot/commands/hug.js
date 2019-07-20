const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class HugCommand extends Command {
  constructor() {
    super('hug', {
      aliases: ['hug'],
      description: 'Sends a random hug image',
      category: 'image'
    });
  }

  async exec(message) {
    const { link } = await (await fetch('https://some-random-api.ml/animu/hug')).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util.send(embed);
  }
}

module.exports = HugCommand;
