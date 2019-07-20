const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class KoalaCommand extends Command {
  constructor() {
    super('koala', {
      aliases: ['koala'],
      description: 'Sends a random koala image',
      category: 'image'
    });
  }

  async exec(message) {
    const { link } = await (await fetch('https://some-random-api.ml/img/koala')).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util.send(embed);
  }
}

module.exports = KoalaCommand;
