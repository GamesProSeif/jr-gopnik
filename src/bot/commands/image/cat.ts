import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class CatCommand extends Command {
  constructor() {
    super('cat', {
      aliases: ['cat', 'cats', 'meow'],
      category: 'image',
      description: {
        content: 'Sends a random cat image'
      }
    });
  }

  public async exec(message: Message) {
    const { link } = await (await fetch(
      'https://some-random-api.ml/img/cat'
    )).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors!.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util!.send(embed);
  }
}
