import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class DogCommand extends Command {
  constructor() {
    super('dog', {
      aliases: ['dog', 'dogs', 'doggo', 'woof'],
      category: 'image',
      description: {
        content: 'Sends a random dog image'
      }
    });
  }

  public async exec(message: Message) {
    const { link } = await (await fetch(
      'https://some-random-api.ml/img/dog'
    )).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors!.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util!.send(embed);
  }
}
