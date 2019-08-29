import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class HugCommand extends Command {
  constructor() {
    super('hug', {
      aliases: ['hug'],
      args: [
        {
          id: 'member',
          type: 'member'
        }
      ],
      category: 'image',
      description: {
        content: 'Sends a random hug image'
      }
    });
  }

  public async exec(message: Message, { member }: any) {
    const { link } = await (await fetch(
      'https://some-random-api.ml/animu/hug'
    )).json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors!.secondary)
      .setImage(link)
      .setFooter('Powered by Some Random API');

    return message.util!.send({
      content: member ? `Hugs ${member}` : null,
      embed
    });
  }
}
